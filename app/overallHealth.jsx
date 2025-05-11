import { useRouter } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TrackerInformation = props => {
  return (
    <View style={styles.trackerInfo}>
      <Text style={{ fontWeight: 'bold' }}>{props.tracker}</Text>
      <Text>{props.value} {props.unit}</Text>
    </View>
  );
};

const OverallHealth = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.journeyTitle}>Your Journey</Text>

      <View>
        <Text style={styles.title}>Overall Health Tracker</Text>
        <Text style={{ textAlign: 'center' }}>Your progress for today.</Text>
      </View>

      <View style={{ alignItems: 'center' }}>
        <TrackerInformation tracker="Calories Burned" value={10} unit="cal" />
        <TrackerInformation tracker="Hours Slept" value={8} unit="hours" />
        <TrackerInformation tracker="Hydration Intake" value={68} unit="liters of water" />
        <TrackerInformation tracker="Steps Taken" value={100} unit="steps" />
      </View>

      <View style={{ marginTop: 30 }}>
        <Button title="Return to Home" onPress={() => router.push('/welcome')} />
      </View>
    </SafeAreaView>
  );
};

export default OverallHealth;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 35,
    paddingTop: 50, // for top spacing
  },
  journeyTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#4682B4',
  },
  trackerInfo: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 14,
    marginTop: 15,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
});
