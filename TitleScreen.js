import React, { useState } from 'react';
import { FlatList, Text, View, TouchableOpacity, Image, ActivityIndicator, StyleSheet,TextInput,ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const bookData = [
  { id: '1', key: 'muslim', name: 'Sahih Muslim', arabicName: 'صحيح مسلم', image: require('./muslim.jpg') },
  { id: '2', key: 'bukhari', name: 'Sahih Bukhari', arabicName: 'صحيح البخاري', image: require('./bukhari.png') },
  { id: '3', key: 'malik', name: 'Malik', arabicName: 'الموطأ', image: require('./malik.jpg') },
  { id: '4', key: 'ibnmajah', name: 'Ibn Maja', arabicName: 'سنن ابن ماجه', image: require('./ibnmaja.jpg') },
  { id: '5', key: 'abudawud', name: 'Sunan Abu Dawood', arabicName: 'سنن أبي داود', image: require('./abudawood.jpg') },
  { id: '6', key: 'tirmidhi', name: 'Tirmidhi', arabicName: 'جامع الترمذي', image: require('./tirmidhi.jpg') },
  { id: '7', key: 'nasai', name: 'Sunan an-Nasa\'i', arabicName: 'سنن النسائي', image: require('./nisai.jpg') },
];

const TitleScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  

  const filteredBooks = bookData.filter(book => {
    const nameMatch = book.name.toLowerCase().includes(searchQuery.toLowerCase());
    const arabicNameMatch = book.arabicName.includes(searchQuery);
    return nameMatch || arabicNameMatch;
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        setLoading(true);
        navigation.navigate("Sections", { bookId: item.key });
        setLoading(false);
      }}
    >
      <Image source={item.image} style={styles.bookImage} />
      <View style={styles.textContainer}>
        <Text style={styles.bookTitle}>{item.name}</Text>
        <Text style={styles.arabicName}>{item.arabicName}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Image
          source={require('./3.jpg')}
          style={styles.backgroundImage}
        />
        <View style={styles.overlay} />
        <Text style={styles.headerText}>كتب الحديث</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Hadiths"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      <FlatList
        data={filteredBooks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
  },
  upperContainer: {
    height: '35%', // Adjust the percentage as needed
    overflow: 'hidden',
    // borderBottomLeftRadius: 120,
    // borderBottomRightRadius: 120,
    position: 'relative',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    bottom: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 50% opacity
  },
  headerText: {
    position: 'absolute',
    bottom: '50%', // Adjust to center vertically
    left: '45%', // Adjust to center horizontally
    transform: [{ translateX: -50 }, { translateY: -50 }], // Centering trick
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchInput: {
    backgroundColor: '#fff',
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    margin: 20,
    marginTop:180,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 10,
  },
  bookImage: {
    width: 60,
    height: 60,
    borderRadius: 10, // Adjust the border radius as needed
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 18,
    color: '#000',
    marginTop: 20,
  },
  
  arabicName: {
    fontSize: 14,
    color: 'gray',
    fontWeight:'bold'
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default TitleScreen;
