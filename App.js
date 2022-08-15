import { useFonts } from "expo-font";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function MainScreen({ navigation }) {
  const [loaded] = useFonts({
    Montserrat: require("./assets/fonts/Montserrat.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 50 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "#20315f" }}>
          GAMEON
        </Text>
      </View>
      <Image
        style={{ height: "40%", width: "90%", resizeMode: "stretch" }}
        source={require("./assets/images/misc/gaming.png")}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "#AD40AF",
          padding: 20,
          width: "90%",
          borderRadius: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
        onPress={() => navigation.navigate("Home")}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
            fontFamily: "Montserrat",
          }}
        >
          Let's Begin
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export default App;
