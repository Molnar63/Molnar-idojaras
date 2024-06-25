import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const PasswordRecovery = () => {
  const [user_email, setUserEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [mailSuccess, setMailSuccess] = useState(false);

  const navigation = useNavigation();

  const handleChange = (name, value) => {
    if (name === "user_email") {
      setUserEmail(value);
    }
  };

  const handleSubmit = async () => {
    const formData = {
      user_email,
    };

    try {
      const response = await fetch(
        "https://6024-93-87-144-71.ngrok-free.app/expo/forgotpw.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const responseBody = await response.text();

      if (response.ok) {
        const result = JSON.parse(responseBody);
        if (result.success) {
          setMailSuccess(true);
        } else {
          setErrorMessage(result.message);
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
      {mailSuccess ? (
        <Text style={styles.success}>Mail sending successful</Text>
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.heading}>Forgot Password?</Text>
          <Text style={styles.label}>User Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => handleChange("user_email", text)}
            value={user_email}
            autoCapitalize="none"
            keyboardType="email-address"
            autoCompleteType="email"
            required
          />
          {errorMessage ? (
            <Text style={styles.error}>{errorMessage}</Text>
          ) : null}
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Send Email</Text>
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
    marginTop: 20,
  },
  error: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});

export default PasswordRecovery;
