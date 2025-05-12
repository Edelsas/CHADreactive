import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const fakeFriends = [
  { id: '1', name: 'Alex Johnson', status: 'Walking Champion 🏃‍♂️' },
  { id: '2', name: 'Brianna Lee', status: 'Hydration Pro 💧' },
  { id: '3', name: 'Carlos Vega', status: 'Calorie Crusher 🔥' },
  { id: '4', name: 'Dana Patel', status: 'Vegan Vibes 🥗' },
  { id: '5', name: 'Ethan Chen', status: 'Late Night Jogger 🌙' },
  { id: '6', name: 'Farah Ahmed', status: 'Yoga Guru 🧘‍♀️' },
  { id: '7', name: 'Gabe Martinez', status: 'Lifting Legend 💪' },
];

const FriendsList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your C.H.A.D Friends</Text>
      <FlatList
        data={fakeFriends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: `https://ui-avatars.com/api/?name=${item.name.replace(' ', '+')}&background=random` }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.status}>{item.status}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default FriendsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#007aff',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  status: {
    fontSize: 14,
    color: '#666',
  },
});
