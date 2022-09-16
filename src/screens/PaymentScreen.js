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
import COLORS from "../utils/Colors";

const PaymentScreen = () => {
  const [loaded] = useFonts({
    "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
    Montserrat: require("../../assets/fonts/Montserrat.ttf"),
  });
  const { setUkilRequestStatus } = useContext(AuthContext);
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
          source={require("../../assets/peyment.gif")}
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
        Ukils Are Ready For You. Just Pay The Charge & Get Your Ukil. Your Ref
        ID is Given Below
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          backgroundColor: COLORS.main,
          padding: 10,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            fontFamily: "Montserrat",
            fontSize: 20,
            textAlign: "center",
            fontWeight: "bold",
            color: "white",
            marginRight: 20,
          }}
        >
          2577MUAH
        </Text>
        <TouchableOpacity onPress={() => setUkilRequestStatus("make")}>
          <MaterialIcons name="content-copy" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
