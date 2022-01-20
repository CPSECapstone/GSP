/* eslint-disable @typescript-eslint/no-use-before-define */
import React from "react";
import { Pressable, Image, View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ProfileProps } from "../route-settings";

export default function ProfilePage({ route, navigation }: ProfileProps) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.header}>
        <Pressable style={styles.button}>
          <Ionicons name="chevron-back-outline" size={30} color="black" />
        </Pressable>
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
          }}
          style={{ width: 200, height: 200 }}
        />
      </View>
      <View style={{ flex: 12, backgroundColor: "darkorange" }}>
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
          }}
          style={{ width: 200, height: 200 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "red",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "yellow",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    margin: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
