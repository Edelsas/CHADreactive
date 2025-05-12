import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setProfileSession } from './profileSession'; // Adjust path if needed

const AboutYou = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState('');
  const [calories, setCalories] = useState('');
  const [diet, setDiet] = useState('');

  const handleDone = () => {
    setProfileSession({
      username,
      weight,
      weightGoal: goal,
      calorieIntake: calories,
      preferredDiet: diet,
    });

    router.push('/welcome');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Tell Us About Yourself</Text>

        <View style={styles.field}>
          <Text style={styles.label}>👤 Enter Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. John Doe"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>⚖️ Current Weight (kg)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 70"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>🎯 Weight Goal (kg)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Lose 5kg"
            keyboardType="numeric"
            value={goal}
            onChangeText={setGoal}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>🔥 Calorie Intake Goal</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 2200"
            keyboardType="numeric"
            value={calories}
            onChangeText={setCalories}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>🥗 Preferred Diet</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Vegetarian, Keto"
            value={diet}
            onChangeText={setDiet}
          />
        </View>

        <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutYou;

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
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  field: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  doneButton: {
    marginTop: 30,
    backgroundColor: '#007aff',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  doneText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
