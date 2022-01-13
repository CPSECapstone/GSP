import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList, RootTabBarParamList , TabBarScreenOptions, AppProps, LoginProps, HomeProps, ExploreProps, CollectionsProps, ProfileProps} from './route-settings';
import Explore from './components/Explore/Explore';

// Stack navigates between login and app, Tab navigates between pages within app
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabBarParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginPage}/>
        <Stack.Screen name="App" component={AuthenticatedApp}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AuthenticatedApp({ route, navigation } : AppProps) {
  return(
    <Tab.Navigator initialRouteName="Home" screenOptions={TabBarScreenOptions}>
      <Tab.Screen name="Home" component={HomePage}/>
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Collections" component={CollectionsPage}/>
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  ) 
}

// Placeholder components, replace with actual components as they are made
function LoginPage({ route, navigation } : LoginProps) {
  return(
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <StatusBar style="auto" />
      <Button
        title="Login"
        onPress={() => navigation.navigate('App')}
      />
    </View>
  ) 
}

function HomePage({ route, navigation } : HomeProps) {
  return(
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <StatusBar style="auto" />
      <Button
        title="Go to Explore"
        onPress={() => navigation.navigate('Explore')}
      />
    </View>
  ) 
}

function ExplorePage({ route, navigation } : ExploreProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Explore Screen</Text>
    </View>
  );
}

function CollectionsPage({ route, navigation } : CollectionsProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Collections Screen</Text>
    </View>
  );
}

function ProfilePage({ route, navigation } : ProfileProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
