import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { getDistanceToBusiness } from "../../constants/location";
import { Business } from "../../src/API";
import { getProfileImage } from "../Misc/S3Util";
import { AverageRating } from "../Review/RatingView";

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

function BusinessCard({ business }: { business: Business }) {
  const [distance, setDistance] = React.useState("");
  React.useEffect(() => {
    getDistanceToBusiness(business).then(setDistance);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={[styles.avatar, { borderColor: "red" }]}
        source={getProfileImage(business)}
      />
      <View style={styles.subcontainer}>
        <Text style={styles.title}>{business.name}</Text>
        <Text style={styles.distancetext}>{`${distance} mi`}</Text>
        <AverageRating businessId={business.id} color="#7300ff" short />
      </View>
    </View>
  );
}

export default BusinessCard;
