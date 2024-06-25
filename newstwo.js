import React from "react";
import { View, StyleSheet, Image, Text, ScrollView } from "react-native";

const NewsTwo = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Image
          source={require("./newsimages/news2.png")}
          style={styles.image}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            London slowly becomes vulnerable to intense waves
          </Text>
          <Text style={styles.articleText}>
            London is one of the world's most well-known cities; however, few
            are aware that a serious flood protection system must be in place to
            keep the city center safe from storm surges.
          </Text>
          <Text style={styles.articleText}>
            The necessity of the barrier system, known as the Thames Barrier,
            was unquestionable because the river has a wide estuary where wave
            heights can reach significant proportions during storms. The
            construction of the barrier began in 1974 with this in mind.
          </Text>
          <Text style={styles.articleText}>
            It was completed in 1984, and since then, the system has faithfully
            guarded London's peace. With a width of 520 meters, it is the
            largest flood protection system of its kind, safeguarding
            approximately 325 square kilometers of the capital. However, there
            is a slight issue.
          </Text>
          <Text style={styles.articleText}>
            During its planning, experts did not account for the climate
            catastrophe taking such rapid and extensive proportions, resulting
            in a rapid increase in sea levels. Consequently, the barrier system
            will not be able to effectively mitigate incoming intense waves for
            much longer, especially considering that climate change not only
            raises sea levels but also significantly intensifies storms.
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
    marginBottom: 10,
  },
});

export default NewsTwo;
