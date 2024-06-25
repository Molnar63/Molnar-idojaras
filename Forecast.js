import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import Collapsible from "react-native-collapsible";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const windowWidth = Dimensions.get("window").width;

const Forecast = ({ data }) => {
  if (!data || !data.list) {
    return <Text style={styles.errorText}>No forecast data available</Text>;
  }

  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  const renderHeader = (item, index) => (
    <View style={styles.header}>
      <Text style={styles.headerText}>
        {forecastDays[index] || "Unknown Day"}
      </Text>
      <Text style={styles.headerText}>
        {item.weather && item.weather[0] && item.weather[0].description
          ? item.weather[0].description
          : "Unknown Weather"}
      </Text>
      <Text style={styles.headerText}>
        {item.main
          ? `${Math.round(item.main.temp_max)}°C / ${Math.round(
              item.main.temp_min
            )}°C`
          : "Unknown Temperature"}
      </Text>
    </View>
  );

  const renderContent = (item) => (
    <Collapsible collapsed={true}>
      <View style={styles.content}>
        <View style={styles.detailItem}>
          <Text>Pressure:</Text>
          <Text>{item.main ? item.main.pressure : "Unknown"}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text>Humidity:</Text>
          <Text>{item.main ? item.main.humidity : "Unknown"}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text>Clouds:</Text>
          <Text>{item.clouds ? `${item.clouds.all}%` : "Unknown"}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text>Wind speed:</Text>
          <Text>{item.wind ? `${item.wind.speed} m/s` : "Unknown"}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text>Sea level:</Text>
          <Text>{item.main ? `${item.main.sea_level}m` : "Unknown"}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text>Feels like:</Text>
          <Text>{item.main ? `${item.main.feels_like}°C` : "Unknown"}</Text>
        </View>
      </View>
    </Collapsible>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {data.list.slice(0, 7).map((item, idx) => (
        <View key={idx} style={styles.forecastItem}>
          {renderHeader(item, idx)}
          {renderContent(item)}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
  },
  forecastItem: {
    width: windowWidth * 0.9,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  header: {
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  content: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  errorText: {
    color: "red",
    alignSelf: "center",
    marginTop: 20,
  },
});

export default Forecast;
