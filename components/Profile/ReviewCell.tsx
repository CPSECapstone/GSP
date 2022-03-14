/* eslint-disable react/no-array-index-key */
import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { EditButton } from "./Business/ProfileEditor";

export const styles = StyleSheet.create({
  reviewCell: {
    width: 300,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
  restauraunt: {
    fontWeight: "bold",
    fontFamily: "Mada-Bold",
  },
  description: {
    paddingTop: 10,
    fontFamily: "Mada-Medium",
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginLeft: 10,
  },
});

export function Star() {
  return (
    <Ionicons
      name="star"
      style={{ marginRight: 2 }}
      size={22}
      color="#DA5125"
    />
  );
}

export function StarOutline() {
  return (
    <Ionicons
      name="star-outline"
      style={{ marginRight: 5 }}
      size={22}
      color="#DA5125"
    />
  );
}

export interface ReviewCellProps {
  restaurant: String;
  rating: number;
  srcImage: string;
  description: String | null | undefined;
  action: Function;
}

function ReviewCell({
  restaurant,
  rating,
  srcImage,
  description,
  action,
}: ReviewCellProps) {
  const numStar = rating;
  const numStarOutline = 5 - rating;

  return (
    <View style={styles.reviewCell}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <EditButton position={{ bottom: 0, right: -7 }} onPress={action} />
        <Text style={styles.restauraunt}>{restaurant}</Text>

        <Image style={styles.image} source={{ uri: srcImage }} />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {[...Array(numStar)].map((junk, idx) => (
          <Star key={idx} />
        ))}
        {[...Array(numStarOutline)].map((junk, idx) => (
          <StarOutline key={idx} />
        ))}
        <Text style={{ fontWeight: "bold", fontSize: 13, color: "grey" }}>
          {" "}
          • {rating} Stars
        </Text>
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

export default ReviewCell;
