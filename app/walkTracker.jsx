<<<<<<< HEAD
import * as Location from 'expo-location';
import { useRef, useState } from 'react';
import { Alert, Button, Dimensions, Linking, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { getProfileSession } from './profileSession';

const walkTracker = () => {
  const [started, setStarted] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [calories, setCalories] = useState(null);
  const [locationSubscription, setLocationSubscription] = useState(null);
  const [lastLocation, setLastLocation] = useState(null);
  const [path, setPath] = useState([]);
  const timerRef = useRef(null);

  const profile = getProfileSession();

  const toRad = (value) => (value * Math.PI) / 180;
  const getDistance = (loc1, loc2) => {
    const R = 6371;
    const dLat = toRad(loc2.latitude - loc1.latitude);
    const dLon = toRad(loc2.longitude - loc1.longitude);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(loc1.latitude)) * Math.cos(toRad(loc2.latitude)) * Math.sin(dLon / 2) ** 2;
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
    setCalories(null);
    setPath([]);
    timerRef.current = setInterval(() => setDuration((prev) => prev + 1), 1000);

    const sub = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 2000,
        distanceInterval: 1,
      },
      (loc) => {
        if (lastLocation) {
          const d = getDistance(lastLocation.coords, loc.coords);
          setDistance((prev) => prev + d);
        }
        setLastLocation(loc);
        setPath((prev) => [...prev, loc.coords]);
      }
    );

    setLocationSubscription(sub);
  };

  const stopWalk = async () => {
    setStarted(false);
    clearInterval(timerRef.current);
    locationSubscription?.remove();

    const speed = distance * 1000 / duration;
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

      {!started && (distance > 0 || calories !== null) && (
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>🏁 Walk Summary</Text>
          <Text style={styles.summaryItem}>Distance: {distance.toFixed(2)} km</Text>
          <Text style={styles.summaryItem}>Duration: {Math.floor(duration / 60)}m {duration % 60}s</Text>
          <Text style={styles.summaryItem}>Calories Burned: {calories?.toFixed(2)} kcal</Text>
        </View>
      )}

      {started && (
        <>
          <Text style={styles.metric}>Distance: {distance.toFixed(2)} km</Text>
          <Text style={styles.metric}>Time: {Math.floor(duration / 60)}m {duration % 60}s</Text>
        </>
      )}

      <Button
        title={started ? 'End Walk' : 'Start Walk'}
        color={started ? 'red' : 'green'}
        onPress={started ? stopWalk : startWalk}
      />

      {lastLocation && (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: lastLocation.coords.latitude,
              longitude: lastLocation.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={lastLocation.coords} title="You" />
            <Polyline coordinates={path} strokeColor="blue" strokeWidth={4} />
          </MapView>

          <Button
            title="Navigate to Current Location"
            onPress={() =>
              Linking.openURL(
                `https://www.google.com/maps?q=${lastLocation.coords.latitude},${lastLocation.coords.longitude}`
              )
            }
          />
        </>
      )}
    </View>
  );
};

export default walkTracker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  metric: {
    fontSize: 16,
    marginBottom: 8,
  },
  summaryBox: {
    backgroundColor: '#e6f7ff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#007acc',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#005fa3',
  },
  summaryItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  map: {
    width: Dimensions.get('window').width - 40,
    height: 300,
    borderRadius: 12,
    marginVertical: 20,
  },
=======
// app/WalkTracker.jsx
import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, Alert, Linking } from 'react-native';
import * as Location from 'expo-location';
import { getProfileSession } from './profileSession';
import { useRouter } from 'expo-router';

