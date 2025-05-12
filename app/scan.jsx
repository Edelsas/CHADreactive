import React, { useState, useEffect, useMemo, useRef } from "react";
import { Text, View, StyleSheet, Button, ScrollView, Alert,Image } from "react-native";
import { CameraView, Camera } from "expo-camera";
import RBSheet from 'react-native-raw-bottom-sheet';
import NutriScore from "../components/nutriscore";
import { SvgFromUri } from "react-native-svg";


export default function Scanner({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const refRBSheet = useRef();
  const [nutriscore, setNutriscore] = useState("");
  const [datap, setDatap] = useState("");
  const [found, setFound] = useState(false);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const nutriScoreMapping = [
  { grade: 'a', range: [0, 2], color: '#007A00' },
  { grade: 'b', range: [3, 10], color: '#85BB2F' },
  { grade: 'c', range: [11, 18], color: '#FFD700' },
  { grade: 'd', range: [19, 40], color: '#FF6600' },
  { grade: 'e', range: [41, 100], color: '#FF0000' },
];

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getCameraPermissions();
  }, []);

  // Effect to log the updated datap state after it changes

  
  const rescan = () => {
    setScanned(false);
    if (refRBSheet.current) {
      refRBSheet.current.close();
    } else {
      console.error("RBSheet reference is not available.");
    }
  };

  const handleBarcodeScanned = async ({ type, data }) => {
    setScanned(true);
    try {
      const searchb = await fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`);
      const searcht = await searchb.json();
      console.log("Fetched product data:", searcht); // Log the fetched data
      setDatap(searcht.product); // Update the datap state with fetched data
      setNutriscore(`https://static.openfoodfacts.org/images/misc/nutriscore-${searcht.product.nutriscore_grade}-new-en.svg`);

      if (refRBSheet.current) {
        refRBSheet.current.open();
      } else {
        console.error("RBSheet reference is not available.");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to fetch product data.");
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.camplace}>
        <Text style={styles.bigt}>Scan a food product Bar Code</Text>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["upc_e", "upc_a"],
          }}
          style={styles.cam}
        />
        <RBSheet
          ref={refRBSheet}
          draggable
          height={600}
          customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
          customStyles={{
            wrapper: {
              backgroundColor: '#00000033',
            },
            container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}
        >
        <ScrollView>
          <View style={styles.contentContainer}>

            {/* Ensure datap is available before accessing its properties */}
            {datap ? (
              <View>
                <View style={{display:"flex",flexDirection:"row", justifyContent:"center",alignItems:"center",marginBottom:10,}}>
                {datap.image_url &&(
                   <Image source={{ uri: datap.image_url }} resizeMode='contain' style={{ width: 200,  height: 200 }} />
                )}
                {datap.image_ingredients_url &&(
                  <Image source={{ uri: datap.image_ingredients_url }} resizeMode='contain' style={{ width: 200,  height: 200 }} />
                )}
                </View>
                <Text style={styles.bigt}>{datap.product_name}</Text> 
                <Text style={styles.bigt}>Nutriscore : {datap.nutriscore_grade.toUpperCase()}</Text>
                 <View style={{display:"flex", justifyContent:"center",alignItems:"center",marginBottom:5,}}>
                  {nutriscore &&(
                  <SvgFromUri source={{uri: "https://world.openfoodfacts.org/images/misc/nutriscore-a-en-new.svg"}} width="100%" height="100%"/>
                )}
                </View>
                <Text>Ingredients: {datap.ingredients_text}</Text>
                <Text>Vitamins : {datap.vitamins_tags}</Text>
                <Text>Quantity : {datap.quantity}</Text>
              </View>
              
            ) : (
              <Text>No product data available.</Text>
            )}
            {scanned && (
              <View style={styles.mb}>
              <Button  title={"Tap to Scan Again"} onPress={() => rescan()} />
            </View>
            )}
             <Button title={"More Details"} onPress={() => navigation.navigate("Product",{datap})} />
          </View>
          </ScrollView>
        </RBSheet>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  mb:{
     padding:10,
  },
  cam: {
    width: 300,
    height: 300,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  camplace: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bigt: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
});
