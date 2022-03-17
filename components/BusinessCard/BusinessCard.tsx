import { Entypo, FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, Text } from "react-native";

interface BusinessCardProps {
  name: string;
  distance: string;
  rating: string;
}

const styles = StyleSheet.create({
  container: {
    width: 315,
    height: 100,
    padding: 10,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    marginVertical: 10,
  },
  subcontainer: {
    justifyContent: "center",
    flexDirection: "column",
    marginLeft: 15,
  },
  title: {
    fontSize: 17,
    fontFamily: "Mada-SemiBold",
  },
  distancetext: {
    fontSize: 18,
    fontFamily: "Mada-Medium",
    color: "#9A9A9D",
  },
  ratingtext: {
    color: "#FA4A0C",
    fontFamily: "Mada-SemiBold",
    fontSize: 18,
  },
});

function BusinessCard({ name, distance, rating }: BusinessCardProps) {
  return (
    <View style={styles.container}>
      <FontAwesome name="gg-circle" size={75} style={{ borderRadius: 75 }} />
      <View style={styles.subcontainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.distancetext}>{`${distance} mi`}</Text>
        <View style={{ flexDirection: "row" }}>
          <Entypo name="star" size={23} color="#FA4A0C" />
          <Text>{rating}</Text>
        </View>
      </View>
    </View>
  );
}

export default BusinessCard;
