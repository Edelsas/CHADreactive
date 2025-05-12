import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Import from react-native-vector-icons
import IconBar from "./icons";


const Bento = ({ navigation, title, bgcolor, whereto, icon,icolor, fsize, smalltxt, tfsize, smalltfsize }) => {
  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={() => navigation.navigate(whereto)} style={{
    display:"flex",
    flexDirection:"row",
    padding:18,
    backgroundColor:bgcolor,
    alignItems:"center",
    justifyContent:"center",
    borderWidth:1,
    borderColor:"#fff",
    borderRadius:10,
  }}>
      <View>
        <Text style={{fontSize:tfsize,color:"#fff",marginLeft:10,marginRight:20}}>{title}</Text>
        <Text style={{fontSize:smalltfsize,color:"#fff",marginLeft:10,marginRight:20}}>{smalltxt}</Text>
      </View>
        <IconBar name={icon} fonts={fsize} colors={icolor} />
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  scanbut:{
    display:"flex",
    flexDirection:"row",
    padding:10,
    backgroundColor:"#000000",
    alignItems:"center",
    justifyContent:"center",
    borderWidth:1,
    borderColor:"#fff",
    borderRadius:10,
  },
  iconBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems:"center",
  },
});

export default Bento;
