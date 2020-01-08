import React from "react";
import { Text, View } from "react-native";
import { Icon } from "native-base";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "./src/views/HomeScreen.js";
import ScanScreen from "./src/views/ScanScreen";
import DetailsScreen from "./src/views/DetailsScreen";

const HomeStack = createStackNavigator({
  HomePage: { screen: HomeScreen },
  ScanScreen: { screen: ScanScreen },
  Details: { screen: DetailsScreen }
});

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: () => ({
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon
            focused={focused}
            tintColor={{ tintColor }}
            name="home"
            color={tintColor}
            active={focused}
            size={24}
          />
        )
      })
    },
    Scanner: {
      screen: ScanScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon
            focused={focused}
            tintColor={{ tintColor }}
            type="MaterialCommunityIcons"
            name="barcode-scan"
            color={tintColor}
            size={24}
          />
        )
      })
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: "#cd077d",
      inactiveTintColor: "gray"
    }
  }
);

export default createAppContainer(TabNavigator);
