import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Amplify from "aws-amplify";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import awsconfig from "./src/aws-exports";
import AccountType from "./components/Login/AccountType";
import SignUp from "./components/Login/SignUp";
import Explore from "./components/Explore/Explore";
import Collections from "./components/Collections/Collections";
import Login from "./components/Login/Login";
import ForgotPass from "./components/Login/ForgotPass";
import BizReviewPage from "./components/Review/BizReviewPage";
import ForgotPass2 from "./components/Login/ForgotPass2";
import SignUpCode from "./components/Login/SignUpCode";
import OpenCollection from "./components/Collections/OpenCollection";
import ReviewPage from "./components/Review/ReviewPage";

import {
  RootStackParamList,
  RootTabBarParamList,
  TabBarScreenOptions,
} from "./route-settings";

import Home from "./components/Home/Home";
import store from "./redux/store";
import initializeRedux from "./redux/initialize";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import Notifications from "./components/OwnershipTransfer/NotificationsPage";
import ProfileSelector from "./components/Profile/ProfileSelector";
import BusinessEditor from "./components/Profile/Business/BusinessEditor";
import CreateEditReview from "./components/Review/CreateEditReview";
import { selectUser } from "./redux/selectors/user";
import notifications from "./redux/thunks/notifications";
import collections from "./redux/thunks/collections";
import verification from "./redux/thunks/verification";

const madaBlack = require("./assets/fonts/Mada/Mada-Black.ttf");
const madaRegular = require("./assets/fonts/Mada/Mada-Regular.ttf");
const madaSemiBold = require("./assets/fonts/Mada/Mada-SemiBold.ttf");
const madaBold = require("./assets/fonts/Mada/Mada-Bold.ttf");
const madaMedium = require("./assets/fonts/Mada/Mada-Medium.ttf");
const poppinsRegular = require("./assets/fonts/Poppins/Poppins-Regular.ttf");
const poppinsSemi = require("./assets/fonts/Poppins/Poppins-SemiBold.ttf");

const fonts = {
  "Mada-Black": madaBlack,
  "Mada-Regular": madaRegular,
  "Mada-SemiBold": madaSemiBold,
  "Mada-Bold": madaBold,
  "Mada-Medium": madaMedium,
  "Poppins-Regular": poppinsRegular,
  "Poppins-SemiBold": poppinsSemi,
};

Amplify.configure(awsconfig);

// Stack navigates between login and app, Tab navigates between pages within app
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabBarParamList>();

function AuthenticatedApp() {
  const user = useAppSelector(selectUser)!;
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(notifications.fetchNotifications(user.id));
    dispatch(collections.fetchCollections(user.id));
    if (user.isModerator) {
      dispatch(verification.fetchRequests());
    }
  }, []);

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={TabBarScreenOptions}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Collections" component={Collections} />
      <Tab.Screen name="Profile" component={ProfileSelector} />
    </Tab.Navigator>
  );
}

function InnerApp() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    initializeRedux(dispatch);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          headerTintColor: "#000000",
          headerBackTitle: "Back",
          headerBackTitleVisible: true,
          headerBackTitleStyle: { fontSize: 18, fontFamily: "Mada-SemiBold" },
        }}
      >
        <Stack.Screen
          name="ForgotPass"
          component={ForgotPass}
          options={{
            title: "Forgot Password",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="ForgotPass2"
          component={ForgotPass2}
          options={{
            title: "Reset Password",
            headerShown: true,
          }}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="ChooseAccountType"
          component={AccountType}
          options={{
            title: "Chose an Account",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="CreateAccount"
          component={SignUp}
          options={{
            title: "Create an Account",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="CreateAccountCode"
          component={SignUpCode}
          options={{
            title: "Input Code",
            headerShown: true,
          }}
        />
        <Stack.Screen name="CreateBusinessProfile" component={BusinessEditor} />
        <Stack.Screen name="App" component={AuthenticatedApp} />
        <Stack.Screen name="OpenCollection" component={OpenCollection} />
        <Stack.Screen name="ReviewPage" component={ReviewPage} />
        <Stack.Screen name="BizReviewPage" component={BizReviewPage} />
        <Stack.Screen name="CreateEditReview" component={CreateEditReview} />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{ title: "Notifications", headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded, setfontsLoaded] = React.useState(false);

  async function loadFontsAsync() {
    await Font.loadAsync(fonts);
    setfontsLoaded(true);
  }

  React.useEffect(() => {
    if (!fontsLoaded) {
      loadFontsAsync();
    }
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        {fontsLoaded ? <InnerApp /> : <AppLoading />}
      </SafeAreaProvider>
    </Provider>
  );
}
