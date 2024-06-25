import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Clock = ({ Country, Timezone, Offset, removeClick }) => {
  const [time, setTime] = useState(getCurrentTime());

  useEffect(() => {
    const intervalID = setInterval(() => tick(), 1000);
    return () => clearInterval(intervalID);
  }, []);

  function getCurrentTime() {
    let today = new Date();
    today.setMinutes(
      today.getMinutes() + today.getTimezoneOffset() + parseInt(Offset)
    );
    return today.toLocaleString();
  }

  function tick() {
    setTime(getCurrentTime());
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={removeClick} style={styles.closeButton}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>
        <Text style={styles.countryText}>{Country}</Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{time}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.timezoneText}>{Timezone}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  closeButton: {
    backgroundColor: "#f00",
    padding: 5,
    borderRadius: 15,
  },
  closeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  countryText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  timeContainer: {
    marginTop: 10,
  },
  timeText: {
    fontSize: 16,
  },
  footer: {
    marginTop: 10,
  },
  timezoneText: {
    fontSize: 14,
    fontStyle: "italic",
  },
});

export default Clock;
