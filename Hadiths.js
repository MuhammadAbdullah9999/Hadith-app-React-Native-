import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import HadithDetail from "./HadithDetail";

const Hadiths = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const index = route.params?.index;
  const bookId = route.params?.bookId;

  const [hadith, setHadith] = useState([]);
  const [urduHadith, setUrduHadith] = useState([]);
  const [mergedHadith, setMergedHadith] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHadith = async () => {
      try {
        const response = await axios.get(
          `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-${bookId}/sections/${index}.json`
        );
        setHadith(response.data);
      } catch (error) {
        console.error("Error fetching Hadith:", error);
      } finally {
        setLoading(false);
      }
    };

    const getUrduHadith = async () => {
      try {
        const response = await axios.get(
          `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/urd-${bookId}/sections/${index}.json`
        );
        setUrduHadith(response.data);
      } catch (error) {
        console.error("Error fetching Urdu Hadith:", error);
      }
    };

    getHadith();
    getUrduHadith();
  }, [index]);

  useEffect(() => {
    if (hadith.hadiths && urduHadith.hadiths) {
      const newMergedHadith = hadith.hadiths.map((hadithItem, index) => ({
        hadith: hadithItem,
        urduHadith: urduHadith.hadiths[index],
      }));
      setMergedHadith(newMergedHadith);
    }
  }, [hadith, urduHadith]);

  const hadithDetail = (item, index) => {
    navigation.navigate("HadithDetail", { bookId: bookId, hadithNumber: item.hadith.hadithnumber });
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => hadithDetail(item, index)}>
      <View style={styles.card}>
        <Text style={styles.hadithNumber}>{`Hadith #${item.hadith.hadithnumber}`}</Text>
        <Text style={styles.arabicHadith}>{item.hadith.text}</Text>
        <Text style={styles.translationText}>Urdu Translation:</Text>
        <Text style={styles.urduHadith}>{item.urduHadith.text}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#3498db" />
      ) : (
        hadith.hadiths && hadith.hadiths.length > 0 && (
          <View>
            <Text style={styles.heading}>{hadith.metadata.name}</Text>
            <Text style={styles.section}>{hadith.metadata.section[index]}</Text>
            <FlatList
              data={mergedHadith}
              renderItem={renderItem}
              keyExtractor={(item) => item.hadith.hadithnumber.toString()}
            />
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#3498db",
  },
  section: {
    fontStyle: "italic",
    marginBottom: 10,
    color: "#7f8c8d",
  },
  hadithNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e74c3c",
  },
  arabicHadith: {
    fontSize: 16,
    marginTop: 10,
    color: "#2c3e50",
    fontWeight:'bold',
  },
  translationText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#27ae60",
  },
  urduHadith: {
    fontSize: 16,
    color: "#34495e",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Hadiths;
