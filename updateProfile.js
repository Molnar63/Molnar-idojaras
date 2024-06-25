import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

const UpdateProfile = () => {
  const [userDetails, setUserDetails] = useState({
    user_id: "",
    user_name: "",
    user_email: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.log("Token not found. Redirecting to login.");
          return;
        }

        const response = await fetch(
          "https://c7db-93-87-144-71.ngrok-free.app/expo/profile.php",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          const { user_data } = result;
          setUserDetails({
            user_id: user_data.user_id,
            user_name: user_data.user_name,
            user_email: user_data.user_email,
          });
        } else {
          console.error(result.message);
          if (result.message === "Invalid or expired token.") {
            await AsyncStorage.removeItem("token");

            console.log("Token expired. Redirecting to login.");
          }
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (name, value) => {
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleUpdateProfile = async () => {
    if (!userDetails.user_name || !userDetails.user_email) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const formData = {
        user_id: userDetails.user_id,
        user_name: userDetails.user_name,
        user_email: userDetails.user_email,
      };

      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("Token not found. Redirecting to login.");
        return;
      }

      const response = await fetch(
        "https://6024-93-87-144-71.ngrok-free.app/expo/update_profile.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setMessage("Profile updated successfully!");
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setMessage(
        "An unexpected error occurred. Please try again or contact support."
      );
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  return (
    <LinearGradient colors={["orange", "blue"]} style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Update Profile</Text>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={userDetails.user_name}
          onChangeText={(text) => handleChange("user_name", text)}
        />
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={userDetails.user_email}
          onChangeText={(text) => handleChange("user_email", text)}
        />
        <TouchableOpacity onPress={handleUpdateProfile} style={styles.button}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
        {message !== "" && <Text style={styles.message}>{message}</Text>}
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
  message: {
    marginTop: 20,
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});

export default UpdateProfile;
