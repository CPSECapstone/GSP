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

interface ReviewCellProps {
  restaurant: String;
  rating: Number;
  srcImage: string;
  description: String;
}

// react native vector icons. Carter has stars on the profile page.

// maybe hardcode height in case you want to press 'more'

/**
  * <ReviewCell restaurant={"Taqueria Santa Cruz"}
        description={"One of my favorite restaurants in San Luis Obispo. They are always consistent with their food. While it is not the most amazing value out there, they never fail to deliver and have an amazing family atmosphere."}
        srcImage={"myTestImage.png"}
        rating={2.0}
        
        ></ReviewCell> 
  * 
  */

function ReviewCell({
  restaurant,
  rating,
  srcImage,
  description,
}: ReviewCellProps) {
  // can't call require with srcImage string here
  // how do I make this dang image inline with Text?
  return (
    <View style={styles.reviewCell}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <EditButton position={{ bottom: 0, right: -7 }} onPress={() => {}} />
        <Text style={styles.restauraunt}>{restaurant}</Text>
        <Image style={styles.image} source={{ uri: srcImage }} />
      </View>

      {rating === 1 && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Star />
          <StarOutline />
          <StarOutline />
          <StarOutline />
          <StarOutline />

          <Text style={{ fontWeight: "bold", fontSize: 13, color: "grey" }}>
            {" "}
            • {rating} Stars
          </Text>
        </View>
      )}
      {rating === 2 && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Star />
          <Star />
          <StarOutline />
          <StarOutline />
          <StarOutline />

          <Text style={{ fontWeight: "bold", fontSize: 13, color: "grey" }}>
            {" "}
            • {rating} Stars
          </Text>
        </View>
      )}
      {rating === 3 && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Star />
          <Star />
          <Star />
          <StarOutline />
          <StarOutline />

          <Text style={{ fontWeight: "bold", fontSize: 13, color: "grey" }}>
            {" "}
            • {rating} Stars
          </Text>
        </View>
      )}
      {rating === 4 && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Star />
          <Star />
          <Star />
          <Star />
          <StarOutline />

          <Text style={{ fontWeight: "bold", fontSize: 13, color: "grey" }}>
            {" "}
            • {rating} Stars
          </Text>
        </View>
      )}
      {rating === 5 && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />

          <Text style={{ fontWeight: "bold", fontSize: 13, color: "grey" }}>
            {" "}
            • {rating} Stars
          </Text>
        </View>
      )}
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

export default ReviewCell;
