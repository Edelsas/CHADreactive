import { useRouter } from "expo-router";
import { Text, View, StyleSheet, SafeAreaView, TextInput, KeyboardAvoidingView, Platform, TouchableHighlight, Keyboard} from "react-native";
import { TouchableWithoutFeedback } from "react-native-web";

export default function Register() {
    const router = useRouter();

    const onPress = () => {
        console.log("Button has been pressed");
    }

    return (
        <SafeAreaView style={styles.screen}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding': 'height'}
                style={styles.card}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <Text style={styles.title}>Register</Text>
                        
                        <TextInput style={styles.input} placeholder="First Name" placeholderTextColor={"grey"} />
                        <TextInput style={styles.input} placeholder="Last Name" placeholderTextColor={"grey"} />
                        <TextInput style={styles.input} placeholder="Email" placeholderTextColor={"grey"}/>
                        <TextInput style={styles.input} placeholder="Password" placeholderTextColor={"grey"}/>
                        <TextInput style={styles.input} placeholder="Confirm Password" placeholderTextColor={"grey"}/>

                        <TouchableHighlight onPress={onPress} style={styles.registerButton} underlayColor={'rgb(47, 131, 188)'}>
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => router.back()} style={styles.backButton} underlayColor={'rgba(188, 47, 47, 0.64)'}>
                            <Text style={styles.buttonText}>Back</Text>
                        </TouchableHighlight>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#1a1a1a',
        flex: 1,
        justifyContent:'center',
    },
    title: {
        fontSize: 34,
        fontWeight: "bold",
        paddingVertical: 20,
        color: 'white'
    },
    card: {
        padding: 30,
        backgroundColor: '#333',
        borderRadius: 16
    },
    input: {
        height: 40,
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#555',
        color: 'white'
    },
    registerButton: {
        backgroundColor: 'rgb(70, 181, 255)',
        marginHorizontal: '25%',
        marginTop: 10,
        padding: 15,
        borderRadius: 20
    },
    backButton: {
        backgroundColor: 'rgb(228, 34, 34)',
        marginHorizontal: '30%',
        marginTop: 10,
        padding: 15,
        borderRadius: 20
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    }
})
