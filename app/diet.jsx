import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';

const OPENAI_API_KEY = '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';

const Diet = () => {
  const [preference, setPreference] = useState('');
  const [mealType, setMealType] = useState('single');
  const [singleMealTime, setSingleMealTime] = useState('Lunch');
  const [aiMealPlan, setAiMealPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPlan, setShowPlan] = useState(false);

  const router = useRouter();

  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const generateDiet = async () => {
    if (!preference) return;
    setLoading(true);
    setShowPlan(false); // Reset visibility when regenerating

    let userPrompt =
      mealType === 'fullDay'
        ? `Create a full-day meal plan (Breakfast, Lunch, Dinner) for the following preference: ${preference}. Include Meal Name, Ingredients List, and Nutrition Information (Calories, Protein, Carbs, Fat) for each meal.`
        : `Suggest a ${singleMealTime} based on: ${preference}. Include Meal Name, Ingredients List, and Nutrition Information (Calories, Protein, Carbs, Fat).`;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful AI dietitian. Always provide meal name, ingredients list, and estimated nutrition facts.',
            },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.7,
          max_tokens: 600,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );
      setAiMealPlan(response.data.choices[0].message.content);
    } catch (error) {
      console.error('OpenAI Error:', error);
      setAiMealPlan('⚠️ Error generating your meal plan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>AI Diet Recommender</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter diet preference (e.g., vegetarian, keto)"
        value={preference}
        onChangeText={setPreference}
      />

      <Text style={styles.label}>Meal Plan Type</Text>
      <View style={{ height: 120 }}>
        <Picker
          selectedValue={mealType}
          onValueChange={(val) => setMealType(val)}
        >
          <Picker.Item label="Single Meal" value="single" />
          <Picker.Item label="Full Day Plan" value="fullDay" />
        </Picker>
      </View>

      {mealType === 'single' && (
        <>
          <Text style={styles.label}>Meal Time</Text>
          <View style={{ height: 120 }}>
            <Picker
              selectedValue={singleMealTime}
              onValueChange={(val) => setSingleMealTime(val)}
            >
              <Picker.Item label="Breakfast" value="Breakfast" />
              <Picker.Item label="Lunch" value="Lunch" />
              <Picker.Item label="Dinner" value="Dinner" />
              <Picker.Item label="Snack" value="Snack" />
            </Picker>
          </View>
        </>
      )}

      <Button title="Generate Meal Plan" onPress={generateDiet} />

      {loading ? (
        <ActivityIndicator size="large" color="#007aff" style={{ marginTop: 20 }} />
      ) : aiMealPlan ? (
        <>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setShowPlan(!showPlan);
            }}
          >
            <Text style={styles.toggleButtonText}>
              {showPlan ? 'Hide Meal Plan ▲' : 'Show Meal Plan ▼'}
            </Text>
          </TouchableOpacity>

          {showPlan && (
            <View style={styles.result}>
              <Text style={styles.resultText}>{aiMealPlan}</Text>
            </View>
          )}
        </>
      ) : null}

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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#007aff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  result: {
    marginTop: 20,
    backgroundColor: '#e6f9f3',
    padding: 20,
    borderRadius: 12,
    borderColor: '#b3e5c2',
    borderWidth: 1,
  },
  resultText: {
    fontSize: 16,
    lineHeight: 22,
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
  toggleButton: {
    marginTop: 20,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  toggleButtonText: {
    fontWeight: 'bold',
    color: '#007aff',
    fontSize: 15,
  },
});
