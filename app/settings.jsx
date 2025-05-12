import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings = () => {
  const router = useRouter();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [volume, setVolume] = useState(50);
  const [language, setLanguage] = useState('English');
  const [units, setUnits] = useState('Metric');
  const [textSize, setTextSize] = useState('Medium');
  const [contrast, setContrast] = useState('Standard');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Settings</Text>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.label}>🔔 Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
        </View>

        {/* Volume */}
        <View style={styles.section}>
          <Text style={styles.label}>🔊 Notification Volume: {volume}</Text>
          <Slider
            style={{ width: '100%' }}
            minimumValue={0}
            maximumValue={100}
            value={volume}
            onValueChange={setVolume}
          />
        </View>

        {/* Language */}
        <View style={styles.section}>
          <Text style={styles.label}>🌐 Language</Text>
          <Picker
            selectedValue={language}
            style={styles.picker}
            onValueChange={(itemValue) => setLanguage(itemValue)}
          >
            <Picker.Item label="English" value="English" />
            <Picker.Item label="Spanish" value="Spanish" />
            <Picker.Item label="French" value="French" />
            <Picker.Item label="German" value="German" />
            <Picker.Item label="Chinese" value="Chinese" />
          </Picker>
        </View>

        {/* Units */}
        <View style={styles.section}>
          <Text style={styles.label}>📏 Units</Text>
          <Picker
            selectedValue={units}
            style={styles.picker}
            onValueChange={(itemValue) => setUnits(itemValue)}
          >
            <Picker.Item label="Metric (kg, km)" value="Metric" />
            <Picker.Item label="Imperial (lb, mi)" value="Imperial" />
          </Picker>
        </View>

        {/* Accessibility */}
        <View style={styles.section}>
          <Text style={styles.label}>♿ Text Size</Text>
          <Picker
            selectedValue={textSize}
            style={styles.picker}
            onValueChange={(itemValue) => setTextSize(itemValue)}
          >
            <Picker.Item label="Small" value="Small" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="Large" value="Large" />
          </Picker>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>🎨 Contrast</Text>
          <Picker
            selectedValue={contrast}
            style={styles.picker}
            onValueChange={(itemValue) => setContrast(itemValue)}
          >
            <Picker.Item label="Standard" value="Standard" />
            <Picker.Item label="High Contrast" value="High" />
          </Picker>
        </View>

        {/* Password Reset */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>

        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Return to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scroll: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: '#89c9b8',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#2e2e2e',
    padding: 16,
    borderRadius: 12,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    color: '#fff',
    backgroundColor: '#3a3a3a',
  },
  button: {
    backgroundColor: '#dde9fb',
    padding: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#6b6b6b',
    fontWeight: '600',
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
