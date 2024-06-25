import React from "react";
import { View, StyleSheet, Image, Text, ScrollView } from "react-native";

const NewsThree = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Image
          source={require("./newsimages/news3.png")}
          style={styles.image}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            Why do we name storms, and what is the basis for giving them names?
          </Text>
          <Text style={styles.articleText}>
            It might be confusing at times when experts refer to storms by their
            names. However, names like Katrina, Diane, Agnes, and others are not
            assigned randomly; naming storms has been a long-standing practice
            in meteorology.{"\n\n"}
            People have been naming storms since approximately the 1500s, often
            using the names of saints for this purpose. It is likely that storms
            occurring around the feast days of certain saints led to this
            tradition.{"\n\n"}
            The first official names for storms were assigned by Clement Wragge,
            who was born in Staffordshire but moved to Australia. He borrowed
            names from mythological figures in Greek and Roman mythology.
            However, the contemporary Australian government did not appreciate
            Wragge enough to appoint him as the director of the new
            meteorological office, a decision he took offense to. As a result,
            during this period, some storms were named after Australian
            politicians.{"\n\n"}
            The naming process was later taken over by the United States Air
            Force Hurricane Office in Miami in the late 1940s. Their system
            initially aligned with the military alphabet in use at the time,
            with storm names like Alpha, Bravo, Charlie, etc. However, this
            caused confusion in military information flow, as these letters were
            used in various contexts, leading to misunderstandings.{"\n\n"}
            In the 1950s, American meteorologists began using female names,
            simplifying and making information more accessible. Initially, only
            female names were used, but this practice did not last long.{"\n\n"}
            The problem wasn't just that it was offensive to exclusively assign
            destructive storms female names. People felt less fear when hearing
            kind-sounding female names. A 2014 study pointed out that storms and
            hurricanes with female names caused more casualties than their
            male-named counterparts, which could be attributed to this reason.
            {"\n\n"}
            As a result, male names were introduced into the rotation, giving
            rise to storms like Andrew, Gilbert, or Dorian (all of which
            incidentally developed into Category 5 hurricanes). There have been
            ongoing changes in naming conventions. The 2020 hurricane season
            generated a record number of hurricanes, causing experts to quickly
            run out of names allocated for that year. Subsequently, they began
            using the Greek alphabet, but this proved challenging to follow.
            Nowadays, experts predefine reserve names for each year to address
            this issue.
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

export default NewsThree;
