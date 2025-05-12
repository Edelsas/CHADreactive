import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NutriScore = ({ grade, mapping }) => {return(
  <View style={styles.nutriContainer}>
    {mapping.map(({ grade: g, color }) => (
      <View
        key={g}
        style={[
          styles.barSegment,
          { backgroundColor: color },
          g === grade ? styles.highlighted : {},
        ]}
      >
        <Text style={styles.text}>{g.toUpperCase()}</Text>
      </View>
    ))}
  </View>
);}

const styles = StyleSheet.create({
  nutriContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  barSegment: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 30,
  },
  highlighted: {
    borderWidth: 2,
    borderColor: "#000",
  },
  text: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default NutriScore;
