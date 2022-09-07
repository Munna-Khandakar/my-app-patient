import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from "react-native";
import { useFonts } from "expo-font";
import * as Location from "expo-location";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { sliderData } from "../models/data";
import BannerSlider from "../components/BannerSlider";
import { PROXY_URL } from "@env";
import io from "socket.io-client";
import { AuthContext } from "../context/AuthContext";
const HomeScreen = ({ navigation }) => {
  // variables
  const socket = io(`${PROXY_URL}`, { transports: ["websocket"] });
  const [loaded] = useFonts({
    "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
    Montserrat: require("../../assets/fonts/Montserrat.ttf"),
  });
  const { userInfo, sendEmergencyCall, sentCall } = useContext(AuthContext);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // socket setup
  React.useEffect(() => {
    socket.emit("MapUserId", userInfo?._id);
  }, []);

  // location api
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        alert("Permission to access location was denied");
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      try {
        setLocation(location);
        const place = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        setAddress(place);
      } catch (error) {
        console.log(error);
        setAddress(null);
      }
      setLocation(location.coords);
      console.log("Client location saved...");
    })();
  }, []);

  // call handler
  const emergencyCallHandler = async () => {
    sendEmergencyCall({ location });
  };
  if (!loaded) {
    return null;
  }

  // banner for FlatList
  const renderItem = ({ item }) => {
    return <BannerSlider data={item} />;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ padding: 20, marginTop: 20 }}>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Roboto-Medium",
              fontWeight: "bold",
            }}
          >
            MYAPP
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}
          >
            <ImageBackground
              source={require("../../assets/images/user-profile.jpg")}
              style={{ width: 35, height: 35 }}
              imageStyle={{ borderRadius: 25 }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderColor: "#C6C6C6",
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 8,
            marginBottom: 10,
            marginTop: 10,
          }}
        >
          <Entypo
            name="location"
            size={20}
            color="#C6C6C6"
            style={{ marginEnd: 5 }}
          />

          <TextInput
            placeholder={
              !address
                ? "Waiting"
                : `${address[0]["street"]}, ${address[0]["district"]}, ${address[0]["city"]}, ${address[0]["postalCode"]}`
            }
          />
        </View>
        <TouchableOpacity
          onPress={emergencyCallHandler}
          style={{
            flexDirection: "row",
            marginBottom: 10,
            marginTop: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../assets/call.png")}
            style={{
              flex: 1,
              resizeMode: "stretch",
              height: 200,
              width: "100%",
              borderRadius: 10,
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 16, fontFamily: "Roboto-Medium" }}>
            Categories..
          </Text>
          <TouchableOpacity>
            <Text style={{ color: "#0aada8" }}>See More</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={sliderData}
          renderItem={renderItem}
          keyExtractor={(item) => item.image}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
