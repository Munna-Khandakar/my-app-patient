import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { useFonts } from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { AuthContext } from "../context/AuthContext";
import COLORS from "../utils/Colors";

const CustomDrawer = (props) => {
  const { logout, userInfo, getMyRatings } = useContext(AuthContext);
  const [myRatings, setMyRatings] = useState(0);
  const [loaded] = useFonts({
    Montserrat: require("../../assets/fonts/Montserrat.ttf"),
  });
  useEffect(() => {
    const updaterattings = async () => {
      const r = await getMyRatings();
      setMyRatings(r);
    };
    updaterattings();
  });
  if (!loaded) {
    return null;
  }
  const UserRatings = () => {
    const rows = [];
    for (let i = 1; i < myRatings + 1; i++) {
      rows.push(
        <MaterialIcons name="star-rate" size={20} color="white" key={i} />
      );
    }
    for (let i = myRatings + 1; i < 6; i++) {
      rows.push(
        <MaterialIcons name="star-outline" size={20} color="white" key={i} />
      );
    }
    return rows;
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: COLORS.main }}
      >
        <ImageBackground
          source={require("../../assets/images/menu-bg-6.png")}
          style={{ padding: 20 }}
        >
          <Image
            source={
              userInfo.photo
                ? { uri: userInfo.photo }
                : require("../../assets/images/user-profile.jpg")
            }
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              marginBottom: 10,
            }}
          />
          <Text
            style={{ color: "white", fontSize: 20, fontFamily: "Montserrat" }}
          >
            {userInfo.fullName ? userInfo.fullName : "name not set"}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: 120,
            }}
          >
            {myRatings ? <UserRatings /> : <Text>Calculating</Text>}
          </View>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: "white", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          padding: 20,
          borderTopColor: "#ccc",
          borderTopWidth: 1,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <MaterialIcons name="messenger-outline" size={20} />
            <Text
              style={{
                fontFamily: "Montserrat",
                fontSize: 20,
                marginLeft: 10,
              }}
            >
              Rate US
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <MaterialIcons name="logout" size={20} />
            <Text
              style={{
                fontFamily: "Montserrat",
                fontSize: 20,
                marginLeft: 10,
              }}
            >
              Logout
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={{ color: "#ccc", textAlign: "center" }}>
          copyright@2022
        </Text>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({});
