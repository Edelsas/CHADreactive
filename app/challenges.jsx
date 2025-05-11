import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Progress from 'react-native-progress';
import axios from 'axios';

// Replace with your real OpenAI API key
const OPENAI_API_KEY = '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';

// Default challenges in case API fails
const defaultChallenges = [
  { id: '1', title: 'Drink 8 Glasses of Water' },
  { id: '2', title: 'Walk 10,000 Steps' },
  { id: '3', title: 'Eat 5 Servings of Vegetables' },
  { id: '4', title: 'Complete a 20-min Workout' },
];

const Challenges = () => {
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
        title: line.replace(/^\d+[\).\s-]*/, ''), // Remove numbers like 1. or 1) at start
      }));

      setChallengesData(formattedChallenges);
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
});
