import Slider from '@react-native-community/slider';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Button,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { SafeAreaView } from 'react-native-safe-area-context';

const OPENAI_API_KEY = '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';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Workout = () => {
  const router = useRouter();

  const [workout, setWorkout] = useState('');
  const [customWorkout, setCustomWorkout] = useState('');
  const [intensity, setIntensity] = useState(3);
  const [selectedDays, setSelectedDays] = useState([]);
  const [bestTime, setBestTime] = useState('');
  const [plan, setPlan] = useState('');

  const toggleDay = (day) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const generateWorkoutPlan = async () => {
    const workoutFocus = customWorkout || workout;
    if (!workoutFocus || selectedDays.length === 0 || !bestTime) {
      alert('Please complete all fields.');
      return;
    }

    const prompt = `Create a personalized workout plan focused on ${workoutFocus} with intensity level ${intensity}/5. The user prefers to work out on ${selectedDays.join(', ')} at ${bestTime}. Provide a structured and safe weekly plan.`;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a certified fitness trainer. Provide structured and motivational workout plans.',
            },
            { role: 'user', content: prompt },
          ],
          temperature: 0.7,
          max_tokens: 700,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );
      setPlan(response.data.choices[0].message.content);
    } catch (error) {
      console.error(error);
      setPlan('❌ Error generating plan.');
    }
  };

  const workoutData = [
    { key: '1', value: 'Legs' },
    { key: '2', value: 'Arms' },
    { key: '3', value: 'Abs' },
    { key: '4', value: 'Cardio' },
    { key: '5', value: 'Full Body' },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Your Trainer!</Text>

        <Text style={styles.label}>Select Workout Focus</Text>
        <SelectList
          data={workoutData}
          setSelected={setWorkout}
          placeholder="Choose a type"
          search={false}
        />

        <Text style={styles.label}>Or enter a custom workout goal</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. yoga flexibility"
          value={customWorkout}
          onChangeText={setCustomWorkout}
        />

        <Text style={styles.label}>Workout Intensity (1–5)</Text>
        <Text style={{ textAlign: 'center' }}>Level {intensity}</Text>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={1}
          maximumValue={5}
          step={1}
          value={intensity}
          onValueChange={setIntensity}
          minimumTrackTintColor="#0af"
          maximumTrackTintColor="#ccc"
        />

        <Text style={styles.label}>Preferred Workout Days</Text>
        <View style={styles.daysContainer}>
          {daysOfWeek.map(day => (
            <TouchableOpacity
              key={day}
              onPress={() => toggleDay(day)}
              style={[
                styles.dayButton,
                selectedDays.includes(day) && styles.daySelected,
              ]}
            >
              <Text style={{ color: selectedDays.includes(day) ? '#fff' : '#000' }}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Best Time of Day</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 6am, 5pm"
          value={bestTime}
          onChangeText={setBestTime}
        />

        <Button title="Generate Workout Plan" onPress={generateWorkoutPlan} />

        {plan ? (
          <View style={styles.result}>
            <Text style={styles.resultText}>{plan}</Text>
          </View>
        ) : null}

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Back to Menu</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Workout;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0faff',
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
    backgroundColor: '#fff',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 8,
  },
  dayButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007aff',
    backgroundColor: '#e0f0ff',
  },
  daySelected: {
    backgroundColor: '#007aff',
    borderColor: '#005bb5',
  },
  result: {
    marginTop: 30,
    backgroundColor: '#e8fbe8',
    padding: 20,
    borderRadius: 12,
    borderColor: '#a0e6a0',
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
});
