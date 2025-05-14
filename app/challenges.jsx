//PLEASE INSERT VALID OPENAI KEY IN LINE 8
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';

const OPENAI_API_KEY = 'INSERT OPENAI API KEY HERE';

const defaultChallenges = [
  { id: '1', title: 'Drink 8 Glasses of Water' },
  { id: '2', title: 'Walk 10,000 Steps' },
  { id: '3', title: 'Eat 5 Servings of Vegetables' },
  { id: '4', title: 'Complete a 20-min Workout' },
];

const Challenges = () => {
  const router = useRouter();
  const [challengesData, setChallengesData] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchChallengesFromAI = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful fitness and health assistant. Create a list of 5 short fitness or health challenges that users can complete in a day. Keep each challenge under 10 words.' },
            { role: 'user', content: 'Generate 5 simple health or workout challenges.' }
          ],
          temperature: 0.7,
          max_tokens: 150,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      const aiText = response.data.choices[0].message.content;
      const lines = aiText.split('\n').filter(line => line.trim() !== '');
      const formattedChallenges = lines.map((line, index) => ({
        id: (index + 1).toString(),
        title: line.replace(/^\d+[\).\s-]*/, ''),
      }));

      setChallengesData(formattedChallenges);
      setCompletedChallenges([]); // Reset completion when refreshed
    } catch (error) {
      console.error('Failed to fetch challenges:', error);
      setChallengesData(defaultChallenges);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallengesFromAI();
  }, []);

  const handleComplete = (id) => {
    if (!completedChallenges.includes(id)) {
      setCompletedChallenges([...completedChallenges, id]);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.challengeItem,
        completedChallenges.includes(item.id) && styles.completedItem,
      ]}
      onPress={() => handleComplete(item.id)}
    >
      <Text style={styles.challengeText}>
        {completedChallenges.includes(item.id) ? '✅ Completed: ' : ''}
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const progress = challengesData.length > 0
    ? completedChallenges.length / challengesData.length
    : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daily Challenges</Text>

      <View style={styles.progressContainer}>
        <Progress.Bar
          progress={progress}
          width={null}
          height={20}
          borderRadius={10}
          color="#4caf50"
          unfilledColor="#e0e0e0"
          borderWidth={0}
        />
        <Text style={styles.progressText}>
          {Math.round(progress * 100)}% Completed
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={challengesData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingTop: 20 }}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={fetchChallengesFromAI}>
        <Text style={styles.buttonText}>🔄 Refresh Challenges</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonBack} onPress={() => router.back()}>
        <Text style={styles.buttonText}>← Go Back Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Challenges;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressText: {
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  challengeItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  challengeText: {
    fontSize: 18,
  },
  completedItem: {
    backgroundColor: '#a5d6a7',
  },
  button: {
    marginTop: 20,
    padding: 14,
    backgroundColor: '#007aff',
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonBack: {
    marginTop: 10,
    padding: 14,
    backgroundColor: '#e53935',
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
