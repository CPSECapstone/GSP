import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';

// https://reactnavigation.org/docs/typescript/
// Maps route names to params of a route
// https://reactnavigation.org/docs/params

export type RootStackParamList = {
    Login: undefined;
    App: undefined;
};

export type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type AppProps = NativeStackScreenProps<RootStackParamList, 'App'>;

export type RootTabBarParamList = {
    Home: undefined;
    Explore: undefined;
    Collections: undefined;
    Profile: undefined;
    Feed: { sort: 'latest' | 'top' } | undefined;
};

export type HomeProps = NativeStackScreenProps<RootTabBarParamList, 'Home'>;
export type ExploreProps = NativeStackScreenProps<RootTabBarParamList, 'Explore'>;
export type CollectionsProps = NativeStackScreenProps<RootTabBarParamList, 'Collections'>;
export type ProfileProps = NativeStackScreenProps<RootTabBarParamList, 'Profile'>;

export const TabBarScreenOptions = ({ route } : any) => ({
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {height: 70, backgroundColor: 'F5F5F8', borderTopWidth: 0},
    tabBarIcon: ({ focused, color, size } : {focused : any, color: any, size: any}) => {
      let iconName : any;

      if (route.name === 'Home') {
        iconName = 'ios-home'
      } else if (route.name === 'Explore') {
        iconName = 'ios-compass'
      } else if (route.name === 'Collections') {
        iconName = 'ios-bookmark'
      } else if (route.name === 'Profile') {
        iconName = 'ios-person'
      }

      if (!focused) {
        iconName += '-outline'
      }

      // You can return any component that you like here!
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'tomato',
  })