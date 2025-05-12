import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tutorial = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>📘 C.H.A.D Tutorial</Text>
        <Text style={styles.description}>
          Welcome! Here’s what each feature in the app does:
        </Text>

        <View style={styles.section}>
          <Text style={styles.heading}>Profile</Text>
          <Text style={styles.text}>Displays your user information like name, weight, and preferences.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Health Trackers</Text>
          <Text style={styles.text}>View and log daily metrics like sleep, steps, and water intake.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Diet Recommender</Text>
          <Text style={styles.text}>Enter a dietary preference and receive a full meal plan plus restaurant suggestions on a map.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Food Scanner</Text>
          <Text style={styles.text}>Scan a food barcode to view nutritional info and NutriScore.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Workout Planner</Text>
          <Text style={styles.text}>AI-generated workouts tailored to your profile and goals.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Challenges</Text>
          <Text style={styles.text}>Take on fun fitness challenges to boost motivation.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Walk Tracker</Text>
          <Text style={styles.text}>Track your walking distance, route, time, and calories burned on a map.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Settings</Text>
          <Text style={styles.text}>Customize your notifications, units, accessibility options, and preferences.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Support</Text>
          <Text style={styles.text}>Access help and contact information if you need assistance.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Tutorial;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fafd',
  },
  scroll: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#007aff',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  text: {
    fontSize: 15,
    color: '#555',
  },
});
