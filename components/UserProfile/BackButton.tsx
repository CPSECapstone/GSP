import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";

const styles = StyleSheet.create({
  back: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: "7%",
  },
  backText: {
    fontFamily: "Mada-SemiBold",
    fontSize: 18,
    textAlign: "left",
    padding: 10,
    paddingLeft: "1%",
  },
});

interface BackButtonProps {
  action: () => void;
}

export default function BackButton({ action }: BackButtonProps) {
  return (
    <Pressable
      onPress={() => {
        action();
      }}
    >
      <View style={styles.back}>
        <Entypo name="chevron-left" size={24} />
        <Text style={styles.backText}>Back</Text>
      </View>
    </Pressable>
  );
}
