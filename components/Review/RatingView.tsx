/* eslint-disable @typescript-eslint/no-use-before-define */
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import { selectReviewsByBusiness } from "../../redux/selectors/review";

export function Star({ size, outline }: { size?: number; outline?: boolean }) {
  return (
    <Ionicons
      name={outline ? "star-outline" : "star"}
      style={{ marginRight: 2 }}
      size={size}
      color="#DA5125"
    />
  );
}

Star.defaultProps = {
  size: 22,
  outline: false,
};

function getStars(
  rating: number,
  key: string,
  size?: number,
  onSelect?: (count: number) => void
) {
  const stars = [];
  const onPress = onSelect || (() => {});

  for (let i = 0; i < rating; i += 1) {
    stars.push(
      <Pressable onPress={() => onPress(i + 1)}>
        <Star size={size} key={`${i} star + ${key}`} />
      </Pressable>
    );
  }
  for (let i = 0; i < 5 - rating; i += 1) {
    stars.push(
      <Pressable onPress={() => onPress(i + 1 + rating)}>
        <Star outline size={size} key={`${i} star-outline ${key}`} />
      </Pressable>
    );
  }
  return stars;
}

type RatingInputProps = { rating: number; submit: (count: number) => void };
export function RatingInput({ rating, submit }: RatingInputProps) {
  const stars = getStars(rating, "editor", 45, submit);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {stars}
    </View>
  );
}

type RatingViewProps = { rating: number; userName: string };
export default function RatingView({ rating, userName }: RatingViewProps) {
  const stars = getStars(rating, userName);
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>{stars}</View>
  );
}

function Bullet() {
  return <Text style={styles.bulletText}>•</Text>;
}

export function AverageRating({ businessId }: { businessId: string }) {
  const reviews = useAppSelector(selectReviewsByBusiness(businessId));
  if (!reviews || reviews.length < 1) {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>{getStars(0, "none")}</View>
        <Bullet />
        <Text style={styles.ratingText}>Unrated</Text>
        <Bullet />
        <Text style={styles.ratingText}>{`${0} Reviews`}</Text>
      </View>
    );
  }
  const ratings = reviews.map((r) => r.rating!);
  const average = Math.round(ratings.reduce((a, b) => a + b) / ratings.length);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>{getStars(average, "avg")}</View>
      <Bullet />
      <Text style={styles.ratingText}>{`${average} Stars`}</Text>
      <Bullet />
      <Text style={styles.ratingText}>{`${reviews.length} Reviews`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "grey",
  },
  bulletText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "grey",
  },
});
