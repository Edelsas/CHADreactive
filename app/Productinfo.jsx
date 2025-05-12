import React, { useEffect, useState } from 'react';
import { Text, View, Button, StyleSheet, Image, ScrollView } from 'react-native';
import NutriScore from '../components/nutriscore';
import SvgUri from 'react-native-svg';


export default function ProductInfo({ route, navigation }) {
  const nutriScoreMapping = [
    { grade: 'a', range: [0, 2], color: '#007A00' },
    { grade: 'b', range: [3, 10], color: '#85BB2F' },
    { grade: 'c', range: [11, 18], color: '#FFD700' },
    { grade: 'd', range: [19, 40], color: '#FF6600' },
    { grade: 'e', range: [41, 100], color: '#FF0000' },
  ];

  const [inte, setInte] = useState(10);
  const { datap } = route.params || {};

  const incInte = () => {
    setInte((prevInte) => prevInte + 10);
  };

  useEffect(() => {
    if (datap?.product_name) {
      navigation.setOptions({ title: datap.product_name });
    }
  }, [datap?.product_name, navigation]);

  if (!datap) {
    return <Text>Product data not available</Text>;
  }

  const g = datap.nutriscore_grade;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <View style={styles.imageContainer}>
            {datap.image_url && (
              <Image source={{ uri: datap.image_url }} resizeMode="contain" style={styles.image} />
            )}
            {datap.image_ingredients_url && (
              <Image source={{ uri: datap.image_ingredients_url }} resizeMode="contain" style={styles.image} />
            )}
          </View>
          <Text style={styles.bigtb}>{datap.product_name}</Text>
          <View style={styles.nutriScoreContainer}>
            <Text style={styles.bigt}>NutriScore: {g.toUpperCase()}</Text>
            <NutriScore grade={g} mapping={nutriScoreMapping} />
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.bigt}>Ingredients</Text>
            <View style={styles.ingredientContainer}>
            <Image source={{uri: "https://world.openfoodfacts.org/images/misc/nutriscore-a.png"}} width="100px" height="100px"/>
              {datap.ingredients && datap.ingredients.slice(0, inte).map((item, index) => (
                <View key={index} style={styles.ingredientBox}>
                  <Text>{item.text}</Text>
                </View>
              ))}
            </View>
            {inte < datap.ingredients.length && (
              <Button onPress={incInte} title="Show More" />
            )}
            <Text style={styles.smallt}>{datap.ingredients_text}</Text>
            <Text style={styles.bigt}>Quantity</Text>
            <Text style={styles.smallt}>{datap.quantity}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  bigtb: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bigt: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 5,
  },
  smallt: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: "center",
  },
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
  nutriScoreContainer: {
    width: "95%",
    alignItems: "center",
    backgroundColor: "#BCCCDC",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 12,
  },
  ingredientContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    alignItems: 'center',
    justifyContent: "center",
  },
  ingredientBox: {
    width: "45%",
    margin: 5,
    backgroundColor: "#e4e7eb",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});