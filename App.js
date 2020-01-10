import React from "react";
import { Text, View } from "react-native";
import { Icon } from "native-base";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "./src/views/HomeScreen.js";
import DetailsScreen from "./src/views/DetailsScreen";
import ScanScreen from "./src/views/ScanScreenFlash";
import HistoryScreen from "./src/views/HistoryScreen";
import AddButton from "./src/components/AddButton";

const HomeStack = createStackNavigator({
  FoodApp: { screen: HomeScreen },
  Details: { screen: DetailsScreen }
});
const ScanStack = createStackNavigator({
  Scan: { screen: ScanScreen }
});
const HistoryStack = createStackNavigator({
  Historique: { screen: HistoryScreen }
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
    },
    History: {
      screen: HistoryStack,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="MaterialCommunityIcons"
            name="history"
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
