import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import LargeOption from "./LargeOption";
import { RootStackParamList } from "../../route-settings";

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

type AccountTypeProps = NativeStackScreenProps<
  RootStackParamList,
  "ChooseAccountType"
>;

function AccountType({ navigation }: AccountTypeProps) {
  return (
    <View>
      <Text style={styles.description}>I am a...</Text>
      <View style={styles.buttonWrapper}>
        <Pressable
          onPress={() => navigation.navigate("CreateAccount", { isMBO: false })}
        >
          <LargeOption
            text="Customer"
            Icon={<Feather name="user" size={75} />}
          />
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("CreateAccount", { isMBO: true })}
        >
          <LargeOption
            text="Minority Business Owner"
            Icon={<FontAwesome5 name="store" size={60} />}
          />
        </Pressable>
      </View>
    </View>
  );
}

export default AccountType;
