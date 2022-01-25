import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerText: {
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerWrapper: {
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 1,
  },
});

interface HeaderProps {
  children: string;
}

function Header({ children }: HeaderProps) {
  return (
    <View style={styles.headerWrapper}>
      <Text style={styles.headerText}>{children}</Text>
    </View>
  );
}

export default Header;
