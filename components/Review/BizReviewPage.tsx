import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { BizReviewPageProps } from "../../route-settings";
import BackButton from "../UserProfile/BackButton";
import ReviewCell, { Star, StarOutline } from "../Profile/ReviewCell";
import { profileData } from "../Profile/Business/BusinessProfile";
import LargeButton from "../Misc/LargeButton";
const styles = StyleSheet.create({
  header: {
    fontFamily: "Mada-Black",
    fontSize: 24,
    paddingTop: 30,
    alignSelf: "center",
    paddingBottom: 10,
  },
  subtitle: {
    fontFamily: "Mada-Black",
    fontSize: 18,
    alignSelf: "center",
    paddingBottom: 10,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginLeft: 10,
    flexDirection: "row",
  },
});

function BizReviewPage({ navigation }: BizReviewPageProps) {
  return (
    <View>
      <BackButton action={navigation.goBack}></BackButton>
      <View
        style={{
          paddingBottom: 10,
          borderBottomColor: "#B1B1B3",
          borderBottomWidth: 2,
        }}
      >
        <Text style={styles.header}>Milk In It</Text>
        <Text style={styles.subtitle}>Restaurant • 3 miles</Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
            paddingLeft: 30,
          }}
        >
          <Star />
          <Star />
          <Star />
          <Star />
          <StarOutline />

          <Text style={{ fontWeight: "bold", fontSize: 13, color: "grey" }}>
            {" "}
            • 50 Reviews
          </Text>
        </View>
      </View>

      <Text> Sort By</Text>
      <View style={{ padding: 30 }}>
        <ReviewCell
          restaurant={"Milk In It"}
          rating={4.0}
          srcImage={""}
          description={"This is my review"}
        ></ReviewCell>
      </View>

      <LargeButton
        action={function (): void {
          throw new Error("Function not implemented.");
        }}
        label={"Write a Review"}
      ></LargeButton>
    </View>
  );
}

export default BizReviewPage;
