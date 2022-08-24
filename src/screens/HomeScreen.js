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
  StatusBar,
} from "react-native";
import { useFonts } from "expo-font";
import React from "react";
import axios from "axios";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { sliderData } from "../models/data";
import BannerSlider from "../components/BannerSlider";
const HomeScreen = ({ navigation }) => {
  const [loaded] = useFonts({
    "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
    Montserrat: require("../../assets/fonts/Montserrat.ttf"),
  });

  const emergencyCallHandler = () => {
    axios
      .get("http://localhost:5000/api/emergency")
      .then((result) => {
        alert("Wait for doctor response...");
      })
      .catch((err) => {
        console.log(err);
        return alert("Opps,Something went wrong..!");
      });
  };
  if (!loaded) {
    return null;
  }

  const renderItem = ({ item }) => {
    return <BannerSlider data={item} />;
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ padding: 20 }}>
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

          <TextInput placeholder="Mirpur DOHS, Mirpur 12, Dhaka" />
        </View>
        <TouchableOpacity
          onPress={emergencyCallHandler}
          style={{
            flexDirection: "row",
            borderColor: "#F37878",
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 8,
            marginBottom: 10,
            marginTop: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialIcons
            name="medical-services"
            size={20}
            color="#F37878"
            style={{ marginEnd: 5 }}
          />

          <Text style={{ textAlign: "center", color: "#F37878" }}>
            EMERGENCY-2
          </Text>
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
