/* eslint-disable @typescript-eslint/no-use-before-define */
import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native-elements";
import RatingView from "./RatingView";
import { ReviewType, UserType } from "../../src/APITypes";

export const styles = StyleSheet.create({
  reviewCell: {
    zIndex: 10,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    minWidth: 300,
  },
  title: {
    fontWeight: "bold",
    fontFamily: "Mada-Bold",
    paddingRight: 10,
  },
  description: {
    paddingTop: 10,
    fontFamily: "Mada-Medium",
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  editButton: {
    width: 30,
    position: "absolute",
    aspectRatio: 1,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9D9D9",
    top: -12,
    right: -12,
  },
  firstRowWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
});

export interface ReviewCellProps {
  user: UserType;
  title: string;
  review: ReviewType;
  clientId: string;
  srcImage?: string;
  action: () => void;
}

function ReviewCell({
  user,
  title,
  review,
  clientId,
  srcImage,
  action,
}: ReviewCellProps) {
  const isOwnReview = clientId === review.userID;
  return (
    <View style={styles.reviewCell}>
      <View
        style={{
          ...styles.firstRowWrapper,
          ...(!srcImage && { justifyContent: "space-between" }),
        }}
      >
        {srcImage && <Image style={styles.image} source={{ uri: srcImage }} />}
        <Text style={styles.title}>{title}</Text>
        {!srcImage && (
          <RatingView rating={review.rating!} userName={user.name!} />
        )}
      </View>
      {srcImage && <RatingView rating={review.rating!} userName={user.name!} />}
      <Text style={styles.description}>{review.comments}</Text>
      {isOwnReview && action && <EditButton onPress={action} />}
    </View>
  );
}

ReviewCell.defaultProps = {
  srcImage: undefined,
};

type EditButtonProps = { onPress: Function };
function EditButton({ onPress }: EditButtonProps) {
  return (
    <Pressable style={styles.editButton} onPress={() => onPress()}>
      <Ionicons name="pencil" size={18} color="black" />
    </Pressable>
  );
}

export default ReviewCell;
