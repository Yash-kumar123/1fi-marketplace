import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ShopHomeScreen from "../screens/ShopHomeScreen";
import ProductDetailsScreen from "../screens/marketplace/ProductDetailsScreen";
import ProceedConfirmationScreen from "../screens/marketplace/ProceedConfirmationScreen";

const Stack = createNativeStackNavigator();

export default function ShopStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ShopHome" component={ShopHomeScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="ProceedConfirmation" component={ProceedConfirmationScreen} />
    </Stack.Navigator>
  );
}
