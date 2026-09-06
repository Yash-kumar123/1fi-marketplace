import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, Platform } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import ShopStack from "./ShopStack";
import EmiDuesScreen from "../screens/EmiDuesScreen";
import LimitScreen from "../screens/LimitScreen";
import ProfileScreen from "../screens/ProfileScreen";

import { colors } from "../constants/colors";

const Tab = createBottomTabNavigator();

const ICONS = {
  Home: "home",
  Shop: "storefront",
  "EMI Dues": "receipt",
  Limit: "stats-chart",
  Profile: "person",
};

const ICONS_OUTLINE = {
  Home: "home-outline",
  Shop: "storefront-outline",
  "EMI Dues": "receipt-outline",
  Limit: "stats-chart-outline",
  Profile: "person-outline",
};

function TabIcon({ name, focused }) {
  const iconName = focused ? ICONS[name] : ICONS_OUTLINE[name];
  return (
    <View style={styles.iconWrap}>
      {focused && <View style={styles.activeIndicator} />}
      <Ionicons
        name={iconName}
        size={22}
        color={focused ? colors.primary : colors.textMuted}
      />
    </View>
  );
}

export default function BottomTabs() {
  const insets = useSafeAreaInsets();
  const isAndroid = Platform.OS === "android";
  // On Android devices with edge-to-edge 3-button navigation, insets.bottom is often 0 or small,
  // leaving the Android system buttons (||| O <) directly over the tabs. We ensure at least 50dp.
  const bottomPadding = isAndroid
    ? Math.max(insets.bottom, 50)
    : Math.max(insets.bottom, 8);
  const tabBarHeight = 56 + bottomPadding;

  return (
    <Tab.Navigator
      initialRouteName="Shop"
      screenOptions={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route);
        const shouldHide =
          routeName === "ProductDetails" || routeName === "ProceedConfirmation";

        return {
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarLabelStyle: styles.label,
          tabBarStyle: shouldHide
            ? { display: "none" }
            : [
                styles.tabBar,
                {
                  height: tabBarHeight,
                  paddingBottom: bottomPadding,
                  paddingTop: 6,
                },
              ],
          tabBarIcon: ({ focused }) => (
            <TabIcon name={route.name} focused={focused} />
          ),
        };
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Shop" component={ShopStack} />
      <Tab.Screen name="EMI Dues" component={EmiDuesScreen} />
      <Tab.Screen name="Limit" component={LimitScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.card,
    borderTopWidth: 0,
    elevation: 8,
    shadowColor: colors.black,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
  },
  label: {
    fontSize: 10.5,
    fontWeight: "600",
  },
  iconWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 32,
  },
  activeIndicator: {
    position: "absolute",
    top: -8,
    width: 20,
    height: 2.5,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
});
