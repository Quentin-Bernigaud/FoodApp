import React from "react";
import { Text, View } from "react-native";
import { Icon } from "native-base";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "./src/views/HomeScreen.js";
import ScanScreen from "./src/views/ScanScreen";
import DetailsScreen from "./src/views/DetailsScreen";
import AddButton from "./src/components/AddButton";

const HomeStack = createStackNavigator({
  FoodApp: { screen: HomeScreen }
});
const ScanStack = createStackNavigator({
  Scan: { screen: ScanScreen }
});
const VoidStack = createStackNavigator({
  FoodApp: { screen: () => null }
});

const BaseNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="MaterialCommunityIcons"
            name="home"
            color={tintColor}
            size={24}
            style={{ color: tintColor }}
          />
        )
      })
    },
    // Adding: {
    //     screen: () => null, // Empty screen
    //     navigationOptions: () => ({
    //         tabBarIcon: <AddButton /> // Plus button component
    //     })
    // },
    Scan: {
      screen: ScanStack,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="MaterialCommunityIcons"
            name="barcode-scan"
            color={tintColor}
            size={24}
            style={{ color: tintColor }}
          />
        )
      })
    }
  },
  {
    tabBarOptions: {
      showLabel: false, // hide labels
      activeTintColor: "#FFFFFF", // active icon color
      inactiveTintColor: "#BF8A49", // inactive icon color
      style: {
        backgroundColor: "#FCB65F" // TabBar background
      }
    }
  }
);

export default createAppContainer(BaseNavigator);
