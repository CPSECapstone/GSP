/* eslint-disable react/jsx-props-no-spreading */
import { RouteProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { selectBusinessById } from "../../../redux/selectors/business";
import BusinessProfile from "./BusinessProfile";

export type BusinessViewStackParamList = {
  BusinessView: { id: string };
  Component: undefined;
};

const BusinessViewStack =
  createNativeStackNavigator<BusinessViewStackParamList>();

type ViewProps = React.ComponentType<{
  route: RouteProp<any, any>;
  navigation: any;
}>;
function WithBusinessView({ Component }: { Component: ViewProps }) {
  return (
    <BusinessViewStack.Navigator screenOptions={{ headerShown: false }}>
      <BusinessViewStack.Screen name="Component">
        {(props) => <Component {...props} />}
      </BusinessViewStack.Screen>
      <BusinessViewStack.Screen name="BusinessView">
        {({ route }) => (
          <BusinessProfile
            business={useAppSelector(selectBusinessById(route.params.id))!}
          />
        )}
      </BusinessViewStack.Screen>
    </BusinessViewStack.Navigator>
  );
}

export default WithBusinessView;
