import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnboardingScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import MobileNumberInputScreen from "../screens/Registration/MobileNumberInputScreen";
import PasswordInputScreen from "../screens/Registration/PasswordInputScreen";
import OTPInputScreen from "../screens/Registration/OTPInputScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      {/* <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} /> */}
      <Stack.Screen
        name="RegistrationScreen"
        component={MobileNumberInputScreen}
      />
      <Stack.Screen name="OTPInputScreen" component={OTPInputScreen} />
      <Stack.Screen
        name="PasswordInputScreen"
        component={PasswordInputScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
