/* eslint-disable prettier/prettier */

import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  BottomTabNavigationOptions,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

// https://reactnavigation.org/docs/typescript/
// Maps route names to params of a route
// https://reactnavigation.org/docs/params

export type RootStackParamList = {
  Login: undefined;
  ChooseAccountType: undefined;
  CreateAccount: { isMBO: boolean };
  CreateAccountCode: { email: string; isMBO: boolean };
  CreateBusinessProfile: undefined;
  App: undefined;
  ForgotPass: undefined;
  ForgotPass2: { email: string };
  ViewCollection: undefined;
  OpenCollection: { name: string; description: string };
  ProfileEditor: undefined;
  ReviewPage: undefined;
  UserProfile: undefined;
  BizReviewPage: { busID: string };
  Notifications: undefined;
};

export type LoginProps = NativeStackScreenProps<RootStackParamList, "Login">;
export type AppProps = NativeStackScreenProps<RootStackParamList, "App">;
export type ForgotPassProps = NativeStackScreenProps<
  RootStackParamList,
  "ForgotPass"
>;
export type ForgotPass2Props = NativeStackScreenProps<
  RootStackParamList,
  "ForgotPass2"
>;

export type CollectionProps = NativeStackScreenProps<
  RootStackParamList,
  "ViewCollection"
>;

export type OpenCollectionPageProps = NativeStackScreenProps<
  RootStackParamList,
  "OpenCollection"
>;
export type ProfileEditorProps = NativeStackScreenProps<
  RootStackParamList,
  "ProfileEditor"
>;
export type NotificationsProps = NativeStackScreenProps<
  RootStackParamList,
  "Notifications"
>;

export type RootTabBarParamList = {
  Home: undefined;
  Explore: undefined;
  Collections: undefined;
  Profile: undefined;
  Business: undefined;
  Feed: { sort: "latest" | "top" } | undefined;
};

export type HomeProps = BottomTabScreenProps<RootTabBarParamList, "Home">;
export type ExploreProps = BottomTabScreenProps<RootTabBarParamList, "Explore">;
export type CollectionsProps = BottomTabScreenProps<
  RootTabBarParamList,
  "Collections"
>;
export type ProfileProps = BottomTabScreenProps<RootTabBarParamList, "Profile">;
export type BusinessProps = BottomTabScreenProps<
  RootTabBarParamList,
  "Business"
>;
export type UserProfileProps = NativeStackScreenProps<
  RootStackParamList,
  "UserProfile"
>;

export type ReviewPageProps = NativeStackScreenProps<
  RootStackParamList,
  "ReviewPage"
>;

export type BizReviewPageProps = NativeStackScreenProps<
  RootStackParamList,
  "BizReviewPage"
>;

export const TabBarScreenOptions = ({
  route,
}: any): Partial<BottomTabNavigationOptions> => ({
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: { height: 100, backgroundColor: "F5F5F8", borderTopWidth: 0 },
  tabBarIcon: ({ focused, size }: { focused: any; size: any }) => {
    let iconName: any;

    if (route.name === "Home") {
      iconName = "ios-home";
    } else if (route.name === "Explore") {
      iconName = "ios-compass";
    } else if (route.name === "Collections") {
      iconName = "ios-bookmark";
    } else if (route.name === "Profile") {
      iconName = "ios-person";
    }

    if (!focused) {
      iconName += "-outline";
      return <Ionicons name={iconName} size={size} color="#ADADAF" />;
    }
    return (
      <Ionicons
        style={{
          shadowColor: "#7300ff",
          shadowOpacity: 0.6,
          shadowRadius: 14,
          shadowOffset: { width: 0, height: 6 },
        }}
        name={iconName}
        size={size}
        color="#7300ff"
      />
    );
  },
  tabBarActiveTintColor: "tomato",
  tabBarInactiveTintColor: "tomato",
});
