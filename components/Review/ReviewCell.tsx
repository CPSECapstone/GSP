import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import StarRating from "./StarRating";
import { EditButton } from "../Profile/Business/ProfileEditor";

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

export interface ReviewCellProps {
  restaurant: String;
  rating: number;
  srcImage?: string;
  description?: String | null | undefined;
  action?: Function;
}

function ReviewCell({
  restaurant,
  rating,
  srcImage,
  description,
  action,
}: ReviewCellProps) {
  return (
    <View style={styles.reviewCell}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {action && (
          <EditButton position={{ bottom: 0, right: -7 }} onPress={action} />
        )}
        <Text style={styles.restauraunt}>{restaurant}</Text>

        {srcImage && <Image style={styles.image} source={{ uri: srcImage }} />}
      </View>
      <StarRating rating={rating} label={`${Math.round(rating)} Stars`} />
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

ReviewCell.defaultProps = {
  srcImage: undefined,
  description: undefined,
  action: undefined,
};

export default ReviewCell;
