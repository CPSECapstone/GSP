import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { BizReviewPageProps } from "../../route-settings";
import BackButton from "../UserProfile/BackButton";
import ReviewCell, { Star, StarOutline } from "../Profile/ReviewCell";
import dummyBusiness from "../Profile/Business/tempdata";
import LargeButton from "../Misc/LargeButton";

const styles = StyleSheet.create({
  header: {
    fontFamily: "Mada-Black",
    fontSize: 24,
    paddingTop: 10,
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
  filterButton: {
    height: 30,
    width: 70,
    fontFamily: "Mada-Medium",
    backgroundColor: "#D7D7D7",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#D7D7D7",
    marginLeft: 30,
    marginTop: 5,
  },
  unselectedFilter: {
    height: 30,
    width: 70,
    fontFamily: "Mada-Medium",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#D7D7D7",
    marginLeft: 30,
    marginTop: 5,
  },
  bizImage: {
    height: 100,
    width: 100,
    alignSelf: "center",
    paddingRight: 30,
  },
});

function BizReviewPage({ navigation }: BizReviewPageProps) {
  return (
    <View>
      <BackButton action={navigation.goBack} />
      <View
        style={{
          paddingBottom: 10,
          borderBottomColor: "#B1B1B3",
          borderBottomWidth: 2,
        }}
      >
        <View>
          <Image
            style={styles.bizImage}
            source={{ uri: dummyBusiness.profileImage }}
          />

          <Text style={styles.header}>{dummyBusiness.name}</Text>
          <Text style={styles.subtitle}>Restaurant • 3 miles</Text>
        </View>

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

      <Text style={{ color: "grey", paddingLeft: 30, paddingTop: 10 }}>
        {" "}
        Sort By
      </Text>

      <View style={{ flexDirection: "row" }}>
        <Pressable style={styles.filterButton}>
          <Text>Relevant</Text>
        </Pressable>

        <Pressable style={styles.unselectedFilter}>
          <Text>Recent</Text>
        </Pressable>

        <Pressable style={styles.unselectedFilter}>
          <Text>Lowest</Text>
        </Pressable>

        <Pressable style={styles.unselectedFilter}>
          <Text>Highest</Text>
        </Pressable>
      </View>

      <View style={{ alignSelf: "center", paddingBottom: 20, paddingTop: 20 }}>
        <ReviewCell
          restaurant="Tori L."
          rating={4.0}
          srcImage=""
          description="This is a review."
        />
      </View>

      <View style={{ alignSelf: "center", paddingBottom: 20, paddingTop: 20 }}>
        <ReviewCell
          restaurant="Marvis I."
          rating={5.0}
          srcImage=""
          description="This is a review."
        />
      </View>

      <View style={{ alignSelf: "center", paddingBottom: 20, paddingTop: 20 }}>
        <ReviewCell
          restaurant="Tessa S."
          rating={5.0}
          srcImage=""
          description="This is a review."
        />
      </View>

      <LargeButton
        action={() => console.log("Write a Review")}
        label="Write a Review"
      />
    </View>
  );
}

export default BizReviewPage;