import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const Statistics = () => {
  const [viewedCities, setViewedCities] = useState([]);
  const [userCities, setUserCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchStatistics = async () => {
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
          "https://6024-93-87-144-71.ngrok-free.app/expo/statistics.php",
          {
            method: "GET",
            headers: {
              Authorization: adminToken,
            },
          }
        );

        const result = await response.json();

        if (result.success) {
          setViewedCities(result.viewed_cities);
          setUserCities(result.user_cities);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  const renderCityItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>City: {item.city}</Text>
      <Text style={styles.itemText}>View Count: {item.view_count}</Text>
    </View>
  );

  const renderUserCityItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>User Name: {item.user_name}</Text>
      <Text style={styles.itemText}>City: {item.city}</Text>
      <Text style={styles.itemText}>IP Address: {item.ip_address}</Text>
      <Text style={styles.itemText}>Device Type: {item.device_type}</Text>
      <Text style={styles.itemText}>Date: {item.date_time}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  return (
    <LinearGradient colors={["orange", "blue"]} style={styles.container}>
      <View style={styles.statisticsContainer}>
        <View style={styles.statisticsSection}>
          <Text style={styles.heading}>Viewed Cities Statistics</Text>
          <FlatList
            data={viewedCities}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderCityItem}
          />
        </View>
        <View style={styles.statisticsSection}>
          <Text style={styles.heading}>User-City Statistics</Text>
          <FlatList
            data={userCities}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderUserCityItem}
          />
        </View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("admin")}
        >
          <Text style={styles.backButtonText}>Back to the Admin Page</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statisticsContainer: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  statisticsSection: {
    height: "50%",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
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
  backButton: {
    marginTop: 20,
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  backButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Statistics;
