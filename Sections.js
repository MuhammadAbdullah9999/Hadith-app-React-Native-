import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from "@react-navigation/native";

const Sections = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const bookId = route.params?.bookId;

  const [loading, setLoading] = useState(true);
  const [hadith, setHadith] = useState([]);
  const [sections, setSections] = useState([]);
  const [sectionDetails, setSectionDetails] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-${bookId}.json`
        );

        setHadith(response.data.hadiths);
        setSections(Object.values(response.data.metadata.sections));
        setSectionDetails(Object.values(response.data.metadata.section_details));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const navigateToHadith = (item) => {
    navigation.navigate("Hadiths", { bookId: bookId, index: item });
  }

  // Combine section and section_details into a single array starting with index 1
  let mergedData = sectionDetails.map((section, index) => ({
    section: sections[index],
    sectionDetails: section,
  }));
  mergedData = mergedData.slice(1);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => navigateToHadith(index + 1)}>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>{item.section}</Text>
        <Text style={styles.sectionDetails}>
          {`${item.sectionDetails.hadithnumber_first} - ${item.sectionDetails.hadithnumber_last}`}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#3498db" />
      ) : (
        mergedData.length > 0 && (
          <FlatList
            data={mergedData}
            renderItem={renderItem}
            keyExtractor={(item, index) => (index + 1).toString()} // Key starts from 1
          />
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1', // Light gray background
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#3498db', // Blue title
  },
  sectionDetails: {
    fontSize: 14,
    color: '#888',
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Sections;
