// app/walkTracker.jsx
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Alert, Linking } from 'react-native';
import * as Location from 'expo-location';
import { getProfileSession } from './profileSession';

const walkTracker = () => {
    const [started, setStarted] = useState(false);
    const [distance, setDistance] = useState(0);
    const [duration, setDuration] = useState(0);
    const [calories, setCalories] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [locationSubscription, setLocationSubscription] = useState(null);
    const [lastLocation, setLastLocation] = useState(null);
    const timerRef = useRef(null);

    const profile = getProfileSession();

    const toRad = (value) => (value * Math.PI) / 180;
    const getDistance = (loc1, loc2) => {
        const R = 6371; // km
        const dLat = toRad(loc2.latitude - loc1.latitude);
        const dLon = toRad(loc2.longitude - loc1.longitude);
        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(loc1.latitude)) *
            Math.cos(toRad(loc2.latitude)) *
            Math.sin(dLon / 2) ** 2;
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    };

    const startWalk = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission denied', 'Location permission is required.');
            return;
        }

        setStarted(true);
        setDistance(0);
        setDuration(0);
        setStartTime(Date.now());

        timerRef.current = setInterval(() => {
            setDuration((prev) => prev + 1);
        }, 1000);

        const sub = await Location.watchPositionAsync(
            { accuracy: Location.Accuracy.Highest, timeInterval: 2000, distanceInterval: 1 },
            (loc) => {
                if (lastLocation) {
                    const d = getDistance(lastLocation.coords, loc.coords);
                    setDistance((prev) => prev + d);
                }
                setLastLocation(loc);
            }
        );
        setLocationSubscription(sub);
    };

    const stopWalk = async () => {
        setStarted(false);
        clearInterval(timerRef.current);
        locationSubscription?.remove();

        const speed = distance * 1000 / duration; // m/s
        const prompt = `Estimate calories burned by a person walking ${distance.toFixed(2)} km in ${duration} seconds at ${speed.toFixed(2)} m/s. 
The person is ${profile.age || 25} years old, ${profile.height || 170} cm tall, and weighs ${profile.weight || 70} kg. Just return the number of calories.`;

        const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer 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`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [{ role: 'user', content: prompt }],
            }),
        });

        const json = await res.json();
        const response = json.choices?.[0]?.message?.content || '';
        const cal = parseFloat(response.match(/\d+(\.\d+)?/)) || 0;
        setCalories(cal);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Walk Tracker</Text>
            <Text style={styles.metric}>Distance: {distance.toFixed(2)} km</Text>
            <Text style={styles.metric}>Time: {Math.floor(duration / 60)}m {duration % 60}s</Text>
            {calories !== null && <Text style={styles.metric}>Calories Burned: {calories.toFixed(2)} kcal</Text>}

            {!started ? (
                <Button title="Start Walk" onPress={startWalk} />
            ) : (
                <Button title="End Walk" onPress={stopWalk} color="red" />
            )}

            {lastLocation && (
                <Button
                    title="Navigate to current location"
                    onPress={() =>
                        Linking.openURL(`https://www.google.com/maps?q=${lastLocation.coords.latitude},${lastLocation.coords.longitude}`)
                    }
                />
            )}
        </View>
    );
};

export default walkTracker;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },
    metric: {
        fontSize: 18,
        marginVertical: 8,
    },
});
