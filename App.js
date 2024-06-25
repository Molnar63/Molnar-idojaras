import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WeatherNews from "./WeatherNews";
import NewsOne from "./newsone";
import NewsTwo from "./newstwo";
import NewsThree from "./newsthree";
import TimeApp from "./time";
import Weather from "./weather";
import RegistrationForm from "./registration";
import LoginForm from "./login";
import Profile from "./profile";
import Logout from "./logout";
import UpdateProfile from "./updateProfile";
import PasswordRecovery from "./passwordRecovery";
import { LinearGradient } from "expo-linear-gradient";
import AdminLoginForm from "./adminlogin";
import AdminProfile from "./admin";
import Statistics from "./statistics";

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        setIsLoggedIn(!!token);
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();

    const unsubscribe = navigation.addListener("focus", checkLoginStatus);
    return unsubscribe;
  }, [navigation]);

  return (
    <LinearGradient colors={["orange", "blue"]} style={styles.container}>
      <Text style={styles.emoji}>🌞🌦️❄️</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("WeatherNews")}
      >
        <Text style={styles.buttonText}>Weather News</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("time")}
      >
        <Text style={styles.buttonText}>Time</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("weather")}
      >
        <Text style={styles.buttonText}>Weather</Text>
      </TouchableOpacity>
      {!isLoggedIn && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("registration")}
        >
          <Text style={styles.buttonText}>Registration</Text>
        </TouchableOpacity>
      )}
      {!isLoggedIn && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("login")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("profile")}
      >
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>
      {isLoggedIn && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("logout")}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Weather App" component={HomeScreen} />
        <Stack.Screen name="WeatherNews" component={WeatherNews} />
        <Stack.Screen name="newsone" component={NewsOne} />
        <Stack.Screen name="newstwo" component={NewsTwo} />
        <Stack.Screen name="newsthree" component={NewsThree} />
        <Stack.Screen name="time" component={TimeApp} />
        <Stack.Screen name="weather" component={Weather} />
        <Stack.Screen name="registration" component={RegistrationForm} />
        <Stack.Screen name="login" component={LoginForm} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="logout" component={Logout} />
        <Stack.Screen name="updateProfile" component={UpdateProfile} />
        <Stack.Screen name="passwordRecovery" component={PasswordRecovery} />
        <Stack.Screen name="adminlogin" component={AdminLoginForm} />
        <Stack.Screen name="admin" component={AdminProfile} />
        <Stack.Screen name="statistics" component={Statistics} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderRadius: 10,
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});

export default App;
