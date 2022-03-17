/* eslint-disable @typescript-eslint/no-use-before-define */
import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Review, User } from "../../src/API";
import RatingView from "./RatingView";

export const styles = StyleSheet.create({
  reviewCell: {
    zIndex: 10,
    width: "100%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    paddingRight: 50,
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
  editButton: {
    width: 30,
    position: "absolute",
    aspectRatio: 1,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9D9D9",
  },
});

export interface ReviewCellProps {
  user: User;
  review: Review;
  clientId: string;
  action: () => void;
}

function ReviewCell({ user, review, clientId, action }: ReviewCellProps) {
  const isOwnReview = clientId === review.userID;
  return (
    <View style={styles.reviewCell}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {isOwnReview && (
          <EditButton position={{ bottom: -4, right: -40 }} onPress={action} />
        )}
        <Text style={styles.restauraunt}>{user.name}</Text>

        {/* <Image style={styles.image} source={{ uri: srcImage }} /> */}
        <RatingView rating={review.rating!} userName={user.name!} />
      </View>
      <Text style={styles.description}>{review.comments}</Text>
    </View>
  );
}

type EditButtonProps = { position: Object; onPress: Function };
function EditButton({ position, onPress }: EditButtonProps) {
  return (
    <Pressable style={[styles.editButton, position]} onPress={() => onPress()}>
      <Ionicons name="pencil" size={18} color="black" />
    </Pressable>
  );
}

export default ReviewCell;
