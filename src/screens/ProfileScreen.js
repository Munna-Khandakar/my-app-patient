import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import COLORS from "../utils/Colors";
import { CLOUDINARY_NAME, CLOUDINARY_PRESET } from "@env";
import { useFonts } from "expo-font";
import React, { useState, useContext } from "react";
import {
  MaterialIcons,
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
  Fontisto,
  FontAwesome5,
} from "@expo/vector-icons";
import { PROXY_URL } from "@env";
import { AuthContext } from "../context/AuthContext";
import SelectList from "react-native-dropdown-select-list";
import TextInputWithLabel from "../components/TextInputWithLabel";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = ({ navigation }) => {
  const [loaded] = useFonts({
    "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
    Montserrat: require("../../assets/fonts/Montserrat.ttf"),
  });

  const {
    userInfo,
    isLoading,
    updateProfile,
    updateProfilePhoto,
    image,
    setImage,
  } = useContext(AuthContext);
  const [mobile, setMobile] = useState(userInfo.mobile);
  const [fullName, setFullName] = useState(userInfo.fullName);
  const [designation, setDesignation] = useState(userInfo.designation);
  const [editStatus, setEditStatus] = useState(false);
  const [zilla, setZilla] = useState("Dhaka");
  const [upzilla, setUpzilla] = useState("");
  const [thana, setThana] = useState("");
  const [email, setEmail] = useState(userInfo.email);
  const [nid, setNid] = useState(userInfo.nid);
  const [presentAddressDetails, setPresentAddressDetails] = useState(
    userInfo.presentAddressDetails
  );
  const [permanentAddressDetails, setPermanentAddressDetails] = useState(
    userInfo.permanentAddressDetails
  );

  const zillaList = [
    { key: "1", value: "Dhaka" },
    { key: "2", value: "Rajshahi" },
    { key: "3", value: "Bogura" },
    { key: "4", value: "Rangpur" },
  ];
  const upzillaList = [
    { key: "1", value: "Sarda" },
    { key: "2", value: "Palashbari" },
    { key: "3", value: "Gobindogonj" },
    { key: "4", value: "Chapai" },
  ];

  const thanaList = [
    { key: "1", value: "Sarda" },
    { key: "2", value: "Palashbari" },
    { key: "3", value: "Gobindogonj" },
    { key: "4", value: "Chapai" },
  ];

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      //updateProfilePhoto(result.uri);
      let base64Img = `data:image/jpg;base64,${result.base64}`;

      //Add your cloud name
      let apiUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`;

      let data = {
        file: base64Img,
        upload_preset: `${CLOUDINARY_PRESET}`,
      };

      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      })
        .then(async (r) => {
          let data = await r.json();
          updateProfilePhoto(data.secure_url);
          return null;
        })
        .catch((err) => console.log(err));
    }
  };

  const submitFormHandler = async () => {
    let data = {
      fullName,
      email,
      nid,
      presentAddressDetails,
      permanentAddressDetails,
      designation,
    };
    setEditStatus(false);
    updateProfile(data);
  };

  if (userInfo === null) {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={"large"} />
    </View>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ padding: 20 }}>
        <TouchableOpacity onPress={pickImage}>
          <View
            style={{
              borderColor: COLORS.main,
              borderWidth: 2,
              borderRadius: 100,
              width: 110,
              height: 110,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginBottom: 20,
            }}
          >
            <Image
              source={
                userInfo.photo
                  ? { uri: userInfo.photo }
                  : require("../../assets/images/user-profile.jpg")
              }
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginRight: 5,
            alignSelf: "flex-end",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
          onPress={() => setEditStatus(!editStatus)}
        >
          <FontAwesome name="edit" size={20} color="#666" />
          <Text style={{ marginLeft: 10 }}>Edit</Text>
        </TouchableOpacity>
        <TextInputWithLabel
          label="Full Name"
          icon={
            <MaterialIcons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={fullName}
          setValue={setFullName}
          editPermission={editStatus}
        />
        <TextInputWithLabel
          label="Mobile"
          editPermission={editStatus}
          icon={
            <MaterialIcons
              name="phone"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={userInfo.mobile}
          setValue={setMobile}
          keyboardType="phone-pad"
        />
        <TextInputWithLabel
          editPermission={editStatus}
          label="Email"
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={email}
          setValue={setEmail}
          keyboardType="email-address"
        />
        <TextInputWithLabel
          editPermission={editStatus}
          label="Designation"
          icon={
            <FontAwesome5
              name="id-card-alt"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={designation}
          setValue={setDesignation}
          keyboardType="email-address"
        />
        <TextInputWithLabel
          label="NID"
          editPermission={editStatus}
          icon={
            <AntDesign
              name="idcard"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={nid}
          setValue={setNid}
          keyboardType="phone-pad"
        />

        {/* present address  */}
        {/* <Text
          style={{
            fontFamily: "Roboto-Medium",
            fontSize: 15,
            color: COLORS.iconColor,
            fontWeight: "bold",
          }}
        >
          Present Address
        </Text>
        <View style={{ marginBottom: 20 }}>
          <SelectList
            placeholder="Zilla"
            setSelected={setZilla}
            data={zillaList}
            arrowicon={
              <FontAwesome
                name="chevron-down"
                size={12}
                color={COLORS.iconColor}
              />
            }
            // search={false}
            searchicon={
              <FontAwesome name="search" size={12} color={COLORS.iconColor} />
            }
            //  onSelect={() => alert(selected)}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <SelectList
            placeholder="Upzilla"
            setSelected={setUpzilla}
            data={upzillaList}
            arrowicon={
              <FontAwesome
                name="chevron-down"
                size={12}
                color={COLORS.iconColor}
              />
            }
            // search={false}
            searchicon={
              <FontAwesome name="search" size={12} color={COLORS.iconColor} />
            }
            // search={false}
            //onSelect={() => alert(selected)}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <SelectList
            placeholder="Thana"
            setSelected={setThana}
            data={thanaList}
            arrowicon={
              <FontAwesome
                name="chevron-down"
                size={12}
                color={COLORS.iconColor}
              />
            }
            // search={false}
            searchicon={
              <FontAwesome name="search" size={12} color={COLORS.iconColor} />
            }
            // search={false}
            //  onSelect={() => alert(selected)}
          />
        </View> */}
        <TextInputWithLabel
          label="Present Address Details"
          editPermission={editStatus}
          icon={
            <MaterialCommunityIcons
              name="home-city-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={presentAddressDetails}
          setValue={setPresentAddressDetails}
        />

        {/* permanent address  */}
        {/* <Text
          style={{
            fontFamily: "Roboto-Medium",
            fontSize: 15,
            color: COLORS.iconColor,
            fontWeight: "bold",
          }}
        >
          Permanent Address
        </Text>
        <View style={{ marginBottom: 20 }}>
          <SelectList
            placeholder="Zilla"
            setSelected={setZilla}
            data={zillaList}
            arrowicon={
              <FontAwesome
                name="chevron-down"
                size={12}
                color={COLORS.iconColor}
              />
            }
            // search={false}
            searchicon={
              <FontAwesome name="search" size={12} color={COLORS.iconColor} />
            }
            //  onSelect={() => alert(selected)}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <SelectList
            placeholder="Upzilla"
            setSelected={setUpzilla}
            data={upzillaList}
            arrowicon={
              <FontAwesome
                name="chevron-down"
                size={12}
                color={COLORS.iconColor}
              />
            }
            // search={false}
            searchicon={
              <FontAwesome name="search" size={12} color={COLORS.iconColor} />
            }
            // search={false}
            //onSelect={() => alert(selected)}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <SelectList
            placeholder="Thana"
            setSelected={setThana}
            data={thanaList}
            arrowicon={
              <FontAwesome
                name="chevron-down"
                size={12}
                color={COLORS.iconColor}
              />
            }
            // search={false}
            searchicon={
              <FontAwesome name="search" size={12} color={COLORS.iconColor} />
            }
            // search={false}
            //  onSelect={() => alert(selected)}
          />
        </View> */}
        <TextInputWithLabel
          label="Permanent Address Details"
          editPermission={editStatus}
          icon={
            <Fontisto
              name="holiday-village"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={permanentAddressDetails}
          setValue={setPermanentAddressDetails}
        />

        {!editStatus ? (
          <TouchableOpacity disabled={true}>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "700",
                color: "white",
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={submitFormHandler}
            style={{
              flex: 1,
              backgroundColor: COLORS.main,
              padding: 20,
              borderRadius: 10,
              marginBottom: 30,
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
                Save
              </Text>
            )}
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
