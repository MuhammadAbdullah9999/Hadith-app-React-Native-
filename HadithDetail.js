import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

const HadithDetail = () => {
  const route = useRoute();
  const hadithNumber = route.params?.hadithNumber;
  const bookId = route.params?.bookId;

  const [hadith, setHadith] = useState([]);
  const [arabicHadith, setArabicHadith] = useState([]);
  const [urduHadith, setUrduHadith] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseArabic = await axios.get(
          `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-${bookId}/${hadithNumber}.json`
        );
        setArabicHadith(responseArabic.data.hadiths);

        const responseUrdu = await axios.get(
          `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/urd-${bookId}/${hadithNumber}.json`
        );
        setUrduHadith(responseUrdu.data.hadiths);

        setHadith(responseArabic.data);
      } catch (error) {
        console.error("Error fetching Hadith:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [hadithNumber]);

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#3498db" />
      ) : (
        <View>
          <Text style={styles.heading}>{hadith.metadata.name}</Text>
          <Text style={styles.section}>
            {hadith.metadata.section[hadith.hadiths[0].reference.book]}
          </Text>
          <Text style={styles.hadithNumber}>Hadith: {hadith.hadiths[0].hadithnumber}</Text>
          <Text style={styles.arabicText}>{arabicHadith[0].text}</Text>
          <Text style={styles.translationText}>Urdu Translation:</Text>
          <Text style={styles.urduText}>{urduHadith[0].text}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    // padding: 20,
    margin: 20,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#3498db",
  },
  section: {
    fontSize: 20,
    fontStyle: "italic",
    marginBottom: 20,
    textAlign: "center",
    color: "#7f8c8d",
  },
  hadithNumber: {
    fontSize: 20,
    marginBottom: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#e74c3c",
  },
  arabicText: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: "right",
    fontWeight: "bold",
    color: "#2c3e50",
  },
  translationText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#27ae60",
  },
  urduText: {
    fontSize: 20,
    textAlign: "right",
    color: "#34495e",
  },
});

export default HadithDetail;
