import { Image } from "react-native";
import React from "react";
import COLORS from "../utils/Colors";
import Onboarding from "react-native-onboarding-swiper";

function OnboardingScreen({ navigation }) {
  return (
    <Onboarding
      onSkip={() => navigation.replace("LoginScreen")}
      onDone={() => navigation.navigate("LoginScreen")}
      pages={[
        {
          backgroundColor: COLORS.main,
          image: (
            <Image
              source={require("../../assets/onboradimag/LogoTopBan.png")}
            />
          ),
          title: "Doctor Doctor",
          subtitle: "Meet the most advance patient doctor solution for you..",
        },
        {
          backgroundColor: "#fdeb93",
          image: (
            <Image
              source={require("../../assets/onboradimag/stethoscope.png")}
            />
          ),
          title: "Don't panic during illness",
          subtitle:
            "We are here to provide the most efficient software solution for you...",
        },
        {
          backgroundColor: "#e9bcbe",
          image: (
            <Image source={require("../../assets/onboradimag/patient.png")} />
          ),
          title: "Doctors are available",
          subtitle: "Call your doctor through the app anywhere anytime",
        },
      ]}
    />
  );
}

export default OnboardingScreen;
