import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Sections from "./Sections";
import Hadiths from "./Hadiths";
import HadithDetail from "./HadithDetail";
import TitleScreen from "./TitleScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Books"
          component={TitleScreen}
          options={{
            headerShown: true,
          }}
        ></Stack.Screen>
      <Stack.Screen
          name="Sections"
          component={Sections}
          options={{
            headerShown: true,
          }}
        ></Stack.Screen>
      <Stack.Screen
          name="Hadiths"
          component={Hadiths}
          options={{
            headerShown: true,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="HadithDetail"
          component={HadithDetail}
          options={{
            headerShown: true,
          }}
        ></Stack.Screen>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    padding: 10,
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sectionDetails: {
    fontSize: 14,
    color: "#888",
  },
});
