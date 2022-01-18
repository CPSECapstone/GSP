import React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  RootStackParamList,
  RootTabBarParamList,
  TabBarScreenOptions,
  LoginProps,
  HomeProps,
} from "./route-settings";
import Explore from './components/Explore/Explore';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const fonts = {
  "Mada-Black": require('./assets/fonts/Mada/Mada-Black.ttf'),
  "Mada-Regular": require('./assets/fonts/Mada/Mada-Regular.ttf'),
  "Mada-SemiBold": require('./assets/fonts/Mada/Mada-SemiBold.ttf'),
  "Mada-Bold": require('./assets/fonts/Mada/Mada-Bold.ttf')
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

// Placeholder components, replace with actual components as they are made
function LoginPage({ navigation }: LoginProps) {
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <StatusBar />
      <Button title="Login" onPress={() => navigation.navigate("App")} />
    </View>
  );
}

function HomePage({ navigation }: HomeProps) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <StatusBar />
      <Button
        title="Go to Explore"
        onPress={() => navigation.navigate("Explore")}
      />
    </View>
  );
}

function CollectionsPage() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Collections Screen</Text>
    </View>
  );
}

function ProfilePage() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile Screen</Text>
    </View>
  );
}

function AuthenticatedApp() {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={TabBarScreenOptions}>
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Collections" component={CollectionsPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded, setfontsLoaded] = React.useState(false);

  async function _loadFontsAsync() {
      await Font.loadAsync(fonts);
      setfontsLoaded(true);
  }

  _loadFontsAsync();

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="App" component={AuthenticatedApp} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return <AppLoading />;
  }
}
