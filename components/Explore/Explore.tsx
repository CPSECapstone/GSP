import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  Animated,
  Dimensions,
  Image,
} from "react-native";
import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { categories, minoritygroups } from "../../constants/exploredata";
import ExploreResultCell from "./ExploreResultCell";
import { useAppSelector } from "../../redux/hooks";
import selectAllBusinesses from "../../redux/selectors/business";
import { Business } from "../../src/API";

const width = Dimensions.get("screen").width * 0.16;
const height = Dimensions.get("screen").height * 0.096;
const imgdimensions = width - 29;

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
  minoritycellcontainer: {
    borderRadius: 15,
    marginHorizontal: 10,
    marginTop: 25,
    minHeight: height,
    minWidth: width + 10,
    maxWidth: width + 10,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  minoritycellimage: {
    width: imgdimensions,
    height: imgdimensions,
    borderRadius: imgdimensions,
    marginTop: 15,
  },
  minoritycelltitle: {
    fontFamily: "Mada-Medium",
    fontSize: 12,
    textAlign: "center",
    padding: 10,
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
  const allBusinesses = useAppSelector(selectAllBusinesses);

  const [selectedCategoryIndex, setselectedCategoryIndex] = useState(0);
  const [selectedMinorityGroups, setselectedMinorityGroups] = useState([0]);
  const [resultBusinesses, setResultBusinesses] = useState(allBusinesses);

  let minorityGroupsByName: string[] = [];

  const moreonpress = () => {};

  React.useEffect(() => {
    minorityGroupsByName = [];
    selectedMinorityGroups.forEach((index) => {
      minorityGroupsByName.push(minoritygroups[index].title);
    });
    console.log(minorityGroupsByName);
  }, [selectedMinorityGroups]);

  React.useEffect(() => {
    const resBusiness: Business[] = [];
    allBusinesses.forEach((business) => {
      business?.tags?.forEach((tag) => {
        if (
          tag != null &&
          (minorityGroupsByName.includes(tag) ||
            minorityGroupsByName.includes("All"))
        ) {
          if (business.type === categories[selectedCategoryIndex]) {
            resBusiness.push(business);
          }
        }
      });
    });
    setResultBusinesses(resBusiness);
  }, [selectedCategoryIndex, selectedMinorityGroups]);

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
        data={resultBusinesses}
        renderItem={({ item }) => {
          if (
            item?.name !== undefined &&
            item.type !== undefined &&
            item.type !== null
          ) {
            return (
              <ExploreResultCell
                title={item.name}
                distance={3}
                category={item.type}
                minoritygroup="LatinX"
              />
            );
          }
          return <Text>idk</Text>;
        }}
        keyExtractor={(item, index) => index.toString()}
      />
      <Text style={styles.title2}>Minority Groups</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={minoritygroups}
        contentContainerStyle={{ paddingLeft: 20, height: 125 }}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => {
              if (index === 0 && !selectedMinorityGroups.includes(index)) {
                setselectedMinorityGroups([0]);
              } else if (selectedMinorityGroups.includes(index)) {
                setselectedMinorityGroups(
                  selectedMinorityGroups.filter(
                    (listitem) => listitem !== index
                  )
                );
              } else {
                setselectedMinorityGroups([...selectedMinorityGroups, index]);
              }
            }}
          >
            <View
              style={[
                styles.minoritycellcontainer,
                { borderWidth: 2, borderColor: "#FFFFFF" },
                selectedMinorityGroups.includes(index) && {
                  borderColor: "#FA4A0C",
                },
              ]}
            >
              <Image style={styles.minoritycellimage} source={item.img} />
              <Text style={styles.minoritycelltitle}>{item.title}</Text>
            </View>
          </Pressable>
        )}
        keyExtractor={(item, index) => item.title + index.toString()}
      />
    </View>
  );
}

export default Explore;
