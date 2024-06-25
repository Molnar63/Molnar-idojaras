import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const RegistrationForm = () => {
  const [user_name, setUserName] = useState("");
  const [user_password, setUserPassword] = useState("");
  const [user_email, setUserEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const navigation = useNavigation();

  const handleChange = (name, value) => {
    if (name === "user_name") {
      setUserName(value);
    } else if (name === "user_password") {
      setUserPassword(value);
    } else if (name === "user_email") {
      setUserEmail(value);
    }
  };

  const handleSubmit = async () => {
    const formData = {
      user_name,
      user_password,
      user_email,
    };

    try {
      const response = await fetch(
        "https://6024-93-87-144-71.ngrok-free.app/expo/registration.php",
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
        const { success, message } = responseBody;
        if (success) {
          setRegistrationSuccess(true);
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
      {registrationSuccess ? (
        <Text style={styles.success}>
          Registration successful! Check your email for confirmation.
        </Text>
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.heading}>Create an account</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => handleChange("user_name", text)}
            value={user_name}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => handleChange("user_password", text)}
            value={user_password}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => handleChange("user_email", text)}
            value={user_email}
            autoCapitalize="none"
            keyboardType="email-address"
            autoCompleteType="email"
          />
          {errorMessage ? (
            <Text style={styles.error}>{errorMessage}</Text>
          ) : null}
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Text style={styles.loginLink}>
              Already have an account? Login here
            </Text>
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    width: "100%",
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
  loginLink: {
    marginTop: 20,
    textAlign: "center",
  },
});

export default RegistrationForm;
