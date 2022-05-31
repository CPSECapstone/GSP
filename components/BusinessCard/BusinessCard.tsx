import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { S3Image } from "../Misc/S3Util";
import { AverageRating } from "../Review/RatingView";

interface BusinessCardProps {
  id: string;
  name: string;
  distance: string;
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
    color: "#7300ff",
    fontFamily: "Mada-SemiBold",
    fontSize: 18,
  },
  avatar: {
    width: 80,
    aspectRatio: 1,
    borderRadius: 100,
    borderWidth: 2,
    alignSelf: "center",
    backgroundColor: "black",
  },
});

function BusinessCard({ id, name, distance }: BusinessCardProps) {
  return (
    <View style={styles.container}>
      <S3Image
        style={[styles.avatar, { borderColor: "red" }]}
        S3key={`${id}/profile`}
      />
      <View style={styles.subcontainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.distancetext}>{`${distance} mi`}</Text>
        <AverageRating businessId={id} color="#7300ff" short />
      </View>
    </View>
  );
}

export default BusinessCard;
