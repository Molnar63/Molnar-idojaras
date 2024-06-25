import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const WeatherNews = ({ navigation }) => {
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <LinearGradient colors={["orange", "blue"]} style={styles.container}>
      <TouchableOpacity
        style={styles.newsContainer}
        onPress={() => navigateToScreen("newsone")}
      >
        <Image
          source={require("./newsimages/news1.png")}
          style={styles.image}
        />
        <View style={styles.newsContent}>
          <Text style={styles.title}>Is the electric car the future?</Text>
          <Text>
            While many still doubt it today, the wave of electric driving has
            already begun.
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.newsContainer}
        onPress={() => navigateToScreen("newstwo")}
      >
        <Image
          source={require("./newsimages/news2.png")}
          style={styles.image}
        />
        <View style={styles.newsContent}>
          <Text style={styles.title}>
            London slowly becomes vulnerable to intense waves
          </Text>
          <Text>
            Serious flood protection system must be in place to keep the city
            center safe from storm surges.
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.newsContainer}
        onPress={() => navigateToScreen("newsthree")}
      >
        <Image
          source={require("./newsimages/news3.png")}
          style={styles.image}
        />
        <View style={styles.newsContent}>
          <Text style={styles.title}>
            Why do we name storms, and what is the basis for giving them names?
          </Text>
          <Text>
            Might be confusing at times when experts refer to storms by their
            names.
          </Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  newsContainer: {
    flexDirection: "row",
    width: "90%",
    height: 150,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  image: {
    width: "50%",
    height: "100%",
    resizeMode: "cover",
  },
  newsContent: {
    width: "50%",
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default WeatherNews;
