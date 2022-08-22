import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const BannerSlider = ({ data }) => {
  return (
    <TouchableOpacity>
      <View
        style={{
          padding: 10,
          marginRight: 10,
          borderRadius: 5,
        }}
      >
        <Image
          key={data.image}
          source={data.image}
          style={{ height: 50, width: 60, borderRadius: 5 }}
        />
      </View>
      <Text style={{ fontSize: 10, fontWeight: "normal" }}>
        {data.title.substring(0, 18) + "..."}
      </Text>
    </TouchableOpacity>
  );
};

export default BannerSlider;

const styles = StyleSheet.create({});
