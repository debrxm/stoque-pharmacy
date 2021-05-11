import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import { RegisterForPushNotificationsAsync } from "../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import Onboarding from "../screens/Onboarding/Onboarding";
import BottomTabNavigator from "./BottomTabNavigatorCustom";
import Register from "../screens/Register/Register";
import Login from "../screens/Login/Login";
import ForgotPassword from "../screens/ForgotPassword/ForgotPassword";
import { auth, firestore } from "../firebase/config";
import { createShopAdminProfile } from "../firebase/auth";
import { setCurrentUser, toggleHasNoty } from "../redux/user/actions";
import RenewLicense from "../screens/RenewLicense/RenewLicense";

function Navigation({ colorScheme }) {
  const currentUser = useSelector(({ user }) => user.currentUser);
  const notificationListener = useRef();
  const responseListener = useRef();
  const dispatch = useDispatch();
  const checkUser = () => {
    auth.onAuthStateChanged(async (User) => {
      if (User) {
        const userRef = await createShopAdminProfile(User);
        userRef.onSnapshot(async (snapShot) => {
          const data = { id: snapShot.id, ...snapShot.data() };
          dispatch(setCurrentUser(data));
          const notificationRef = await firestore
            .collection("notifications")
            .doc(snapShot.id)
            .collection("notifications")
            .where("viewed", "==", false);
          notificationRef.onSnapshot(async (snapShot) => {
            if (snapShot.size > 0) {
              dispatch(toggleHasNoty(true));
            } else {
              dispatch(toggleHasNoty(false));
            }
          });
        });
      }
    });
  };
  const updateNotificationToken = (token) => {
    firestore
      .doc(`users/${currentUser.id}`)
      .update({ notificationToken: token });
  };
  useEffect(() => {
    checkUser();
    RegisterForPushNotificationsAsync().then((token) => {
      if (currentUser && currentUser.notificationToken) {
        currentUser.notificationToken !== token &&
          updateNotificationToken(token);
      } else {
        updateNotificationToken(token);
      }
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Noty Listeer", notification);
        dispatch(toggleHasNoty(true));
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Response Listeer", response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [""]);

  const renderer = () => {
    if (currentUser.hasSubcribedBefore && currentUser.subExpireTimestamp) {
      const subExpired = Date.now() >= currentUser.subExpireTimestamp;
      return subExpired ? <LicenseNavigator type="renew" /> : <RootNavigator />;
    } else if (!currentUser.hasSubcribedBefore) {
      return <LicenseNavigator type="subscribe" />;
    } else {
      return <RootNavigator />;
    }
  };
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {currentUser ? renderer() : <AuthNavigator />}
    </NavigationContainer>
  );
}

const RootStack = createStackNavigator();

function RootNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Root" component={BottomTabNavigator} />
    </RootStack.Navigator>
  );
}

const LicenseStack = createStackNavigator();

function LicenseNavigator({ type }) {
  return (
    <LicenseStack.Navigator screenOptions={{ headerShown: false }}>
      <LicenseStack.Screen
        name="Root"
        children={() => <RenewLicense type={type} />}
        options={{ headerShown: false }}
      />
    </LicenseStack.Navigator>
  );
}

const AuthStack = createStackNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen
        name="Root"
        component={Onboarding}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Register"
        component={Register}
        options={{ title: "Register" }}
      />
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login" }}
      />
      <AuthStack.Screen
        name="Reset"
        component={ForgotPassword}
        options={{ title: "Reset Password" }}
      />
    </AuthStack.Navigator>
  );
}

export default Navigation;
