import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import axios from "axios";
import { PROXY_URL } from "@env";

const PasswordInputScreen = ({ route, navigation }) => {
  const [loaded] = useFonts({
    Montserrat: require("../../../assets/fonts/Montserrat.ttf"),
  });

  const [isLoading, setIsLoading] = useState(false);
  const { verified, mobile } = route.params;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
  if (!loaded) {
    return null;
  }

  const registration = async () => {
    console.log(verified);
    console.log(mobile);
    console.log(password);
    setIsLoading(true);
    if (!verified && !mobile) {
      setIsLoading(false);
      return alert("Please verify your phone number first");
    }
    if (password !== confirmPassword) {
      setIsLoading(false);
      return alert("Password and Confirm Password not matched...");
    }
    axios
      .post(`${PROXY_URL}/api/auth/register`, {
        verified,
        mobile,
        password,
      })
      .then((result) => {
        if (result) {
          setIsLoading(false);
          navigation.navigate("LoginScreen", {
            msg: "Login to enter your account",
          });
        }
      })
      .catch((err) => {
        console.log(err);
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
            marginBottom: 30,
          }}
        >
          Set Password
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
            name="lock-outline"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Password"
            style={{ flex: 1, paddingVertical: 0 }}
            secureTextEntry={!seePassword}
            value={password}
            onChangeText={(number) => setPassword(number)}
          />
          <TouchableOpacity onPress={() => {}}>
            <Feather
              name="eye-off"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          </TouchableOpacity>
        </View>
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
            name="lock-outline"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Confirm Password"
            style={{ flex: 1, paddingVertical: 0 }}
            secureTextEntry={!seeConfirmPassword}
            value={confirmPassword}
            onChangeText={(number) => setConfirmPassword(number)}
          />
          <TouchableOpacity onPress={() => {}}>
            <Feather
              name="eye-off"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          </TouchableOpacity>
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
            onPress={registration}
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
                Register
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

export default PasswordInputScreen;

const styles = StyleSheet.create({});
