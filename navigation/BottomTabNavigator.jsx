import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/core";
import React from "react";
import { StyleSheet } from "react-native";
import Colors, { cxlxrs } from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import Home from "../screens/Home/Home";
import Profile from "../screens/Profile/Profile";
import Notification from "../screens/Notification/Notification";
import EditProfile from "../screens/EditProfile/EditProfile";
import About from "../screens/About/About";
import Cashiers from "../screens/Cashiers/Cashiers";
import { Text } from "../components/Themed/Themed";
import Products from "../screens/Products/Products";
import AddCategory from "../screens/AddCategory/AddCategory";
import AddProduct from "../screens/AddProduct/AddProduct";
import ProductView from "../screens/ProductView/ProductView";
import AddCashier from "../screens/AddCashier/AddCashier";
import Reports from "../screens/Reports/Reports";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  function getTabBarVisible(route) {
    const routeName = getFocusedRouteNameFromRoute(route);
    switch (routeName) {
      case "EditProfile":
        return false;
        break;
      case "Profile":
        return false;
        break;
      case "Notification":
        return false;
        break;
      case "Cashiers":
        return false;
        break;
      case "AddCashier":
        return false;
        break;
      // case "Products":
      //   return false;
      //   break;
      case "AddCategory":
        return false;
        break;
      case "AddProduct":
        return false;
        break;
      case "ProductView":
        return false;
        break;
      case "About":
        return false;
        break;
      default:
        return true;
        break;
    }
  }
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].black,
        inactiveTintColor: cxlxrs.inactiveTintColor,
        activeBackgroundColor: cxlxrs.white,
        inactiveBackgroundColor: cxlxrs.white,
        style: {
          height: 60,
          alignItems: "center",
          justifyContent: "center",
        },
        keyboardHidesTabBar: true,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreenNavigator}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisible(route),
          tabBarLabel: ({ focused }) =>
            focused && (
              <Text position="right" style={styles.linkText}>
                Home
              </Text>
            ),
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <AntDesign name="appstore1" size={22} color={color} />
            ) : (
              <AntDesign name="appstore1" size={20} color={color} />
            ),
        })}
      />
      <BottomTab.Screen
        name="Products"
        component={ProductsScreenNavigator}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisible(route),
          tabBarLabel: ({ focused }) =>
            focused && (
              <Text position="right" style={styles.linkText}>
                Inventory
              </Text>
            ),
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <MaterialIcons name="inventory" size={23} color={color} />
            ) : (
              <MaterialIcons name="inventory" size={20} color={color} />
            ),
        })}
      />

      <BottomTab.Screen
        name="Reports"
        component={ReportsScreenNavigator}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisible(route),
          unmountOnBlur: true,
          tabBarLabel: ({ focused }) =>
            focused && (
              <Text position="right" style={styles.linkText}>
                Reports
              </Text>
            ),
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="notebook-multiple"
                size={23}
                color={color}
              />
            ) : (
              <MaterialCommunityIcons
                name="notebook-multiple"
                size={20}
                color={color}
              />
            ),
        })}
      />
    </BottomTab.Navigator>
  );
}

const ScreenStack = createStackNavigator();
// const TopTabNavStack = createStackNavigator();

function HomeScreenNavigator() {
  return (
    <ScreenStack.Navigator>
      <ScreenStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <ScreenStack.Screen
        name="Cashiers"
        component={Cashiers}
        options={{
          headerShown: false,
        }}
      />
      <ScreenStack.Screen
        name="AddCashier"
        component={AddCashier}
        options={{
          headerShown: false,
        }}
      />
      <ScreenStack.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: false,
        }}
      />
      <ScreenStack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <ScreenStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: false,
        }}
      />
      <ScreenStack.Screen
        name="About"
        component={About}
        options={{
          headerShown: false,
        }}
      />
    </ScreenStack.Navigator>
  );
}

function ProductsScreenNavigator() {
  return (
    <ScreenStack.Navigator>
      <ScreenStack.Screen
        name="Products"
        component={Products}
        options={{
          headerShown: false,
        }}
      />
      <ScreenStack.Screen
        name="AddCategory"
        component={AddCategory}
        options={{
          headerShown: false,
        }}
      />
      <ScreenStack.Screen
        name="AddProduct"
        component={AddProduct}
        options={{
          headerShown: false,
        }}
      />
      <ScreenStack.Screen
        name="ProductView"
        component={ProductView}
        options={{
          headerShown: false,
        }}
      />
    </ScreenStack.Navigator>
  );
}

function ReportsScreenNavigator() {
  return (
    <ScreenStack.Navigator>
      <ScreenStack.Screen
        name="Reports"
        component={Reports}
        options={{
          headerShown: false,
        }}
      />
    </ScreenStack.Navigator>
  );
}

const styles = StyleSheet.create({
  linkText: {
    color: "#151617",
    fontSize: 9,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 10,
    textTransform: "uppercase",
  },
});
