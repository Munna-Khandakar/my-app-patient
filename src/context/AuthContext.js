import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useEffect } from "react";
import { PROXY_URL } from "@env";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState();
  const [image, setImage] = useState("");
  const [operationId, setOperationId] = useState(null);
  const [ukilRequestStatus, setUkilRequestStatus] = useState("make"); // make  wait  payment
  useEffect(() => {
    isLoggedIn();
  }, []);

  async function saveSecureData(key, value) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.log("error during saving SecureStore...");
      console.log(error);
    }
  }

  saveUserInfoAsyncStorage = async (value) => {
    try {
      setUserInfo(value);
      await AsyncStorage.setItem("userInfo", JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (mobile, password) => {
    setIsLoading(true);
    try {
      const user = await axios.post(`${PROXY_URL}/api/auth/login`, {
        mobile,
        password,
      });
      const token = await user.data.token;
      const userInfo = await axios.get(`${PROXY_URL}/api/auth/profile`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUserInfo(userInfo.data);
      setUserToken(token);
      saveUserInfoAsyncStorage(userInfo.data);
      saveSecureData("userToken", token);
      setIsLoading(false);
      console.log("user info saved....");
    } catch (error) {
      console.log(error);
    }
  };

  // logout | clear user token | clear user info
  const logout = () => {
    setIsLoading(true);
    setUserInfo(null);
    AsyncStorage.removeItem("userInfo");
    setUserToken(null);
    SecureStore.deleteItemAsync("userToken");
    setIsLoading(false);
  };

  // checking user is logged in or not
  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = JSON.parse(await AsyncStorage.getItem("userInfo"));
      setUserInfo(userInfo);

      let ukilRequestStatus = await AsyncStorage.getItem("ukilRequestStatus");
      if (!ukilRequestStatus) setUkilRequestStatus("make");
      setUkilRequestStatus(ukilRequestStatus);

      let operationId = JSON.parse(await AsyncStorage.getItem("operationId"));
      setOperationId(operationId);

      let userToken = await SecureStore.getItemAsync("userToken");
      setUserToken(userToken);

      setIsLoading(false);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        setIsLoading(false);
        return alert("Something went wrong..");
      }
    }
  };

  // user registration
  const registration = async (verified, mobile, password) => {
    setIsLoading(true);
    if (!verified && !mobile) {
      setIsLoading(false);
      return alert("Please verify your phone number firse");
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
          navigation.navigate("LoginScreen");
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.error);
          setIsLoading(false);
          return alert(error.response.data.error);
        }
      });
  };

  const updateProfile = async (data) => {
    setIsLoading(true);
    try {
      const resp = await axios.put(`${PROXY_URL}/api/users/profile`, data, {
        headers: {
          "Content-type": "Application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (resp.data) {
        saveUserInfoAsyncStorage(resp.data.user);
        setIsLoading(false);
        return alert(resp.data.success);
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      return alert("Something went wrong...");
    }
  };

  const sendEmergencyCall = async (data) => {
    try {
      const resp = await axios.post(`${PROXY_URL}/api/emergency`, data, {
        headers: {
          "Content-type": "Application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (resp.data) {
        if (resp.data._id) {
          setUkilRequestStatus("wait");
          setOperationId(resp.data._id);
          await AsyncStorage.setItem("ukilRequestStatus", "wait");
          await AsyncStorage.setItem("operationId", resp.data._id);
          return null;
        } else {
          return alert(resp.data);
        }
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      return alert("Something went wrong...");
    }
  };

  const cancelEmergencyCall = async () => {
    try {
      const operationId = await AsyncStorage.getItem("operationId");
      console.log(operationId);
      const res = await axios.put(
        `${PROXY_URL}/api/users/cancel/operation/${operationId}`,
        { a: "a" },
        {
          headers: {
            "Content-type": "Application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (res) {
        setUkilRequestStatus("make");
        await AsyncStorage.setItem("ukilRequestStatus", "make");
        await AsyncStorage.removeItem("operationId");
        return alert(res.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfilePhoto = async (data) => {
    setIsLoading(true);
    try {
      console.log("auth context....");
      const resp = await axios.put(
        `${PROXY_URL}/api/users/profile/photo`,
        { photo: data },
        {
          headers: {
            "Content-type": "Application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (resp.data) {
        saveUserInfoAsyncStorage(resp.data.user);
        setIsLoading(false);
        return alert(resp.data.success);
      }
    } catch (err) {
      console.log("auth errpr");
      console.error(err);
      setIsLoading(false);
      return alert("Something went wrong...");
    }
  };

  const getMyRatings = async () => {
    try {
      const res = await axios.get(`${PROXY_URL}/api/users/myratings`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoading,
        registration,
        userInfo,
        userToken,
        updateProfile,
        sendEmergencyCall,
        ukilRequestStatus,
        setUkilRequestStatus,
        image,
        setImage,
        updateProfilePhoto,
        cancelEmergencyCall,
        getMyRatings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
