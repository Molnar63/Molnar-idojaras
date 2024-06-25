import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

const LoginForm = () => {
  const [user_email, setUserEmail] = useState("");
  const [user_password, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const navigation = useNavigation();

  const handleChange = (name, value) => {
    if (name === "user_email") {
      setUserEmail(value);
    } else if (name === "user_password") {
      setUserPassword(value);
    }
  };

  const handleSubmit = async () => {
    const formData = {
      user_email,
      user_password,
    };

    try {
      const response = await fetch(
        "https://6024-93-87-144-71.ngrok-free.app/expo/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const responseBody = await response.json();

      if (response.ok) {
        const { success, message, user_data } = responseBody;
        if (success) {
          const { token } = user_data;

          await AsyncStorage.setItem("token", token);
          setLoginSuccess(true);
          console.log("Login Successful!");

          navigation.navigate("profile");
        } else {
          setErrorMessage(message);
        }
      } else {
        console.error(
          `Server error: ${response.status} - ${response.statusText}`
        );
        setErrorMessage(
          "Failed to communicate with the server. Please try again later."
        );
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setErrorMessage(
        "An unexpected error occurred. Please try again or contact support."
      );
    }
  };

  return (
    <LinearGradient colors={["orange", "blue"]} style={styles.container}>
      {loginSuccess ? (
        <Text style={styles.success}>Login successful!</Text>
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.heading}>Login</Text>
          <Text style={styles.label}>User Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => handleChange("user_email", text)}
            value={user_email}
            autoCapitalize="none"
            keyboardType="email-address"
            autoCompleteType="email"
          />
          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => handleChange("user_password", text)}
            value={user_password}
            secureTextEntry={true}
          />
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
          {errorMessage ? (
            <Text style={styles.error}>{errorMessage}</Text>
          ) : null}
          <TouchableOpacity
            onPress={() => navigation.navigate("passwordRecovery")}
          >
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("adminlogin")}>
            <Text style={styles.forgotPasswordText}>ADMIN LOGIN</Text>
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    color: "#333",
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    width: "100%",
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  success: {
    color: "green",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  error: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  forgotPasswordText: {
    marginTop: 10,
    color: "#007bff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default LoginForm;
