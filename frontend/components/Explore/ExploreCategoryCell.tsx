import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    height: 60,
    width: 200,
    marginRight: 25,
    marginBottom: 25,
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
    padding: 10,
    paddingLeft: 25,
  },
});

interface CategoryCellProps {
  title: string;
}

function ExploreCategoryCell(props: CategoryCellProps) {
  const { title } = props;

  return (
    <Pressable onPress={() => {console.log(title)}}>
      <View style={[styles.container, styles.shadow]}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
}

export default ExploreCategoryCell;
