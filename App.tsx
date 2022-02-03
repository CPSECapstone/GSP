import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { SafeAreaView } from "react-native-safe-area-context";
import AccountType from "./components/Login/AccountType";
import SignUp from "./components/Login/SignUp";
import ProfilePage from "./components/Profile";
import Explore from "./components/Explore/Explore";
import Collections from "./components/Collections/Collections";
import Login from "./components/Login";
import ForgotPass from "./components/ForgotPass";
import ForgotPass2 from "./components/ForgotPass2";
import OpenCollection from "./components/Collections/OpenCollection";
import {
  RootStackParamList,
  RootTabBarParamList,
  TabBarScreenOptions,
} from "./route-settings";

import Map from "./components/Map/Map";

const madaBalck = require("./assets/fonts/Mada/Mada-Black.ttf");
const madaRegular = require("./assets/fonts/Mada/Mada-Regular.ttf");
const madaSemiBold = require("./assets/fonts/Mada/Mada-SemiBold.ttf");
const madaBold = require("./assets/fonts/Mada/Mada-Bold.ttf");
const madaMedium = require("./assets/fonts/Mada/Mada-Medium.ttf");
const poppinsRegular = require("./assets/fonts/Poppins/Poppins-Regular.ttf");
const poppinsSemi = require("./assets/fonts/Poppins/Poppins-SemiBold.ttf");

const fonts = {
  "Mada-Black": madaBalck,
  "Mada-Regular": madaRegular,
  "Mada-SemiBold": madaSemiBold,
  "Mada-Bold": madaBold,
  "Mada-Medium": madaMedium,
  "Poppins-Regular": poppinsRegular,
  "Poppins-SemiBold": poppinsSemi,
};
// Stack navigates between login and app, Tab navigates between pages within app
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabBarParamList>();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

function HomePage() {
  return (
    <View style={styles.container}>
      <Map />
    </View>
  );
}

function AuthenticatedApp() {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={TabBarScreenOptions}>
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Collections" component={Collections} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded, setfontsLoaded] = React.useState(false);

  async function loadFontsAsync() {
    await Font.loadAsync(fonts);
    setfontsLoaded(true);
  }

  loadFontsAsync();

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="ForgotPass" component={ForgotPass} />
            <Stack.Screen name="ForgotPass2" component={ForgotPass2} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ChooseAccountType" component={AccountType} />
            <Stack.Screen name="CreateAccount" component={SignUp} />
            <Stack.Screen name="App" component={AuthenticatedApp} />
            <Stack.Screen name="OpenCollection" component={OpenCollection} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    );
  }
  return <AppLoading />;
}
