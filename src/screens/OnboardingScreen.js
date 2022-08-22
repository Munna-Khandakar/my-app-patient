import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";

function OnboardingScreen({ navigation }) {
  const [loaded] = useFonts({
    Montserrat: require("../../assets/fonts/Montserrat.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 50 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "#20315f" }}>
          MYAPP
        </Text>
      </View>
      <Image
        style={{ height: "40%", width: "90%", resizeMode: "stretch" }}
        source={require("../../assets/images/misc/gaming.png")}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "#AD40AF",
          padding: 20,
          width: "90%",
          borderRadius: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
            fontFamily: "Montserrat",
          }}
        >
          Let's Begin
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
