/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import defaultUser from "../../constants/defaultData";
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/selectors/user";
import UserProfile from "../UserProfile/UserProfile";
import BusinessProfile from "./Business/BusinessProfile";
import dummyBusiness from "./Business/tempdata";

type ProfileStackParamList = {
  Base: undefined;
  User: undefined;
  Business: undefined;
};

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

type SelectorProps = {
  title: string;
  onPress: Function;
  img: string;
  details: string | undefined;
};
function Selector({ title, onPress, img, details }: SelectorProps) {
  return (
    <Pressable style={styles.selector} onPress={() => onPress()}>
      <Image style={styles.selectorImage} source={{ uri: img }} />
      <View style={{ flex: 7 }}>
        <Text style={styles.selectorText}>{title}</Text>
        {details && <Text style={styles.selectorDetails}>{details}</Text>}
      </View>
    </Pressable>
  );
}

function Margin() {
  return <View style={{ flex: 1 }} />;
}

type BaseProps = NativeStackScreenProps<ProfileStackParamList, "Base">;
function Base({ navigation }: BaseProps) {
  const user = useAppSelector(selectUser);

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: "row" }}>
      <Margin />
      <View style={{ flex: 10 }}>
        <Text style={styles.title}>Profile</Text>
        <Selector
          title="My Profile"
          img={user?.profilePic ?? defaultUser.profilePic}
          onPress={() => navigation.navigate("User")}
        />
        <Text style={styles.subtitle}>My Businesses</Text>
        <Selector
          title={dummyBusiness.name}
          img={dummyBusiness.profileImage}
          onPress={() => navigation.navigate("Business")}
          details={dummyBusiness.address.address}
        />
      </View>
      <Margin />
    </SafeAreaView>
  );
}

export default function ProfileSelector() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Base" component={Base} />
      <ProfileStack.Screen name="User" component={UserProfile} />
      <ProfileStack.Screen name="Business" component={BusinessProfile} />
    </ProfileStack.Navigator>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Mada-Bold",
    fontSize: 34,
    marginVertical: 30,
  },
  subtitle: {
    fontFamily: "Mada-Medium",
    color: "#FA4A0C",
    fontSize: 18,
    marginTop: 30,
    marginBottom: 15,
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 22,
    width: "100%",
    marginBottom: 10,
    padding: 15,
    shadowColor: "#393939",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 30 },
    shadowRadius: 30,
  },
  selectorImage: {
    borderRadius: 100,
    flex: 2,
    aspectRatio: 1,
    backgroundColor: "black",
  },
  selectorText: {
    fontFamily: "Mada-SemiBold",
    fontSize: 18,
    marginLeft: 20,
  },
  selectorDetails: {
    fontFamily: "Mada-Regular",
    color: "grey",
    fontSize: 14,
    marginLeft: 20,
    marginTop: 5,
  },
});
