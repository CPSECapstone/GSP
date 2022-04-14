import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";

const LoginButtonStyle = StyleSheet.create({
  LargeButton: {
    height: 70,
    width: 314,
    backgroundColor: "#7300ff",
    borderRadius: 50,
    alignSelf: "center",
  },
  text: {
    fontSize: 30,
    color: "white",
    alignSelf: "center",
    fontWeight: "bold",
    paddingTop: 15,
  },
});

interface LargeButtonProps {
  action: () => void;
  label: String;
}

function LargeButton({ action, label }: LargeButtonProps) {
  return (
    <Pressable style={LoginButtonStyle.LargeButton} onPress={action}>
      <Text style={LoginButtonStyle.text}>{label}</Text>
    </Pressable>
  );
}

export default LargeButton;
