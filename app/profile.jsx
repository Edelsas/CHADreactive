import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getProfileSession } from './profileSession';

const Profile = () => {
  const router = useRouter();
  const {
    username,
    weight,
    weightGoal,
    calorieIntake,
    preferredDiet,
  } = getProfileSession();

  const [quote, setQuote] = useState('');
  const [loadingQuote, setLoadingQuote] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `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`, // Replace this with your key
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'user',
                content: 'Give me one short inspirational fitness quote.',
              },
            ],
            max_tokens: 60,
            temperature: 0.7,
          }),
        });

        const json = await response.json();
        const content = json.choices?.[0]?.message?.content;
        setQuote(content || 'Keep pushing forward!');
      } catch (err) {
        console.error('Failed to fetch quote:', err);
        setQuote('Keep pushing forward!');
      } finally {
        setLoadingQuote(false);
      }
    };

    fetchQuote();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Your C.H.A.D Profile</Text>
      {loadingQuote ? (
        <ActivityIndicator color="#ccc" size="small" style={{ marginBottom: 20 }} />
      ) : (
        <Text style={styles.subtext}>{quote}</Text>
      )}

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

      <TouchableOpacity style={styles.button} onPress={() => router.navigate('/editProfile')}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/friendslist')}>
        <Text style={styles.buttonText}>Friend's List</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.navigate('/tutorial')}>
        <Text style={styles.buttonText}>Tutorial</Text>
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
    backgroundColor: '#1a1a1a',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtext: {
    fontSize: 14,
    color: '#ccc',
    fontStyle: 'italic',
    marginBottom: 25,
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#555',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    color: 'white'
  },
  value: {
    fontSize: 16,
    marginBottom: 5,
    color: '#ccc',
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
