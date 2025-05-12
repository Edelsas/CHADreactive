import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getProfileSession, setProfileSession } from './profileSession'; // adjust path if needed

const EditProfile = () => {
  const router = useRouter();

  const profile = getProfileSession();

  const [username, setUsername] = useState(profile.username || '');
  const [weight, setWeight] = useState(profile.weight || '');
  const [weightGoal, setWeightGoal] = useState(profile.weightGoal || '');
  const [calorieIntake, setCalorieIntake] = useState(profile.calorieIntake || '');
  const [preferredDiet, setPreferredDiet] = useState(profile.preferredDiet || '');

  const handleSave = () => {
    setProfileSession({
      username,
      weight,
      weightGoal,
      calorieIntake,
      preferredDiet,
    });
    router.back(); // return to Profile screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Edit Your Profile</Text>

        <Text style={styles.label}>Username</Text>
        <TextInput style={styles.input} placeholder="Enter username" value={username} onChangeText={setUsername} />

        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput style={styles.input} placeholder="Enter weight" keyboardType="numeric" value={weight} onChangeText={setWeight} />

        <Text style={styles.label}>Weight Goal</Text>
        <TextInput style={styles.input} placeholder="Enter weight goal" value={weightGoal} onChangeText={setWeightGoal} />

        <Text style={styles.label}>Calorie Intake</Text>
        <TextInput style={styles.input} placeholder="Enter target calories" keyboardType="numeric" value={calorieIntake} onChangeText={setCalorieIntake} />

        <Text style={styles.label}>Preferred Diet</Text>
        <TextInput style={styles.input} placeholder="e.g. Keto, Vegan" value={preferredDiet} onChangeText={setPreferredDiet} />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>💾 Save Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Return to Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scroll: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    color: '#89c9b8',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    color: '#ccc',
    marginBottom: 6,
    marginTop: 12,
    fontSize: 16,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: '#32CD32',
    padding: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#007aff',
    padding: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
