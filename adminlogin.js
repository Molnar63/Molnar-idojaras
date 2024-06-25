import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const AdminLoginForm = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigation = useNavigation();

  const handleChangeEmail = (text) => {
    setAdminEmail(text);
  };

  const handleChangePassword = (text) => {
    setAdminPassword(text);
  };

  const handleSubmit = async () => {
    if (!adminEmail || !adminPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const formData = {
      admin_email: adminEmail,
      admin_password: adminPassword,
    };

    try {
      const response = await fetch(
        "https://6024-93-87-144-71.ngrok-free.app/expo/adminlogin.php",
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
        const { success, message, admin_data } = responseBody;
        if (success) {
          const { admin_token } = admin_data;

          await AsyncStorage.setItem("admin_token", admin_token);

          setLoginSuccess(true);
          console.log("Admin Login Successful!");
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

  const handleNavigateToProfile = () => {
    navigation.navigate("admin");
  };

  return (
    <LinearGradient colors={["orange", "blue"]} style={styles.container}>
      <View style={styles.formContainer}>
        {loginSuccess ? (
          <>
            <Text style={styles.successMessage}>Admin Login successful!</Text>
            <TouchableOpacity
              onPress={handleNavigateToProfile}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Go to Admin Profile</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.heading}>Admin Login</Text>
            <Text style={styles.label}>Admin Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={adminEmail}
              onChangeText={handleChangeEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={styles.label}>Password:</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={adminPassword}
              onChangeText={handleChangePassword}
              secureTextEntry
            />
            {errorMessage !== "" && (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            )}
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
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
  errorMessage: {
    color: "red",
    marginBottom: 15,
  },
  successMessage: {
    color: "green",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default AdminLoginForm;
