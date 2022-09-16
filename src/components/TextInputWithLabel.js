import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import COLORS from "../utils/Colors";
const TextInputWithLabel = ({
  label,
  icon,
  value,
  setValue,
  keyboardType,
  editPermission,
}) => {
  return (
    <View>
      <Text
        style={{
          fontFamily: "Roboto-Medium",
          fontSize: 15,
          color: COLORS.iconColor,
          fontWeight: "bold",
        }}
      >
        {label}
      </Text>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          paddingBottom: 8,
          marginBottom: 25,
        }}
      >
        {icon}
        <TextInput
          placeholder={label}
          style={{ flex: 1, paddingVertical: 0, marginLeft: 2 }}
          keyboardType={keyboardType ? keyboardType : "default"}
          value={value}
          onChangeText={(number) => setValue(number)}
          editable={editPermission}
          selectTextOnFocus={editPermission}
        />
      </View>
    </View>
  );
};

export default TextInputWithLabel;

const styles = StyleSheet.create({});
