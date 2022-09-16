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

const RequestScreen = () => {
  const [loaded] = useFonts({
    "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
    Montserrat: require("../../assets/fonts/Montserrat.ttf"),
  });
  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          marginBottom: 10,
          marginTop: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../../assets/pleaseWait.gif")}
          style={{
            flex: 1,
            resizeMode: "stretch",
            height: 250,
            width: "100%",
            borderRadius: 10,
          }}
        />
      </TouchableOpacity>
      <Text
        style={{ fontFamily: "Montserrat", fontSize: 20, textAlign: "center" }}
      >
        Best Ukils Are Near You. Please Wait Some Time To Reach Them.
      </Text>
      <Text
        style={{
          fontFamily: "Montserrat",
          fontSize: 20,
          textAlign: "center",
          color: "red",
          marginTop: 20,
        }}
      >
        Cancel Request
      </Text>
    </View>
  );
};

export default RequestScreen;

const styles = StyleSheet.create({});
