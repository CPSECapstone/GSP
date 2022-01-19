import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import LargeOption from "./LargeOption";
import Header from "../components/Header";

const styles = StyleSheet.create({
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  description: {
    paddingLeft: 40,
    paddingTop: 100,
    fontSize: 20,
  },
});

function AccountType() {
  return (
    <View>
      <Header>Create an Account</Header>
      <Text style={styles.description}>I am a...</Text>
      <View style={styles.buttonWrapper}>
        <LargeOption text="Customer" Icon={<Feather name="user" size={75} />} />
        <LargeOption
          text="Minority Business Owner"
          Icon={<FontAwesome5 name="store" size={60} />}
        />
      </View>
    </View>
  );
}

export default AccountType;
