import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const OTPInputScreen = ({ navigation }) => {
  const [loaded] = useFonts({
    Montserrat: require("../../../assets/fonts/Montserrat.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingHorizontal: 10 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../../assets/images/misc/registration.png")}
            style={{
              height: 250,
              width: 350,
              resizeMode: "stretch",
              marginBottom: 30,
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 28,
            fontFamily: "Montserrat",
            fontWeight: 500,
            marginBottom: 30,
          }}
        >
          OTP Verification
        </Text>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}
        >
          <MaterialCommunityIcons
            name="key-star"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="OTP Code"
            style={{ flex: 1, paddingVertical: 0 }}
            keyboardType="phone-pad"
          />
        </View>
        {/* back,next button */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              flex: 1,

              borderWidth: 1,
              borderColor: "#AD40AF",
              padding: 20,
              borderRadius: 10,
              marginBottom: 30,
              marginRight: 10,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "700",
                color: "#AD40AF",
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PasswordInputScreen");
            }}
            style={{
              flex: 1,
              backgroundColor: "#AD40AF",
              padding: 20,
              borderRadius: 10,
              marginBottom: 30,
              marginLeft: 10,
            }}
          >
            <Text
              style={{ textAlign: "center", fontWeight: "700", color: "white" }}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text>Already Registered?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("LoginScreen");
            }}
          >
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OTPInputScreen;

const styles = StyleSheet.create({});
