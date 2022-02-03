import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  Animated,
} from "react-native";
import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { businesses, categories } from "../../constants/exploredata";
import ExploreResultCell from "./ExploreResultCell";

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    marginLeft: 50,
    marginBottom: 25,
    fontFamily: "Mada-Bold",
  },
  title2: {
    marginLeft: 50,
    fontFamily: "Mada-Medium",
    color: "#FA4A0C",
    fontSize: 18,
  },
  categorycontainer: {
    width: 68,
    borderRadius: 15,
    marginHorizontal: 10,
    marginTop: 25,
    borderWidth: 2,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    marginBottom: 15,
    borderColor: "#FFFFFF",
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
  categoryicon: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 13,
  },
  categorysubtitle: {
    fontSize: 11,
    fontFamily: "Mada-Medium",
    paddingBottom: 10,
    textAlign: "center",
  },
});

const categoryicons = [
  <Ionicons
    style={styles.categoryicon}
    name="restaurant"
    color="#8F8F8F"
    size={30}
  />,
  <Feather
    style={styles.categoryicon}
    name="shopping-bag"
    color="#45A54F"
    size={30}
  />,
  <Entypo style={styles.categoryicon} name="shop" color="#3CA1DA" size={30} />,
  <MaterialCommunityIcons
    style={styles.categoryicon}
    name="lipstick"
    color="#FB6BE4"
    size={30}
  />,
  <AntDesign
    style={styles.categoryicon}
    name="ellipsis1"
    color="black"
    size={30}
  />,
];

function Explore() {
  const [selectedCategoryIndex, setselectedCategoryIndex] = useState(0);

  const moreonpress = () => {};

  return (
    <View>
      <Text style={styles.title}>Explore</Text>
      <Text style={styles.title2}>Categories</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        contentContainerStyle={{ paddingLeft: 20 }}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={
              index === 4
                ? () => moreonpress()
                : () => setselectedCategoryIndex(index)
            }
          >
            <Animated.View
              style={[
                styles.categorycontainer,
                styles.shadow,
                selectedCategoryIndex === index && { borderColor: "#FA4A0C" },
              ]}
            >
              {categoryicons[index]}
              <Text style={styles.categorysubtitle}>{item}</Text>
            </Animated.View>
          </Pressable>
        )}
        keyExtractor={(item, index) => item + index.toString()}
      />
      <FlatList
        horizontal
        style={{ marginVertical: 20 }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 25 }}
        data={businesses}
        renderItem={({ item }) => (
          <ExploreResultCell
            title={item.title}
            distance={item.distance}
            category={item.category}
            minoritygroup={item.minoritygroup}
          />
        )}
        keyExtractor={(item, index) => item.title + index.toString()}
      />
      <Text style={styles.title2}>Minority Groups</Text>
    </View>
  );
}

export default Explore;
