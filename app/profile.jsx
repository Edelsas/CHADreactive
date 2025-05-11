import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  const router = useRouter();

  // Simulated user data — replace with actual state or props as needed
  let username = "username";
  let weight = "35";
  let weightGoal = "";       // Placeholder
  let calorieIntake = "";    // Placeholder
  let preferredDiet = "";    // Placeholder

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Profile Information</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>👤 Username:</Text>
        <Text style={styles.value}>{username || 'Not set'}</Text>

        <Text style={styles.label}>⚖️ Weight:</Text>
        <Text style={styles.value}>{weight || 'Not set'} kg</Text>

        <Text style={styles.label}>🎯 Weight Goal:</Text>
        <Text style={styles.value}>{weightGoal || 'Not set'}</Text>

        <Text style={styles.label}>🔥 Calorie Intake:</Text>
        <Text style={styles.value}>{calorieIntake || 'Not set'} kcal</Text>

        <Text style={styles.label}>🥗 Preferred Diet:</Text>
        <Text style={styles.value}>{preferredDiet || 'Not set'}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.navigate('/EditProfile')}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonBack} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#f0f8ff',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  button: {
    padding: 15,
    width: '70%',
    backgroundColor: 'rgb(70, 181, 255)',
    borderRadius: 20,
    marginVertical: 10,
  },
  buttonBack: {
    padding: 15,
    width: '30%',
    backgroundColor: 'rgb(228, 34, 34)',
    borderRadius: 20,
    marginVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
