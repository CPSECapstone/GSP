import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";

const LoginButtonStyle = StyleSheet.create({
  LargeButton: {
    height: 70,
    width: 314,
    backgroundColor: "white",
    borderRadius: 50,
    alignSelf: "center",
  },
  text: {
    fontSize: 30,
    color: "#7300ff",
    alignSelf: "center",
    fontWeight: "bold",
    paddingTop: 15,
  },
});

interface InverseButtonProps {
  action: () => void;
  label: String;
}

function InverseLargeButton({ action, label }: InverseButtonProps) {
  return (
    <Pressable style={LoginButtonStyle.LargeButton} onPress={action}>
      <Text style={LoginButtonStyle.text}>{label}</Text>
    </Pressable>
  );
}

export default InverseLargeButton;
