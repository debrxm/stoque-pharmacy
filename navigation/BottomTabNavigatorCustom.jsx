import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/core";
import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { isIphoneX } from "react-native-iphone-x-helper";

import Home from "../screens/Home/Home";
import Profile from "../screens/Profile/Profile";
import Notification from "../screens/Notification/Notification";
import EditProfile from "../screens/EditProfile/EditProfile";
import CompleteSetup from "../screens/CompleteSetup/CompleteSetup";
import ShopInfo from "../screens/ShopInfo/ShopInfo";
import About from "../screens/About/About";
import Cashiers from "../screens/Cashiers/Cashiers";
import AddCashier from "../screens/AddCashier/AddCashier";
import CashierView from "../screens/CashierView/CashierView";
import Products from "../screens/Products/Products";
import AddCategory from "../screens/AddCategory/AddCategory";
import AddProduct from "../screens/AddProduct/AddProduct";
import ProductView from "../screens/ProductView/ProductView";
import Reports from "../screens/Reports/Reports";
import ReportView from "../screens/ReportView/ReportView";
import License from "../screens/License/License";
import ShoppingList from "../screens/ShoppingList/ShoppingList";
import ArchivedCashiers from "../screens/ArchivedCashiers/ArchivedCashiers";
import ArchivedProducts from "../screens/ArchivedProducts/ArchivedProducts";

import { Icons } from "../constants/icons";
import { cxlxrs } from "../constants/Colors";

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({
  accessibilityLabel,
  accessibilityState,
  children,
  onPress,
}) => {
  const isSelected = accessibilityState.selected;
  if (isSelected) {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            top: 0,
          }}
        >
          <View style={{ flex: 1, backgroundColor: "#ffffff" }}></View>
          <Svg width={75} height={61} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={"#ffffff"}
            />
          </Svg>
          <View style={{ flex: 1, backgroundColor: "#ffffff" }}></View>
        </View>

        <TouchableOpacity
          style={[styles.tabIconContainer, styles.shadow]}
          onPress={onPress}
        >
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={styles.tabIconContainerInactive}
        activeOpacity={1}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    );
  }
};

const CustomTabBar = (props) => {
  if (isIphoneX()) {
    return (
      <View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 30,
            backgroundColor: cxlxrs.white,
          }}
        ></View>
        <BottomTabBar {...props.props} />
      </View>
    );
  } else {
    return <BottomTabBar {...props.props} />;
  }
};
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
    case "CompleteSetup":
      return false;
      break;
    case "ShopInfo":
      return false;
      break;
    case "Cashiers":
      return false;
      break;
    case "AddCashier":
      return false;
      break;
    case "CashierView":
      return false;
      break;
    case "AddCategory":
      return false;
      break;
    case "AddProduct":
      return false;
      break;
    case "ProductView":
      return false;
      break;
    case "License":
      return false;
      break;
    case "ShoppingList":
      return false;
      break;
    case "ArchivedCashiers":
      return false;
      break;
    case "ArchivedProducts":
      return false;
      break;
    case "About":
      return false;
      break;
    case "ReportView":
      return false;
      break;
    default:
      return true;
      break;
  }
}

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "transparent",
          elevation: 0,
        },
      }}
      tabBar={(props) => <CustomTabBar props={props} />}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreenNavigator}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisible(route),
          tabBarIcon: ({ focused }) => (
            <Image
              source={Icons.more}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? cxlxrs.white : cxlxrs.textColor,
              }}
            />
          ),
          tabBarButton: (props) =>
            getTabBarVisible(route) && <TabBarCustomButton {...props} />,
        })}
      />
      <Tab.Screen
        name="Products"
        component={ProductsScreenNavigator}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisible(route),
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="inventory"
              size={23}
              color={focused ? cxlxrs.white : cxlxrs.textColor}
            />
          ),
          tabBarButton: (props) =>
            getTabBarVisible(route) && <TabBarCustomButton {...props} />,
        })}
      />
      <Tab.Screen
        name="Reports"
        component={ReportsScreenNavigator}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisible(route),
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="notebook-multiple"
              size={23}
              color={focused ? cxlxrs.white : cxlxrs.textColor}
            />
          ),
          tabBarButton: (props) =>
            getTabBarVisible(route) && <TabBarCustomButton {...props} />,
        })}
      />
    </Tab.Navigator>
  );
};

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
        name="CashierView"
        component={CashierView}
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
        name="CompleteSetup"
        component={CompleteSetup}
        options={{
          headerShown: false,
        }}
      />
      <ScreenStack.Screen
        name="ShopInfo"
        component={ShopInfo}
        options={{
          headerShown: false,
        }}
      />
      <ScreenStack.Screen
        name="License"
        component={License}
        options={{
          headerShown: false,
        }}
      />
      <ScreenStack.Screen
        name="ShoppingList"
        component={ShoppingList}
        options={{
          headerShown: false,
        }}
      />
      <ScreenStack.Screen
        name="ArchivedCashiers"
        component={ArchivedCashiers}
        options={{
          headerShown: false,
        }}
      />
      <ScreenStack.Screen
        name="ArchivedProducts"
        component={ArchivedProducts}
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
      <ScreenStack.Screen
        name="ReportView"
        component={ReportView}
        options={{
          headerShown: false,
        }}
      />
    </ScreenStack.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: cxlxrs.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  tabIconContainer: {
    top: -22.5,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: cxlxrs.black,
  },
  tabIconContainerInactive: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    backgroundColor: cxlxrs.white,
  },
});

export default BottomTabNavigator;
