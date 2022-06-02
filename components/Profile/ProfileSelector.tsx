/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ImageSourcePropType,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import defaultUser from "../../constants/defaultData";
import { selectUser } from "../../redux/selectors/user";
import UserProfile from "./User/UserProfile";
import BusinessProfile from "./Business/BusinessProfile";
import BusinessEditor from "./Business/BusinessEditor";
import { Business } from "../../src/API";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectBusinessesByUser } from "../../redux/selectors/business";
import { getProfileImage, S3Image } from "../Misc/S3Util";
import BusinessAPI from "./Business/BusinessAPI";
import { addBusiness } from "../../redux/slices/business";
import gStyles from "../../global-styles";

const plusImage = require("../../assets/plus.png");

export type ProfileStackParamList = {
  Base: undefined;
  User: undefined;
  Business: { id: string };
  CreateBusiness: undefined;
};

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileSelector() {
  return (
    <ProfileStack.Navigator
      initialRouteName="Base"
      screenOptions={{ headerShown: false }}
    >
      <ProfileStack.Screen name="Base" component={Base} />
      <ProfileStack.Screen name="User" component={UserProfile} />
      <ProfileStack.Screen name="Business" component={BusinessScreen} />
      <ProfileStack.Screen
        name="CreateBusiness"
        component={BusinessCreationScreen}
      />
    </ProfileStack.Navigator>
  );
}

type BusinessScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  "Business"
>;
function BusinessScreen({ route }: BusinessScreenProps) {
  return <BusinessProfile businessID={route.params.id} />;
}

type BusinessCreationScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  "CreateBusiness"
>;
function BusinessCreationScreen({ navigation }: BusinessCreationScreenProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser)!;

  const submit = (fields: Partial<Business>, pImg?: string, bImg?: string) => {
    const fieldsWithUser = { ...fields, email: user.email, userID: user.id };
    BusinessAPI.create(fieldsWithUser, pImg, bImg)
      .then((response) => {
        console.log(response);
        dispatch(addBusiness(response.data.createBusiness));
        navigation.navigate("Base");
      })
      .catch((err) => console.log(err));
  };

  return <BusinessEditor submit={submit} />;
}

type SelectorProps = {
  title: string;
  onPress: Function;
  source: ImageSourcePropType;
  details?: string;
  S3Key?: string;
};

function Selector({ title, onPress, source, details, S3Key }: SelectorProps) {
  return (
    <Pressable style={styles.selector} onPress={() => onPress()}>
      {S3Key ? (
        <S3Image style={styles.selectorImage} S3key={S3Key} />
      ) : (
        <Image style={styles.selectorImage} source={source} />
      )}

      <View style={{ flex: 7 }}>
        <Text style={styles.selectorText}>{title}</Text>
        {details && <Text style={styles.selectorDetails}>{details}</Text>}
      </View>
    </Pressable>
  );
}

type BusinessSelectorProps = { business: Business; onPress: () => void };
function BusinessSelector({ business, onPress }: BusinessSelectorProps) {
  return (
    <Pressable style={styles.selector} onPress={() => onPress()}>
      <Image style={styles.selectorImage} source={getProfileImage(business)} />
      <View style={{ flex: 7 }}>
        <Text style={styles.selectorText}>{business.name}</Text>
        <Text style={styles.selectorDetails}>{business.address}</Text>
      </View>
    </Pressable>
  );
}

Selector.defaultProps = { details: undefined, S3Key: undefined };

function Margin() {
  return <View style={{ flex: 1 }} />;
}

type BaseProps = NativeStackScreenProps<ProfileStackParamList, "Base">;
function Base({ navigation }: BaseProps) {
  const user = useAppSelector(selectUser);
  const businesses = user
    ? useAppSelector(selectBusinessesByUser(user.id))
    : [];

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: "row" }}>
      <Margin />
      <View style={{ flex: 10 }}>
        <Text style={gStyles.title}>Profile</Text>
        <Selector
          title="My Profile"
          source={{ uri: user?.profilePic ?? defaultUser.profilePic }}
          onPress={() => navigation.navigate("User")}
          S3Key={
            user?.profilePic === "https://aws.amazon.com/s3/"
              ? `${user.id}/user`
              : undefined
          }
        />
        <Text style={styles.subtitle}>My Businesses</Text>
        {user &&
          businesses
            .filter((b) => b?.userID === user.id)
            .map((b) => (
              <BusinessSelector
                key={b!.id}
                business={b!}
                onPress={() => navigation.navigate("Business", { id: b!.id })}
              />
            ))}
        <Selector
          title="Create New Business"
          source={plusImage}
          onPress={() => navigation.navigate("CreateBusiness")}
        />
      </View>
      <Margin />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontFamily: "Mada-Medium",
    color: "#7300ff",
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
