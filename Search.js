import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { geoApiOptions, GEO_API_URL } from "./api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const [isListVisible, setIsListVisible] = useState(true);
  const [error, setError] = useState(null);

  const handleSearch = (inputValue) => {
    setSearch(inputValue);

    if (inputValue.trim().length < 2) {
      setOptions([]);
      return;
    }

    fetch(
      `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${encodeURIComponent(
        inputValue.trim()
      )}`,
      geoApiOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch city data");
        }
        return response.json();
      })
      .then((response) => {
        if (response && response.data) {
          const newOptions = response.data.map((city) => ({
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          }));
          setOptions(newOptions);
          setError(null);
        } else {
          setOptions([]);
          setError("No cities found");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setOptions([]);
        setError("Failed to fetch city data");
      });
  };

  const handleSelectOption = (selectedItem) => {
    setSearch(selectedItem.label);
    onSearchChange(selectedItem);
    setIsListVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectOption(item)}>
      <Text style={styles.option}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={handleSearch}
        placeholder="Search for city"
        placeholderTextColor="#888"
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      {isListVisible && (
        <FlatList
          style={styles.list}
          data={options}
          renderItem={renderItem}
          keyExtractor={(item) => item.value}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 5,
    width: "80%",
    maxWidth: 300,
  },
  input: {
    fontSize: 14,
    paddingVertical: 6,
    paddingHorizontal: 8,
    color: "#333",
    marginBottom: 6,
  },
  list: {
    maxHeight: 200,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default Search;