const WalkTracker = () => {
    const router = useRouter();

    const [started, setStarted] = useState(false);
    const [distanceMi, setDistanceMi] = useState(0);
    const [durationSec, setDurationSec] = useState(0);
    const [speedMph, setSpeedMph] = useState(0);
    const [calories, setCalories] = useState(null);
    const [currentCoords, setCurrentCoords] = useState(null);
    const [summaryVisible, setSummaryVisible] = useState(false);

    const [lastLocation, setLastLocation] = useState(null);
    const locationSubscription = useRef(null);
    const timerRef = useRef(null);

    const profile = getProfileSession();

    const toRad = (value) => (value * Math.PI) / 180;

    const getDistanceKm = (loc1, loc2) => {
        const R = 6371;
        const dLat = toRad(loc2.latitude - loc1.latitude);
        const dLon = toRad(loc2.longitude - loc1.longitude);
        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(loc1.latitude)) *
            Math.cos(toRad(loc2.latitude)) *
            Math.sin(dLon / 2) ** 2;
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // in km
    };

    const startWalk = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission denied', 'Location access is required.');
            return;
        }

        setStarted(true);
        setDistanceMi(0);
        setDurationSec(0);
        setCalories(null);
        setSummaryVisible(false);

        timerRef.current = setInterval(() => {
            setDurationSec((prev) => prev + 1);
        }, 1000);

        locationSubscription.current = await Location.watchPositionAsync(
            { accuracy: Location.Accuracy.Highest, timeInterval: 2000, distanceInterval: 1 },
            (loc) => {
                const coords = loc.coords;
                if (lastLocation) {
                    const distanceKm = getDistanceKm(lastLocation.coords, coords);
                    const distanceMiles = distanceKm * 0.621371;
                    setDistanceMi((prev) => prev + distanceMiles);
                }
                setLastLocation(loc);
                setCurrentCoords(coords);
            }
        );
    };

    const stopWalk = async () => {
        setStarted(false);
        clearInterval(timerRef.current);
        locationSubscription.current?.remove();
        locationSubscription.current = null;

        const speed = distanceMi / (durationSec / 3600); // mph
        setSpeedMph(speed);

        const prompt = `Estimate calories burned by a person walking ${distanceMi.toFixed(
            2
        )} miles in ${durationSec} seconds at ${speed.toFixed(2)} mph. The person is ${profile.age || 25
            } years old, ${profile.height || 170} cm tall, and weighs ${profile.weight || 70
            } kg. Just return the number of calories only.`;

        const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer sk- proj - KJOkH3lMPa9wK5O_R_8RBFjjNPO4BZWL7UM73_DwfwO2GwnCCdZ - DPVNtkbqeqeBzviJBxiqtpT3BlbkFJsT8fdYhSrySMfZPId8n_Skx0psN2FsUvCb6rf - 3gymJpEWc0XT3Ns0uM- NYIT48I5p1T1tbKcA',
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
        setSummaryVisible(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Go on a Walk</Text>

            {started && (
                <>
                    <Text style={styles.metric}>Distance: {distanceMi.toFixed(2)} miles</Text>
                    <Text style={styles.metric}>
                        Time: {Math.floor(durationSec / 60)}m {durationSec % 60}s
                    </Text>
                    <Text style={styles.metric}>
                        Avg Speed: {(distanceMi / (durationSec / 3600)).toFixed(2)} mph
                    </Text>
                    <Button title="End Walk" onPress={stopWalk} color="red" />
                </>
            )}

            {!started && !summaryVisible && (
                <Button title="Start Walk" onPress={startWalk} />
            )}

            {summaryVisible && (
                <View style={styles.summary}>
                    <Text style={styles.metric}>Walk Summary:</Text>
                    <Text style={styles.metric}>📏 Distance: {distanceMi.toFixed(2)} miles</Text>
                    <Text style={styles.metric}>
                        ⏱ Duration: {Math.floor(durationSec / 60)}m {durationSec % 60}s
                    </Text>
                    <Text style={styles.metric}>🔥 Calories Burned: {calories?.toFixed(2)} kcal</Text>
                    <Text style={styles.metric}>🚶 Avg Speed: {speedMph.toFixed(2)} mph</Text>

                    {currentCoords && (
                        <>
                            <Text style={styles.metric}>
                                📍 Location: {currentCoords.latitude.toFixed(4)},{' '}
                                {currentCoords.longitude.toFixed(4)}
                            </Text>
                            <Button
                                title="Open in Maps"
                                onPress={() =>
                                    Linking.openURL(
                                        `https://www.google.com/maps?q=${currentCoords.latitude},${currentCoords.longitude}`
                                    )
                                }
                            />
                        </>
                    )}

                    <Button title="⬅ Back to Home" onPress={() => router.back()} color="gray" />
                </View>
            )}
        </View>
    );
};

export default WalkTracker;

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
        marginVertical: 6,
    },
    summary: {
        marginTop: 20,
    },
>>>>>>> 1120702219a107980f2d647724f55b052cd66429
});
