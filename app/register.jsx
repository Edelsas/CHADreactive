import { useRouter } from "expo-router";
import { Text, View, StyleSheet, SafeAreaView, TextInput, Button, TouchableHighlight} from "react-native";

export default function Register() {
    const router = useRouter();

    const onPress = () => {
        console.log("Button has been pressed");
    }

    return (
        <SafeAreaView>
            <View style={styles.card}>
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
