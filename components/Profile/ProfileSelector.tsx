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
import { Business } from "../../src/API";
import { useAppSelector } from "../../redux/hooks";
import { selectAllBusinesses } from "../../redux/selectors/business";
import { S3Image } from "../Misc/S3Util";

const plusImage = require("../../assets/plus.png");

const BusinessContext = React.createContext<Business[]>([]);

export type ProfileStackParamList = {
  Base: undefined;
  User: undefined;
  Business: { reduxIndex: number };
};

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileSelector() {
  return (
    <BusinessContext.Provider value={useAppSelector(selectAllBusinesses)}>
      <ProfileStack.Navigator
        initialRouteName="Base"
        screenOptions={{ headerShown: false }}
      >
        <ProfileStack.Screen name="Base" component={Base} />
        <ProfileStack.Screen name="User" component={UserProfile} />
        <ProfileStack.Screen name="Business" component={BusinessScreen} />
      </ProfileStack.Navigator>
    </BusinessContext.Provider>
  );
}

type BusinessScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  "Business"
>;
function BusinessScreen({ route }: BusinessScreenProps) {
  const index = route.params.reduxIndex;
  const business = React.useContext(BusinessContext)[index];
  return <BusinessProfile business={business} />;
}

type SelectorProps = {
  title: string;
  onPress: Function;
  source: ImageSourcePropType;
  details?: string;
};

function Selector({ title, onPress, source, details }: SelectorProps) {
  return (
    <Pressable style={styles.selector} onPress={() => onPress()}>
      <Image style={styles.selectorImage} source={source} />
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
      <S3Image style={styles.selectorImage} S3key={`${business.id}/profile`} />
      <View style={{ flex: 7 }}>
        <Text style={styles.selectorText}>{business.name}</Text>
        <Text style={styles.selectorDetails}>{business.address}</Text>
      </View>
    </Pressable>
  );
}

Selector.defaultProps = { details: undefined };

function Margin() {
  return <View style={{ flex: 1 }} />;
}

type BaseProps = NativeStackScreenProps<ProfileStackParamList, "Base">;
function Base({ navigation }: BaseProps) {
  const businesses = React.useContext(BusinessContext);
  const user = useAppSelector(selectUser);

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: "row" }}>
      <Margin />
      <View style={{ flex: 10 }}>
        <Text style={styles.title}>Profile</Text>
        <Selector
          title="My Profile"
          source={{ uri: user?.profilePic ?? defaultUser.profilePic }}
          onPress={() => navigation.navigate("User")}
        />
        <Text style={styles.subtitle}>My Businesses</Text>
        {businesses
          .filter((b) => b.userID === user!.id)
          .map((b, i) => (
            <BusinessSelector
              key={b!.id}
              business={b!}
              onPress={() => navigation.navigate("Business", { reduxIndex: i })}
            />
          ))}
        <Selector
          title="Create New Business"
          source={plusImage}
          onPress={() => navigation.navigate("User")}
        />
      </View>
      <Margin />
    </SafeAreaView>
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
    color: "#5300b9",
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
