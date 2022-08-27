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
import axios from "axios";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";
import { PROXY_URL } from "@env";

const MobileNumberInputScreen = ({ navigation }) => {
  const [loaded] = useFonts({
    Montserrat: require("../../../assets/fonts/Montserrat.ttf"),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [mobile, setMobile] = useState("");
  if (!loaded) {
    return null;
  }

  const sendGetRequest = async () => {
    try {
      const resp = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      console.log(resp.data);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  const sendOTPCode = async () => {
    setIsLoading(true);
    // mobile number modify
    let only_phone_number = 0;
    // regualr expression checking to remove country code and extra spaces and dash
    only_phone_number = mobile.replace(/\D/g, "").slice(-11);
    if (only_phone_number.length !== 11) {
      setIsLoading(false);
      return alert("Check Your Phone Number");
    }

    axios
      .post(`${PROXY_URL}/api/otp/sendOTP`, {
        mobile: only_phone_number,
      })
      .then((result) => {
        if (result.data.success) {
          console.log(result.data.success);
          setIsLoading(false);
          navigation.navigate("OTPInputScreen", {
            msg: result.data.success,
            mobile: only_phone_number,
          });
        }
        if (result.data.varified) {
          console.log(result.data.varified);
          setIsLoading(false);
          return alert(result.data.varified);
        }
        if (result.data.error) {
          console.log(result.data.error);
          setIsLoading(false);
          return alert(result.data.error);
        }
      })
      .catch((err) => {
        console.log("error during sending the otp");
        console.log(err);
        setIsLoading(false);
      });
    //   navigation.navigate("OTPInputScreen");
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
            marginBottom: 30,
          }}
        >
          Registration
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
          <MaterialIcons
            name="phone"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Phone Number"
            style={{ flex: 1, paddingVertical: 0 }}
            keyboardType="phone-pad"
            value={mobile}
            onChangeText={(number) => setMobile(number)}
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
            onPress={sendOTPCode}
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

export default MobileNumberInputScreen;

const styles = StyleSheet.create({});
