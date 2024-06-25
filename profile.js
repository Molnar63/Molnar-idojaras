import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailsSwitch, setDetailsSwitch] = useState(null);
  const [lastVisited, setLastVisited] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.log("Token not found. Redirecting to login.");
          navigation.navigate("login");
          return;
        }

        const profileResponse = await fetch(
          "https://6024-93-87-144-71.ngrok-free.app/expo/profile.php",
          {
            method: "GET",
            headers: {
              Authorization: token,
            },
          }
        );

        if (!profileResponse.ok) {
          throw new Error(`HTTP error! Status: ${profileResponse.status}`);
        }

        const profileResult = await profileResponse.json();

        if (profileResult.success) {
          setUserData(profileResult.user_data);

          // Fetch last visited
          const lastVisitedResponse = await fetch(
            "https://6024-93-87-144-71.ngrok-free.app/expo/profile.php",
            {
              method: "GET",
              headers: {
                Authorization: token,
              },
            }
          );
          if (!lastVisitedResponse.ok) {
            throw new Error(
              `HTTP error! Status: ${lastVisitedResponse.status}`
            );
          }
          const lastVisitedResult = await lastVisitedResponse.json();
          if (lastVisitedResult.success) {
            setLastVisited(lastVisitedResult.last_visited);
          } else {
            console.error(lastVisitedResult.message);
          }

          // Fetch user's options
          const optionsResponse = await fetch(
            "https://6024-93-87-144-71.ngrok-free.app/expo/getOptions.php",
            {
              method: "GET",
              headers: {
                Authorization: token,
              },
            }
          );
          if (!optionsResponse.ok) {
            throw new Error(`HTTP error! Status: ${optionsResponse.status}`);
          }
          const optionsResult = await optionsResponse.json();
          if (optionsResult.success) {
            setDetailsSwitch(optionsResult.detailsSwitch);
          } else {
            console.error(optionsResult.message);
          }

          // Fetch notifications
          const notificationsResponse = await fetch(
            "https://6024-93-87-144-71.ngrok-free.app/expo/shownotifications.php",
            {
              headers: {
                Authorization: token,
              },
            }
          );
          if (!notificationsResponse.ok) {
            throw new Error(
              `HTTP error! Status: ${notificationsResponse.status}`
            );
          }
          const notificationsResult = await notificationsResponse.json();
          if (notificationsResult.success) {
            setNotifications(notificationsResult.notifications);
          } else {
            console.error(notificationsResult.message);
          }
        } else {
          console.error(profileResult.message);
          if (profileResult.message === "Invalid or expired token.") {
            await AsyncStorage.removeItem("token");
            navigation.navigate("login");
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

  const handleRemoveFavorite = async (city) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("Token not found. Redirecting to login.");
        return;
      }

      const response = await fetch(
        `https://6024-93-87-144-71.ngrok-free.app/expo/removeFavorite.php?city=${city}`,
        {
          method: "DELETE",
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
        setUserData((prevUserData) => ({
          ...prevUserData,
          favorites: prevUserData.favorites.filter((fav) => fav !== city),
        }));
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  const handleSwitchToggle = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("Token not found. Redirecting to login.");
        return;
      }

      const newSwitchValue = detailsSwitch ? 0 : 1;

      const switchResponse = await fetch(
        "https://6024-93-87-144-71.ngrok-free.app/expo/updateSwitch.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ switchValue: newSwitchValue }),
        }
      );

      if (!switchResponse.ok) {
        throw new Error(`HTTP error! Status: ${switchResponse.status}`);
      }

      const switchResult = await switchResponse.json();
      if (switchResult.success) {
        setDetailsSwitch(newSwitchValue);
      } else {
        console.error(switchResult.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  const handleToggleNotifications = async (city) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("Token not found. Redirecting to login.");
        return;
      }

      const response = await fetch(
        "https://6024-93-87-144-71.ngrok-free.app/expo/turnoffnotifications.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ city: city }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        const notificationsResponse = await fetch(
          "https://6024-93-87-144-71.ngrok-free.app/expo/shownotifications.php",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const notificationsResult = await notificationsResponse.json();
        if (notificationsResult.success) {
          setNotifications(notificationsResult.notifications);
        } else {
          console.error(notificationsResult.message);
        }
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  const handleSnowNotifications = async (city) => {
    try {
      const response = await fetch(
        "https://6024-93-87-144-71.ngrok-free.app/expo/snownotifications.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: await AsyncStorage.getItem("token"),
          },
          body: JSON.stringify({ city: city }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        console.log("Snow notification added successfully!");
      } else {
        console.error(result.message);
        if (result.message === "Invalid or expired token.") {
          await AsyncStorage.removeItem("token");
          navigation.navigate("login");
        }
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : userData ? (
          <View>
            <Text style={styles.heading}>Welcome, {userData.user_name}!</Text>
            <Text>Email: {userData.user_email}</Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Favorites:</Text>
              {userData.favorites && userData.favorites.length > 0 ? (
                <FlatList
                  data={userData.favorites}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <View style={styles.favoriteItem}>
                      <Text>{item}</Text>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleRemoveFavorite(item)}
                      >
                        <Text>Remove</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleSnowNotifications(item)}
                      >
                        <Text>Turn on notifications</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              ) : (
                <Text>No favorites yet.</Text>
              )}
            </View>

            {detailsSwitch !== null && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Details are turned {detailsSwitch ? "off" : "on"}.
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleSwitchToggle}
                >
                  <Text>Toggle Switch</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Last Visited:</Text>
              {lastVisited && lastVisited.length > 0 ? (
                <FlatList
                  data={lastVisited}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <Text>
                      {item.city} - {item.date_time}
                    </Text>
                  )}
                />
              ) : (
                <Text>No last visited sites yet.</Text>
              )}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Notifications:</Text>
              {notifications && notifications.length > 0 ? (
                <FlatList
                  data={notifications}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.notificationItem}>
                      <Text>{item.city}</Text>
                      <Text>Status: {item.active ? "Active" : "Inactive"}</Text>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleToggleNotifications(item.city)}
                      >
                        <Text>{item.active ? "Turn Off" : "Turn On"}</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              ) : (
                <Text>No notifications yet.</Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.updateProfileBtn}
              onPress={() => navigation.navigate("updateProfile")}
            >
              <Text>Update your profile</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text>Error loading profile.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  section: {
    marginVertical: 10,
    width: "100%",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  favoriteItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  notificationItem: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: 5,
    marginTop: 5,
    minWidth: 120,
    alignItems: "center",
  },
  updateProfileBtn: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "lightgreen",
    borderRadius: 5,
    minWidth: 180,
    alignItems: "center",
  },
});

export default Profile;
