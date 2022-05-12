import { Entypo } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CollectionCellPropTypes {
  color: string;
  title: string;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginVertical: 10,
  },
  title: {
    margin: 10,
    fontFamily: "Mada-Medium",
    fontSize: 18,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4.65,
    elevation: 5,
  },
  arrow: {
    position: "absolute",
    right: 10,
  },
});

export default function CollectionCell(props: CollectionCellPropTypes) {
  const { color, title } = props;

  return (
    <View style={[styles.container, styles.shadow]}>
      <Entypo color={color} name="location-pin" size={35} />
      <Text style={styles.title}>{title}</Text>
      <Entypo style={styles.arrow} name="chevron-right" size={24} />
    </View>
  );
}

export function CreateNewCollectionCell() {
  return (
    <View
      style={[styles.container, styles.shadow, { backgroundColor: "#e6ccff" }]}
    >
      <Entypo color="black" name="circle-with-plus" size={35} />
      <Text style={styles.title}>Create New</Text>
    </View>
  );
}
