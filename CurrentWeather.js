import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const CurrentWeather = ({ data }) => {
  const getClothingRecommendation = (temperature) => {
    if (temperature < 1) {
      return "❄️ It's very cold today, so we recommend a thick, warm coat, scarf, hat, and gloves. Don't forget insulated shoes and thick socks!";
    } else if (temperature >= 1 && temperature <= 10) {
      return "🌦️ The weather is cold, and layering is crucial. We suggest wearing a long-sleeved shirt or sweater. A coat can also be helpful to shield against the chilly breeze. A light scarf or shawl that can be easily removed if needed is practical.";
    } else if (temperature >= 11 && temperature <= 15) {
      return "🌤️ Mild weather is expected today. Dress in layers so you can adjust as it gets warmer, and don't forget the light coat. A scarf or hat can still be useful.";
    } else if (temperature >= 16 && temperature <= 20) {
      return "☀️ It's beautiful outside, with pleasant weather. Long pants and a sweater are recommended. Additionally, a thin coat or vest can come in handy.";
    } else if (temperature >= 21 && temperature <= 27) {
      return "🌞 It's nice and comfortably warm. Opt for lighter clothing, like shorts or a thin polo, with long pants. In the early morning or late evening, a sweater or vest might be advisable.";
    } else if (temperature >= 28 && temperature <= 32) {
      return "🔥 It's hot! It's best to wear loose, lightweight clothes, such as a breezy shirt or polo and shorts. Stay hydrated by drinking plenty of fluids.";
    } else {
      return "🏖️ Extreme heat! Wear light, loose clothing, like a swimsuit, a t-shirt, and a skirt or shorts. Always stay hydrated and avoid prolonged exposure to the sun!";
    }
  };

  return (
    <View style={styles.weather}>
      <View style={styles.top}>
        <View>
          <Text style={styles.city}>{data.city}</Text>
          <Text style={styles.weatherDescription}>
            {data.weather[0].description}
          </Text>
        </View>
        <Image
          source={{ uri: `icons/${data.weather[0].icon}.png` }}
          style={styles.weatherIcon}
        />
      </View>
      <Text style={styles.temperature}>{Math.round(data.main.temp)}°C</Text>
      <Text style={styles.clothingRecommendation}>
        {getClothingRecommendation(data.main.temp)}
      </Text>
      <View style={styles.details}>
        <View style={styles.parameterRow}>
          <Text style={styles.parameterLabel}>Details</Text>
        </View>
        <View style={styles.parameterRow}>
          <Text style={styles.parameterLabel}>Feels like</Text>
          <Text style={styles.parameterValue}>
            {Math.round(data.main.feels_like)}°C
          </Text>
        </View>
        <View style={styles.parameterRow}>
          <Text style={styles.parameterLabel}>Wind</Text>
          <Text style={styles.parameterValue}>{data.wind.speed} m/s</Text>
        </View>
        <View style={styles.parameterRow}>
          <Text style={styles.parameterLabel}>Humidity</Text>
          <Text style={styles.parameterValue}>{data.main.humidity}%</Text>
        </View>
        <View style={styles.parameterRow}>
          <Text style={styles.parameterLabel}>Pressure</Text>
          <Text style={styles.parameterValue}>{data.main.pressure} hPa</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weather: {
    width: "90%",
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 10, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
    backgroundColor: "#333",
    margin: 20,
    marginTop: 0,
    padding: 20,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  city: {
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 22,
    marginVertical: 0,
    letterSpacing: 1,
    color: "#fff",
  },
  weatherDescription: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 18,
    marginVertical: 0,
    color: "#fff",
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  temperature: {
    fontWeight: "600",
    fontSize: 70,
    letterSpacing: -5,
    marginVertical: 10,
    color: "#fff",
  },
  clothingRecommendation: {
    marginTop: 10,
    fontSize: 14,
    color: "#fff",
  },
  details: {
    width: "100%",
    paddingLeft: 20,
    marginTop: 20,
  },
  parameterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  parameterLabel: {
    textAlign: "left",
    fontWeight: "400",
    fontSize: 12,
    color: "#fff",
  },
  parameterValue: {
    textAlign: "right",
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
  },
});

export default CurrentWeather;
