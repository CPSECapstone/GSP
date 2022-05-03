/* eslint-disable react/no-array-index-key */
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

function Star() {
  return (
    <Ionicons
      name="star"
      style={{ marginRight: 2 }}
      size={22}
      color="#7300ff"
    />
  );
}

function StarOutline() {
  return (
    <Ionicons
      name="star-outline"
      style={{ marginRight: 5 }}
      size={22}
      color="#7300ff"
    />
  );
}

interface StarOutlineProps {
  rating: number;
  label?: string | undefined;
}

function StarRating({ rating, label }: StarOutlineProps) {
  const numStar = Math.round(rating);
  const numStarOutline = 5 - numStar;

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {[...Array(numStar)].map((junk, idx) => (
        <Star key={idx} />
      ))}
      {[...Array(numStarOutline)].map((junk, idx) => (
        <StarOutline key={idx} />
      ))}
      {label && (
        <Text style={{ fontWeight: "bold", fontSize: 13, color: "grey" }}>
          {" "}
          • {label}
        </Text>
      )}
    </View>
  );
}

StarRating.defaultProps = {
  label: undefined,
};

export default StarRating;
