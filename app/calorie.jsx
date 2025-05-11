import { useRouter } from 'expo-router'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, {useState} from 'react'


const Calorie = () => {
  const router = useRouter();

  const [calorieInput, setCalorieInput] = useState(0);
  const [calorieDisplay, setCalorieDisplay] = useState(0);

  const handlePress = () => {
    setCalorieDisplay(calorieInput);
    setCalorieInput(0);
  }

  return (
    <SafeAreaView style={styles.caloreView}>
        <Text style={styles.title}>Calorie Tracker</Text>

        <Text style={styles.textCalories}>{calorieDisplay} Cal</Text>

        <Text>How many calories did you burn today?</Text>

        <TextInput
          style={styles.textInput}
          placeholder='0' 
          placeholderTextColor={'grey'}
          value={calorieInput}
          onChangeText={(text) => setCalorieInput(text)}
          keyboardType='numeric'
          />

        <Button title="Submit" onPress={handlePress}/>
        <Button title="Back" onPress={() => router.back()}/>
    </SafeAreaView>
  )
}

export default Calorie

const styles = StyleSheet.create({
  caloreView: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 40
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  textInput: {
    height: 40,
    width: '100%',
    marginVertical: 16,
    padding: 10,
    borderWidth: 1,
    borderRadius: 4
  },
  textCalories: {
    fontSize: 32,
    padding: 16
  }
})