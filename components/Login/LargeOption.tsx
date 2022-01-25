import React from "react";
import { Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  bigContainer: {
    backgroundColor: "white",
    height: 210,
    width: 150,
    borderRadius: 40,
    margin: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 22,
    fontWeight: "bold",
    paddingTop: 30,
    textAlign: "center",
  },
});

interface LargeOptionProps {
  text: string;
  Icon: React.ReactNode;
}

function LargeOption({ text, Icon }: LargeOptionProps) {
  return (
    <View style={styles.bigContainer}>
      {Icon}
      <Text style={styles.label}>{text}</Text>
    </View>
  );
}

export default LargeOption;
