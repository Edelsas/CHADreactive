import { useRouter } from "expo-router";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";

const SimpleButton = ({ navigate, text }) => {
  const router = useRouter();

  return (
    <TouchableHighlight
      onPress={() => router.push(navigate)}
      style={styles.button}
      underlayColor={'rgb(47, 131, 188)'}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableHighlight>
  );
};

export default function Index() {
  const router = useRouter();

  const handleLogin = () => {
    // Navigate to 'aboutyou' screen instead of 'welcome'
    router.push('aboutyou');
  };

  return (
    <SafeAreaView style={styles.login}>
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeTitle}>Welcome to C.H.A.D</Text>
        <Text style={styles.subtext}>Your personal app to get you on the right track</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <TextInput style={styles.input} placeholder="Email" placeholderTextColor={"grey"} />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor={"grey"} />

        <View style={{ alignItems: 'center' }}>
          <TouchableHighlight
            onPress={handleLogin}
            style={styles.button}
            underlayColor={'rgb(47, 131, 188)'}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>

          <SimpleButton navigate="register" text="Register" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtext: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: 'white',
    paddingVertical: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#333',
    padding: 30,
    borderRadius: 16,
  },
  input: {
    height: 40,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#555',
    color: 'white',
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
