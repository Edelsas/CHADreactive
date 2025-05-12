import axios from 'axios';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import MapView, { Marker } from 'react-native-maps';

const OPENAI_API_KEY = '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';

const CollapsibleSection = ({ title, content }) => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <View style={styles.section}>
      <TouchableOpacity
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setCollapsed(!collapsed);
        }}
        style={styles.sectionHeader}
      >
        <Text style={styles.sectionTitle}>{collapsed ? `► ${title}` : `▼ ${title}`}</Text>
      </TouchableOpacity>
      {!collapsed && <Text style={styles.sectionContent}>{content}</Text>}
    </View>
  );
};

const Diet = () => {
  const router = useRouter();
  const [dietType, setDietType] = useState('');
  const [customDiet, setCustomDiet] = useState('');
  const [loading, setLoading] = useState(false);
  const [planSections, setPlanSections] = useState([]);
  const [location, setLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  const dietOptions = [
    { key: '1', value: 'Keto' },
    { key: '2', value: 'Vegetarian' },
    { key: '3', value: 'High Protein' },
    { key: '4', value: 'Low Carb' },
    { key: '5', value: 'Vegan' },
    { key: '6', value: 'Mediterranean' },
    { key: '7', value: 'Balanced' },
  ];

  const fetchLocationAndRestaurants = async (preference) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation.coords);

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${preference}+restaurant+near+me&limit=5&lat=${currentLocation.coords.latitude}&lon=${currentLocation.coords.longitude}`;

    try {
      const response = await axios.get(url);
      setRestaurants(response.data);
    } catch (error) {
      console.error('Failed to fetch restaurants:', error);
    }
  };

  const generatePlan = async () => {
    const preference = customDiet || dietType;
    if (!preference) {
      alert('Please select or enter a diet preference.');
      return;
    }

    setLoading(true);
    setPlanSections([]);
    await fetchLocationAndRestaurants(preference);

    const prompt = `Create a full-day meal plan for someone following a ${preference} diet. Include these clear headers: Breakfast, Lunch, Dinner, and Snacks (optional). For each, include:
- Meal Name
- Ingredients
- Estimated Nutrition (Calories, Protein, Carbs, Fat).`;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful AI dietitian. Always format responses clearly with nutrition facts.',
            },
            { role: 'user', content: prompt },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      const content = response.data.choices[0].message.content;

      const parsed = content
        .split(/(?=^.*(?:Breakfast|Lunch|Dinner|Snack).*?$)/gim)
        .map((part) => {
          const [titleLine, ...bodyLines] = part.trim().split('\n');
          return {
            title: titleLine.trim(),
            body: bodyLines.join('\n').trim(),
          };
        });

      setPlanSections(parsed);
    } catch (err) {
      console.error(err);
      setPlanSections([{ title: 'Error', body: '⚠️ Unable to generate meal plan.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>AI Diet Recommender</Text>

      <Text style={styles.label}>Select Your Diet Preference</Text>
      <SelectList
        data={dietOptions}
        setSelected={setDietType}
        placeholder="Choose a preset option"
        search={false}
      />

      <Text style={styles.label}>Or type in your diet preference</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. pescatarian, gluten-free"
        value={customDiet}
        onChangeText={setCustomDiet}
      />

      <TouchableOpacity style={styles.generateButton} onPress={generatePlan}>
        <Text style={styles.generateButtonText}>Generate Meal Plan</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#007aff" style={{ marginTop: 20 }} />}

      {planSections.length > 0 && (
        <>
          <Text style={styles.helperText}>
            Feel free to follow this meal plan based on your preference(s) or select a specific one you want!
          </Text>

          {location && (
            <>
              <Text style={styles.label}>Nearby {customDiet || dietType} Restaurants</Text>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}
              >
                {restaurants.map((place, idx) => (
                  <Marker
                    key={idx}
                    coordinate={{
                      latitude: parseFloat(place.lat),
                      longitude: parseFloat(place.lon),
                    }}
                    title={place.display_name}
                  />
                ))}
              </MapView>
            </>
          )}

          <View style={{ marginTop: 30 }}>
            {planSections.map((section, idx) => (
              <CollapsibleSection key={idx} title={section.title} content={section.body} />
            ))}
          </View>
        </>
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Return to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Diet;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5fafd',
    flexGrow: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#007aff',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  generateButton: {
    marginTop: 20,
    padding: 14,
    backgroundColor: '#007aff',
    borderRadius: 12,
    alignItems: 'center',
  },
  generateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  helperText: {
    marginTop: 20,
    fontSize: 15,
    textAlign: 'center',
    color: '#333',
    paddingHorizontal: 10,
  },
  map: {
    width: Dimensions.get('window').width - 40,
    height: 250,
    borderRadius: 12,
    marginTop: 20,
  },
  backButton: {
    marginTop: 30,
    padding: 14,
    backgroundColor: '#007aff',
    borderRadius: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#e6f9f3',
    borderRadius: 10,
    overflow: 'hidden',
  },
  sectionHeader: {
    padding: 12,
    backgroundColor: '#c8f0e0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionContent: {
    padding: 12,
    fontSize: 14,
    lineHeight: 20,
  },
});
