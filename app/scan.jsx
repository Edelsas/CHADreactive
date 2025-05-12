import { Camera, CameraView } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Button, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import RBSheet from 'react-native-raw-bottom-sheet';
import { SvgFromUri } from "react-native-svg";

export default function Scanner() {
  const router = useRouter(); // ✅ using Expo Router
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const refRBSheet = useRef();
  const [nutriscore, setNutriscore] = useState("");
  const [datap, setDatap] = useState("");

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getCameraPermissions();
  }, []);

  const rescan = () => {
    setScanned(false);
    refRBSheet.current?.close();
  };

  const handleBarcodeScanned = async ({ type, data }) => {
    setScanned(true);
    try {
      const searchb = await fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`);
      const searcht = await searchb.json();
      setDatap(searcht.product);
      setNutriscore(`https://static.openfoodfacts.org/images/misc/nutriscore-${searcht.product.nutriscore_grade}-new-en.svg`);
      refRBSheet.current?.open();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to fetch product data.");
    }
  };

  if (hasPermission === null) return <Text>Requesting for camera permission</Text>;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.camplace}>
        <Text style={styles.bigt}>Scan a food product Bar Code</Text>

        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{ barcodeTypes: ["upc_e", "upc_a"] }}
          style={styles.cam}
        />

        <View style={styles.buttonContainer}>
          <Button title="Go Home" onPress={() => router.push("/welcome")} />
        </View>

        <RBSheet
          ref={refRBSheet}
          draggable
          height={600}
          customModalProps={{
            animationType: 'slide',
            statusBarTranslucent: true,
          }}
          customStyles={{
            wrapper: { backgroundColor: '#00000033' },
            container: {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            },
            draggableIcon: { backgroundColor: '#000' },
          }}
        >
          <ScrollView>
            <View style={styles.contentContainer}>
              {datap ? (
                <View>
                  <View style={styles.imageRow}>
                    {datap.image_url && (
                      <Image source={{ uri: datap.image_url }} resizeMode="contain" style={styles.image} />
                    )}
                    {datap.image_ingredients_url && (
                      <Image source={{ uri: datap.image_ingredients_url }} resizeMode="contain" style={styles.image} />
                    )}
                  </View>

                  <Text style={styles.bigt}>{datap.product_name}</Text>
                  <Text style={styles.bigt}>Nutriscore: {datap.nutriscore_grade?.toUpperCase()}</Text>

                  <View style={styles.nutriscoreContainer}>
                    {nutriscore && (
                      <SvgFromUri uri={nutriscore} width={150} height={60} />
                    )}
                  </View>

                  <Text>Ingredients: {datap.ingredients_text}</Text>
                  <Text>Vitamins: {datap.vitamins_tags}</Text>
                  <Text>Quantity: {datap.quantity}</Text>
                </View>
              ) : (
                <Text>No product data available.</Text>
              )}

              {scanned && (
                <View style={styles.mb}>
                  <Button title="Tap to Scan Again" onPress={rescan} />
                </View>
              )}

              <Button title="More Details" onPress={() => router.push({ pathname: "/Product", params: { datap: JSON.stringify(datap) } })} />
            </View>
          </ScrollView>
        </RBSheet>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  camplace: { flex: 1, justifyContent: "center", alignItems: "center" },
  cam: { width: 300, height: 300, borderRadius: 10 },
  buttonContainer: { marginTop: 15, alignItems: 'center' },
  mb: { paddingVertical: 10 },
  bigt: { fontSize: 20, textAlign: "center", marginBottom: 10 },
  contentContainer: { flex: 1, padding: 16 },
  imageRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 10 },
  image: { width: 200, height: 200, marginHorizontal: 10 },
  nutriscoreContainer: { alignItems: "center", marginBottom: 10 },
});
