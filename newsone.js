import React from "react";
import { View, StyleSheet, Image, Text, ScrollView } from "react-native";

const NewsOne = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Image
          source={require("./newsimages/news1.png")}
          style={styles.image}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Is the electric car the future?</Text>
          <Text style={styles.articleText}>
            While many still doubt it today, the wave of electric driving has
            already begun. Even the previously acclaimed best car manufacturers
            have noticed this. Those who understand new technologies benefit the
            most from these revolutionary changes. For example, someone who can
            assemble an electric car is undoubtedly facing an enticing career.
            True, this is not the classic crash course model - an expert needs
            to acquire serious and extensive knowledge because they won't be
            playing with toy dolls, but with dangerous electrical devices.
            {"\n\n"}
            In the 21st century, there is a growing social awareness of
            environmental protection and sustainability, which has an impact on
            various industries, including the automotive industry. Choosing a
            career path in the automotive industry that pays off in terms of
            such commitment to green and sustainable solutions is rewarding.
            {"\n\n"}
            The proliferation of electric vehicles and the development of
            sustainable technologies create new opportunities for professionals
            in the automotive industry. The design, production, and maintenance
            of hybrid and electric cars can provide excellent career
            opportunities in areas focusing on the transition to green
            technologies.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  articleText: {
    fontSize: 16,
  },
});

export default NewsOne;
