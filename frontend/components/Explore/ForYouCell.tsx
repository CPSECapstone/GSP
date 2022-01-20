import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import * as React from "react";

const placeHolderImage = require("../../assets/icon.png");

interface ForYouParameters {
  name: string;
  businessId: string;
  distance: number;
}

const styles = StyleSheet.create({
  foryoucellcontainer: {
    width: 220,
    height: 270,
    borderRadius: 20,
    padding: 10,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    marginRight: 30,
  },
  businessimage: {
    height: 110,
    width: 175,
    borderRadius: 20,
    marginBottom: 15,
  },
  businesssubtitle: {
    fontSize: 22,
    fontFamily: "Mada-SemiBold",
    width: 125,
    textAlign: "center",
    marginBottom: 20,
  },
  distancetext: {
    color: "#FA4A0C",
    fontSize: 17,
    fontFamily: "Mada-Bold",
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
});

function ForYouCell(props: ForYouParameters) {
  const { name, businessId, distance } = props;

  return (
    <Pressable onPress={() => { console.log("navigate to business page for: '" + name + "' with ID: " + businessId)}}>
      <View style={[styles.foryoucellcontainer, styles.shadow]}>
        <Image style={styles.businessimage} source={placeHolderImage} />
        <Text style={styles.businesssubtitle}>{name}</Text>
        <Text style={styles.distancetext}>{`${distance.toString()}mi`}</Text>
      </View>
    </Pressable>
  );
}

export default ForYouCell;
