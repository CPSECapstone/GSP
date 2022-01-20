import React from "react";
import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";
import { ExploreProps } from "../../route-settings";
import ForYouCell from "./ForYouCell";

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
});

function Explore({ navigation }: ExploreProps) {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <Text style={styles.foryouheader}>For You</Text>
      <FlatList
        horizontal
        style={{
          width: "100%",
          paddingLeft: 50,
          overflow: "visible",
          height: "auto",
        }}
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
  );
}

export default Explore;
