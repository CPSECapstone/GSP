import React from "react";
import { StyleSheet, View, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
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
  title: {
    fontFamily: "Mada-Regular",
    fontSize: 18,
    textAlign: "left",
  },
});

interface CategoryCellProps {
  title: string;
  minoritygroup: string;
}

function ExploreCategoryCell(props: CategoryCellProps) {
  const { title, minoritygroup } = props;

  return (
    <View style={[styles.container, styles.shadow]}>
      <Text>{title}</Text>
    </View>
  );
}

export default ExploreCategoryCell;
