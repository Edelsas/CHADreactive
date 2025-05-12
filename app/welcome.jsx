import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const WideButton = ({ navigate, text }) => {
    const router = useRouter();
    return (
        <TouchableHighlight
            onPress={() => router.navigate(navigate)}
            style={styles.button}
            underlayColor={'rgb(47, 131, 188)'}
        >
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableHighlight>
    );
};

const Welcome = () => {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Welcome to C.H.A.D.</Text>
                    <Text style={styles.subtext}>Your personal dashboard to better health</Text>
                </View>

                <View style={styles.buttonLayout}>
                    <WideButton text="Profile" navigate="/profile" />
                    <WideButton text="Health Trackers" navigate="/overallHealth" />
                    <WideButton text="Diet Recommender" navigate="/diet" />
                    <WideButton text="Food Scanner" navigate="/scan" />
                    <WideButton text="Workout Planner" navigate="/workout" />
                    <WideButton text="Challenges" navigate="/challenges" />
                    <WideButton text="Go on a Walk" navigate="/walkTracker" />
                    <WideButton text="Settings" navigate="/settings" />
                    <WideButton text="Walk Tracker" navigate="/walkTracker" />
                    <WideButton text="Support" navigate="/support" />

                    <TouchableHighlight
                        onPress={() => router.back()}
                        style={styles.smallButton}
                        underlayColor={'rgba(188, 54, 47, 0.63)'}
                    >
                        <Text style={styles.buttonText}>Log Out</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    subtext: {
        fontSize: 16,
        color: '#ccc',
        marginTop: 8,
        textAlign: 'center',
    },
    buttonLayout: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        padding: 15,
        width: '100%',
        backgroundColor: 'rgb(70, 181, 255)',
        borderRadius: 20,
        marginVertical: 10,
    },
    smallButton: {
        padding: 15,
        width: '40%',
        backgroundColor: 'rgb(228, 34, 34)',
        borderRadius: 20,
        marginTop: 20,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
