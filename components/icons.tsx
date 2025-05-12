import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Import from react

const IconBar = ({name, fonts, colors}) => {return(
  <View style={styles.iconBar}>
    <Icon name={name} size={fonts} color={colors} />
  </View>
);}

styles = StyleSheet.create({
    iconBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems:"center",
  },
    });

export default IconBar;