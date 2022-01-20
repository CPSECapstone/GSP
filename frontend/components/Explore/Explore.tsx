import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  ScrollView,
} from "react-native";
import { ExploreProps } from "../../route-settings";
import ExploreCategoryCell from "./ExploreCategoryCell";
import ForYouCell from "./ForYouCell";

const placeholderData = [
  {
    name: "Taqueria Santa Cruz",
    businessId: "1",
    distance: 3,
  },
  {
    name: "Taqueria Santa Cruz",
    businessId: "2",
    distance: 3,
  },
  {
    name: "Taqueria Santa Cruz",
    businessId: "3",
    distance: 3,
  },
];

const categories = [
  {
    name: "Food",
    items: [
      "Mexican",
      "Cuban",
      "Japanese",
      "Chinese",
      "Indian",
      "Israeli",
      "Mediterranean",
    ],
  },
  { name: "Cosmetic", items: ["Hair", "Shave", "Nails", "Makeup"] },
  { name: "Business", items: [] },
  { name: "Service", items: [] },
];

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    marginLeft: 50,
    marginTop: 100,
    marginBottom: 25,
    fontFamily: "Mada-Bold",
  },
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
  },
  foryouheader: {
    marginLeft: 50,
    fontFamily: "Mada-Black",
    color: "#FA4A0C",
    fontSize: 18,
    marginBottom: 15,
  },
  categorieslist: {
    width: "100%",
    paddingLeft: 50,
    overflow: "visible",
    height: 0,
  },
  categorytitlecontainer: {
    width: 90,
    borderWidth: 3,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  categorytitletext: {
    fontSize: 17,
    fontFamily: "Mada-Regular",
  },
  scrollitemsflatlist: {
    width: "100%",
    paddingLeft: 50,
    overflow: "visible",
  },
});

function Explore({ navigation }: ExploreProps) {
  const [selectedCategoryIndex, setselectedCategoryIndex] = useState(0);

  const changeSelectedCategory = (index: number) => {
    setselectedCategoryIndex(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <Text style={styles.foryouheader}>For You</Text>
      <View style={{ height: 300 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollitemsflatlist}
          renderItem={({ item }) => (
            <ForYouCell
              name={item.name}
              businessId={item.businessId}
              distance={item.distance}
            />
          )}
          keyExtractor={(item) => item.businessId}
          data={placeholderData}
        />
      </View>

      <FlatList
        horizontal
        contentContainerStyle={{ justifyContent: "flex-start" }}
        style={styles.categorieslist}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          let color = "#9A9A9D";
          let viewcolor = "#C1C1C1";
          let borderwidth = 0;
          if (index === selectedCategoryIndex) {
            color = "#FA4A0C";
            viewcolor = "#FA4A0C";
            borderwidth = 3;
          }
          return (
            <Pressable onPress={() => changeSelectedCategory(index)}>
              <View
                style={[
                  styles.categorytitlecontainer,
                  {
                    borderBottomColor: viewcolor,
                    borderBottomWidth: borderwidth,
                  },
                ]}
              >
                <Text style={[styles.categorytitletext, { color }]}>
                  {item.name}
                </Text>
              </View>
            </Pressable>
          );
        }}
        keyExtractor={(item, index) => item + index.toString()}
        data={categories}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <FlatList
          key={selectedCategoryIndex}
          numColumns={Math.ceil(
            categories[selectedCategoryIndex].items.length / 2
          )}
          contentContainerStyle={{ alignSelf: "flex-start" }}
          style={styles.scrollitemsflatlist}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          renderItem={({ item }) => <ExploreCategoryCell title={item} />}
          keyExtractor={(item, index) => item + index.toString()}
          data={categories[selectedCategoryIndex].items}
        />
      </ScrollView>
    </View>
  );
}

export default Explore;
