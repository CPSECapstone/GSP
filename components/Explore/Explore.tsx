/* eslint-disable @typescript-eslint/no-use-before-define */
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
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { categories, minoritygroups } from "../../constants/exploredata";
import ExploreResultCell from "./ExploreResultCell";
import { useAppSelector } from "../../redux/hooks";
import { selectAllBusinesses } from "../../redux/selectors/business";
import { Business } from "../../src/API";
import {
  returnBusinessTypeValue,
  returnMinorityGroupValue,
} from "../../constants/enumconverters";
import WithBusinessView from "../Profile/Business/WithBusinessView";
import gStyles from "../../global-styles";

const width = Dimensions.get("screen").width * 0.16;
// const height = Dimensions.get("screen").height * 0.096;
const imgdimensions = width - 29;

const styles = StyleSheet.create({
  title2: {
    fontFamily: "Mada-Medium",
    color: "#7300ff",
    fontSize: 18,
  },
  categorycontainer: {
    width: 75,
    height: 100,
    borderRadius: 15,
    marginRight: 20,
    marginTop: 25,
    borderWidth: 2,
    backgroundColor: "#FFFFFF",
    marginBottom: 15,
    borderColor: "#FFFFFF",
    alignItems: "center",
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
    justifyContent: "center",
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
    marginRight: 20,
    marginTop: 25,
    width: 75,
    minHeight: 110,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    flex: 7,
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
];

export default function ExplorePage() {
  return <WithBusinessView Component={ExploreView} />;
}

type ExploreProps = NativeStackScreenProps<
  { BusinessView: { id: string }; Component: undefined },
  "Component"
>;
function ExploreView({ navigation }: ExploreProps) {
  const allBusinesses = useAppSelector(selectAllBusinesses);

  const [selectedCategoryIndex, setselectedCategoryIndex] = useState(0);
  const [selectedMinorityGroups, setselectedMinorityGroups] = useState([0]);
  const [resultBusinesses, setResultBusinesses] = useState(allBusinesses);

  let minorityGroupsByName: string[] = [];

  React.useEffect(() => {
    minorityGroupsByName = [];
    selectedMinorityGroups.forEach((index) => {
      minorityGroupsByName.push(minoritygroups[index].title);
    });
  }, [selectedMinorityGroups, selectedCategoryIndex]);

  React.useEffect(() => {
    const resBusiness: Business[] = [];
    allBusinesses.forEach((business) => {
      business?.tags?.every((tag) => {
        if (
          tag != null &&
          (minorityGroupsByName.includes(returnMinorityGroupValue(tag)!) ||
            minorityGroupsByName.includes("All"))
        ) {
          if (
            business.type != null &&
            returnBusinessTypeValue(business.type) ===
              categories[selectedCategoryIndex]
          ) {
            resBusiness.push(business);
            return false;
          }
        }
        return true;
      });
    });
    setResultBusinesses(resBusiness);
  }, [selectedCategoryIndex, selectedMinorityGroups]);

  return (
    <SafeAreaView style={gStyles.container}>
      <Text style={gStyles.title}>Explore</Text>
      <Text style={styles.title2}>Categories</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        style={{ width: "100%", overflow: "visible" }}
        renderItem={({ item, index }) => (
          <Pressable onPress={() => setselectedCategoryIndex(index)}>
            <Animated.View
              style={[
                styles.categorycontainer,
                styles.shadow,
                selectedCategoryIndex === index && { borderColor: "#7300ff" },
              ]}
            >
              {categoryicons[index]}
              <Text style={styles.categorysubtitle}>{item}</Text>
            </Animated.View>
          </Pressable>
        )}
        keyExtractor={(item, index) => item + index.toString()}
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 20,
          minHeight: 310,
        }}
      >
        {resultBusinesses.length === 0 ? (
          <Text
            style={{
              color: "#7300ff",
              fontFamily: "Mada-Regular",
              fontSize: 24,
              textAlign: "center",
            }}
          >
            No businesses returned from selected filters.
          </Text>
        ) : (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ width: "100%", overflow: "visible" }}
            contentContainerStyle={
              resultBusinesses.length === 1 && {
                width: "100%",
                justifyContent: "center",
              }
            }
            data={resultBusinesses}
            renderItem={({ item }) => {
              if (
                item?.name !== undefined &&
                item.tags !== null &&
                item.tags !== undefined
              ) {
                return (
                  <ExploreResultCell
                    onPress={() =>
                      navigation.navigate("BusinessView", { id: item.id })
                    }
                    businessID={item.id}
                  />
                );
              }
              return <Text>Something went wrong</Text>;
            }}
            keyExtractor={(item, index) => item?.id ?? index.toString()}
          />
        )}
      </View>
      <Text style={styles.title2}>Minority Groups</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ width: "100%", overflow: "visible" }}
        data={minoritygroups}
        contentContainerStyle={{ height: 125 }}
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
                  borderColor: "#7300ff",
                },
              ]}
            >
              <Image style={styles.minoritycellimage} source={item.img} />
              <View style={{ justifyContent: "center", height: 50 }}>
                <Text style={styles.minoritycelltitle}>{item.title}</Text>
              </View>
            </View>
          </Pressable>
        )}
        keyExtractor={(item, index) => item.title + index.toString()}
      />
    </SafeAreaView>
  );
}
