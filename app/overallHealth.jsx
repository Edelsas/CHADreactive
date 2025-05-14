import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TrackerInformation = ({ tracker, value, unit, editable, onChange }) => (
  <View style={styles.trackerInfo}>
    <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{tracker}</Text>
    {editable ? (
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter value"
        value={value}
        onChangeText={onChange}
      />
    ) : (
      <Text>{value} {unit}</Text>
    )}
    {editable && unit ? <Text style={styles.unit}>{unit}</Text> : null}
  </View>
);

const OverallHealth = () => {
  const router = useRouter();
  const [hoursSlept, setHoursSlept] = useState('');

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.journeyTitle}>Your Journey</Text>

      <View>
        <Text style={styles.title}>Overall Health Tracker</Text>
        <Text style={{ textAlign: 'center' }}>Your progress for today.</Text>
      </View>

      <View style={{ alignItems: 'center' }}>
        <TrackerInformation tracker="Calories Burned" value={10} unit="cal" />
        <TrackerInformation
          tracker="Hours Slept"
          value={hoursSlept}
          unit="hours"
          editable={true}
          onChange={setHoursSlept}
        />
        <TrackerInformation tracker="Hydration Intake" value={6} unit="liters of water" />
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
    paddingTop: 50,
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
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
    paddingVertical: 4,
  },
  unit: {
    marginTop: 5,
    fontSize: 14,
    color: '#555',
  },
});
