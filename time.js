import { View, Text, StyleSheet } from "react-native";
import timezone from "./timezone.json";
import Clock from "./clock";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";

const TimeApp = () => {
  const [selectedClock, setSelectedClock] = useState(null);

  const addTimeZone = () => {
    if (selectedClock) {
      let zone = timezone.find((k) => k.Timezone === selectedClock);
      return (
        <Clock
          {...zone}
          key={zone.Timezone}
          removeClick={() => setSelectedClock(null)}
        />
      );
    }
    return null;
  };

  const optionItems = timezone.map((zone) => (
    <Picker.Item
      label={`${zone.Country}-${zone.Timezone}`}
      value={zone.Timezone}
      key={zone.Timezone}
    />
  ));

  return (
    <LinearGradient colors={["orange", "blue"]} style={styles.container}>
      <View style={styles.selectContainer}>
        <Picker
          selectedValue={selectedClock}
          onValueChange={(itemValue) => setSelectedClock(itemValue)}
        >
          <Picker.Item label="Select a time zone" value="" disabled />
          {optionItems}
        </Picker>
      </View>
      <View style={styles.clockContainer}>{addTimeZone()}</View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  selectContainer: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
    padding: 5,
  },
  clockContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
});

export default TimeApp;
