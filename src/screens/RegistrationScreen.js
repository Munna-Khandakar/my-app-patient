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
import { MaterialIcons, Feather } from "@expo/vector-icons";

const RegistrationScreen = ({ navigation }) => {
  const [loaded] = useFonts({
    Montserrat: require("../../assets/fonts/Montserrat.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingHorizontal: 10 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/images/misc/registration.png")}
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
          />
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
            placeholder="Password"
            style={{ flex: 1, paddingVertical: 0 }}
            secureTextEntry={true}
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
            secureTextEntry={true}
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
        <TouchableOpacity
          onPress={() => {}}
          style={{
            backgroundColor: "#AD40AF",
            padding: 20,
            borderRadius: 10,
            marginBottom: 30,
          }}
        >
          <Text
            style={{ textAlign: "center", fontWeight: "700", color: "white" }}
          >
            Register
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text>Already Registered?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({});
