import { useRouter } from "expo-router";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";

const SimpleButton = ({ navigate, text }) => {
  const router = useRouter();

  return (
    <TouchableHighlight
      onPress={() => router.push(navigate)}
      style={styles.button}
      underlayColor={'rgb(47, 131, 188)'}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableHighlight>
  );
};

export default function Index() {
  return (
    <SafeAreaView style={styles.login}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <TextInput style={styles.input} placeholder="Email" placeholderTextColor={"grey"} />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor={"grey"} />

        <View style={{ alignItems: 'center' }}>
          <SimpleButton navigate="welcome" text="Login" />
          <SimpleButton navigate="register" text="Register" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    paddingVertical: 20
  },
  card: {
    margin: 50,
  },
  input: {
    height: 40,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 4
  },
  button: {
    backgroundColor: 'rgb(70, 181, 255)',
    marginTop: 10,
    padding: 15,
    borderRadius: 20,
    width: 125
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  }
});
