import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginVertical: 10,
    width: "80%",
    marginBottom: "4%",
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
    fontFamily: "Mada-SemiBold",
    fontSize: 18,
    textAlign: "left",
    padding: 10,
    paddingLeft: 15,
  },
});

interface CellProps {
  title: string;
  action: () => void;
}

function UserProfileCell({ title, action }: CellProps) {
  return (
    <Pressable
      onPress={() => {
        action();
      }}
    >
      <View style={[styles.container, styles.shadow]}>
        <Text style={styles.title}>{title}</Text>
        <Entypo name="chevron-right" size={24} />
      </View>
    </Pressable>
  );
}

export default UserProfileCell;
