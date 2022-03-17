import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

const placeholdericon = require("../../assets/icon.png");

interface ResultCellProps {
  title: string;
  distance: number;
  category: string;
  minoritygroups: (string | null)[];
  primarycolor: string;
  onPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    width: 228,
    height: 296,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
  },
  titletext: {
    fontFamily: "Mada-SemiBold",
    fontSize: 22,
    maxWidth: 130,
    flexWrap: "wrap",
  },
  distancetext: {
    fontFamily: "Mada-Bold",
    fontSize: 17,
    color: "#FA4A0C",
    padding: 10,
  },
  horizview: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  littletext: {
    fontFamily: "Mada-SemiBold",
    fontSize: 12,
    opacity: 0.5,
    padding: 5,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 150,
    margin: 10,
  },
});

function ExploreResultCell(props: ResultCellProps) {
  const { title, distance, category, minoritygroups, primarycolor, onPress } =
    props;

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image
        style={[
          styles.image,
          { borderWidth: 2, borderColor: `${primarycolor}` },
        ]}
        source={placeholdericon}
      />
      <View style={styles.horizview}>
        <Text style={styles.titletext}>{title}</Text>
        <Text style={styles.distancetext}>{`${distance}mi`}</Text>
      </View>
      <Text style={styles.littletext}>{category}</Text>
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          flexWrap: "wrap",
          paddingBottom: 10,
        }}
      >
        {minoritygroups.map((minoritygroup, index) => (
          <Text
            key={minoritygroup + index.toString()}
            style={{ fontFamily: "Mada-SemiBold", fontSize: 12, opacity: 0.5 }}
          >
            {minoritygroup}
            {index !== minoritygroups.length - 1 ? " • " : ""}
          </Text>
        ))}
      </View>
    </Pressable>
  );
}

export default ExploreResultCell;
