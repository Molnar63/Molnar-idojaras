import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const AdminProfile = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const adminToken = await AsyncStorage.getItem("admin_token");
        if (!adminToken) {
          Alert.alert("Session expired", "Redirecting to login.", [
            {
              text: "OK",
              onPress: () => navigation.navigate("AdminLogin"),
            },
          ]);
          return;
        }

        const response = await fetch(
          "https://6024-93-87-144-71.ngrok-free.app/expo/admin.php",
          {
            method: "GET",
            headers: {
              Authorization: adminToken,
            },
          }
        );

        const result = await response.json();

        if (result.success) {
          setAdminData(result.admin_data);
          await fetchUsers(adminToken);
        } else {
          console.error(result.message);
          if (result.message === "Invalid or expired token.") {
            await AsyncStorage.removeItem("admin_token");
            Alert.alert("Session expired", "Redirecting to login.", [
              {
                text: "OK",
                onPress: () => navigation.navigate("AdminLogin"),
              },
            ]);
          }
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUsers = async (adminToken) => {
      try {
        const response = await fetch(
          "https://6024-93-87-144-71.ngrok-free.app/expo/getUsers.php",
          {
            method: "GET",
            headers: {
              Authorization: adminToken,
            },
          }
        );

        const result = await response.json();

        if (result.success) {
          setUsers(result.users);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    };

    fetchAdminProfile();
  }, []);

  const handleRemoveUser = async (userId) => {
    try {
      const adminToken = await AsyncStorage.getItem("admin_token");
      const response = await fetch(
        `https://6024-93-87-144-71.ngrok-free.app/expo/removeUser.php?user_id=${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: adminToken,
          },
        }
      );

      const result = await response.json();

      if (result.success) {
        await fetchUsers(adminToken);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  const handleActivateUser = async (userId) => {
    try {
      const adminToken = await AsyncStorage.getItem("admin_token");

      if (!adminToken) {
        Alert.alert("Session expired", "Redirecting to login.", [
          {
            text: "OK",
            onPress: () => navigation.navigate("AdminLogin"),
          },
        ]);
        return;
      }

      const response = await fetch(
        `https://6024-93-87-144-71.ngrok-free.app/expo/deactivateUser.php`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: adminToken,
          },
          body: JSON.stringify({
            user_id: userId,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        await fetchUsers(adminToken);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  const handleNavigateToStatistics = () => {
    navigation.navigate("statistics");
  };

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  return (
    <LinearGradient colors={["orange", "blue"]} style={styles.container}>
      <View style={styles.formContainer}>
        {adminData ? (
          <View>
            <Text style={styles.heading}>Welcome, {adminData.admin_name}!</Text>
            <Text style={styles.label}>Email: {adminData.admin_email}</Text>
            <Text style={styles.subHeading}>Users:</Text>
            <FlatList
              data={users}
              keyExtractor={(item) => item.user_id.toString()}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <Text style={styles.itemText}>ID: {item.user_id}</Text>
                  <Text style={styles.itemText}>Name: {item.user_name}</Text>
                  <Text style={styles.itemText}>Email: {item.user_email}</Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveUser(item.user_id)}
                    style={styles.removeButton}
                  >
                    <Text style={styles.buttonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
            <Text style={styles.subHeading}>User Activation/Deactivation:</Text>
            <FlatList
              data={users}
              keyExtractor={(item) => item.user_id.toString()}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <Text style={styles.itemText}>ID: {item.user_id}</Text>
                  <Text style={styles.itemText}>Name: {item.user_name}</Text>
                  <Text style={styles.itemText}>Email: {item.user_email}</Text>
                  <TouchableOpacity
                    onPress={() => handleActivateUser(item.user_id)}
                    style={styles.activateButton}
                  >
                    <Text style={styles.buttonText}>
                      {item.activated ? "Deactivate" : "Activate"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
            <TouchableOpacity
              style={styles.navigateButton}
              onPress={handleNavigateToStatistics}
            >
              <Text style={styles.buttonText}>Go to Statistics</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.errorMessage}>Error loading profile.</Text>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  listItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    width: "100%",
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  removeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  activateButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  navigateButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorMessage: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});

export default AdminProfile;
