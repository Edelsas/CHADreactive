import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Support = () => {
  const router = useRouter();

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
            It adapts over time based on your progress and feedback to ensure you stay on track toward achieving your fitness goals.{"\n\n"}

            <Text style={styles.question}>Do I need equipment for the workouts?{"\n"}</Text>
            -No, the app can design workouts based on your available equipment or lack thereof. Whether you're at the gym or at home with no equipment, the AI will generate effective routines for you.{"\n\n"}

            <Text style={styles.question}>Can the AI adjust workouts if they are too hard or too easy?{"\n"}</Text>
            -Yes! The AI learns from your feedback and adjusts the difficulty and intensity of workouts accordingly, ensuring you’re always challenged but not overwhelmed.{"\n\n"}

            <Text style={styles.question}>How does the app track my progress?{"\n"}</Text>
            -The app monitors your workout completion, reps/sets, weights used, and overall performance. You can also manually input measurements or progress photos to get a complete view of your fitness journey.{"\n\n"}

            <Text style={styles.question}>Can I set specific fitness goals in the app?{"\n"}</Text>
            -Absolutely! You can set a variety of fitness goals, such as fat loss, muscle gain, or improved endurance, and the AI will create a plan tailored to help you achieve them.
          </Text>
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
  backButton: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 25,
    width: 120,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
