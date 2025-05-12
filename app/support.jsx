import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Support = () => {
  const router = useRouter();

  const [dietRating, setDietRating] = useState(3);
  const [workoutRating, setWorkoutRating] = useState(3);
  const [restaurantRating, setRestaurantRating] = useState(3);

  const handleSubmit = () => {
    Alert.alert(
      'Feedback Submitted',
      `Diet AI: ${dietRating}/5\nWorkout AI: ${workoutRating}/5\nRestaurant Recommender: ${restaurantRating}/5`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Need help?</Text>

        <View style={styles.contactBox}>
          <Text style={styles.contactText}>Contact us here:</Text>
          <Text style={styles.email}>Email: chadapp@gmail.com</Text>
        </View>

        <TouchableOpacity style={styles.forgotButton}>
          <Text style={styles.forgotButtonText}>Forgot Password</Text>
        </TouchableOpacity>

        <View style={styles.faqBox}>
          <Text style={styles.faqText}>
            <Text style={styles.question}>How does the AI create personalized workout plans?{"\n"}</Text>
            -The AI analyzes your fitness level, goals, and preferences to create tailored workout routines.
            It adapts over time based on your progress and feedback.{"\n\n"}

            <Text style={styles.question}>Do I need equipment for the workouts?{"\n"}</Text>
            -No, the app can design workouts based on your available equipment.{"\n\n"}

            <Text style={styles.question}>Can the AI adjust workouts if they are too hard or too easy?{"\n"}</Text>
            -Yes! The AI learns from your feedback and adjusts the difficulty accordingly.{"\n\n"}

            <Text style={styles.question}>How does the app track my progress?{"\n"}</Text>
            -The app monitors your workout completion, reps, weights, and performance.{"\n\n"}

            <Text style={styles.question}>Can I set specific fitness goals in the app?{"\n"}</Text>
            -Absolutely! Set goals and the AI will tailor a plan to help achieve them.
          </Text>
        </View>

        <View style={styles.reviewBox}>
          <Text style={styles.reviewTitle}>Rate Our AI Features</Text>

          <Text style={styles.label}>🍽️ Diet AI</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={5}
            step={1}
            value={dietRating}
            onValueChange={setDietRating}
            minimumTrackTintColor="#a8caff"
          />
          <Text style={styles.sliderValue}>{dietRating}/5</Text>

          <Text style={styles.label}>💪 Workout AI</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={5}
            step={1}
            value={workoutRating}
            onValueChange={setWorkoutRating}
            minimumTrackTintColor="#a8caff"
          />
          <Text style={styles.sliderValue}>{workoutRating}/5</Text>

          <Text style={styles.label}>🍴 Restaurant Recommender</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={5}
            step={1}
            value={restaurantRating}
            onValueChange={setRestaurantRating}
            minimumTrackTintColor="#a8caff"
          />
          <Text style={styles.sliderValue}>{restaurantRating}/5</Text>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit Review</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Support;

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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contactBox: {
    backgroundColor: '#2e2e2e',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
  },
  contactText: {
    color: '#ccc',
    fontSize: 16,
  },
  email: {
    color: '#a8caff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
  forgotButton: {
    backgroundColor: '#dde9fb',
    padding: 14,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  forgotButtonText: {
    color: '#6b6b6b',
    fontWeight: '600',
    fontSize: 16,
  },
  faqBox: {
    backgroundColor: '#2e2e2e',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    marginBottom: 30,
  },
  faqText: {
    color: '#ddd',
    fontSize: 14,
    lineHeight: 22,
  },
  question: {
    color: '#fff',
    fontWeight: 'bold',
  },
  reviewBox: {
    backgroundColor: '#2e2e2e',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    marginBottom: 20,
  },
  reviewTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  label: {
    color: '#ccc',
    fontSize: 15,
    marginTop: 15,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderValue: {
    color: '#a8caff',
    textAlign: 'right',
    fontSize: 14,
    marginBottom: 5,
  },
  submitButton: {
    backgroundColor: '#007aff',
    padding: 12,
    borderRadius: 20,
    marginTop: 15,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 25,
    width: 120,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
