import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useFonts } from "expo-font";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PROXY_URL } from "@env";

const OTPInputScreen = ({ route, navigation }) => {
  const [loaded] = useFonts({
    Montserrat: require("../../../assets/fonts/Montserrat.ttf"),
  });

  const { msg, mobile } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  if (!loaded) {
    return null;
  }

  const verifyOTP = async () => {
    setIsLoading(true);
    // check otp code not empty
    if (!otp) {
      setIsLoading(false);
      return alert("OTP code can't be empty");
    }
    axios
      .put(`${PROXY_URL}/api/otp/verifyOTP`, { otp, mobile })
      .then((result) => {
        if (result.data.varified) {
          console.log(result.data.varified);
          setIsLoading(false);
          navigation.navigate("PasswordInputScreen", {
            mobile,
            verified: true,
          });
        }
        if (result.data.notVarified) {
          console.log(result.data.varified);
          setIsLoading(false);
          return alert(result.data.notVarified);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setIsLoading(false);
        return alert("Opps,Something went wrong..!");
      });
  };

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
            fontWeight: "500",
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          OTP Verification
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: "Montserrat",
            fontWeight: "50",
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          {msg}
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
            value={otp}
            onChangeText={(number) => setOtp(number)}
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
            disabled={isLoading}
            onPress={verifyOTP}
            style={{
              flex: 1,
              backgroundColor: "#AD40AF",
              padding: 20,
              borderRadius: 10,
              marginBottom: 30,
              marginLeft: 10,
            }}
          >
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "700",
                  color: "white",
                }}
              >
                Next
              </Text>
            )}
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
