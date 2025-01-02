import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
// Import any additional components like SearchBar, ProfileCard, etc.
import SearchBar from "../components/SearchBar";
import HomeGrid from "../components/HomeGrid";
import { Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import LogExercise from "../components/LogExercise";
import GraphDashboard from "../components/GraphDashboard";
import DashBaordHeader from "../components/DashboardHeader";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../interfaces/StackInterfaces";
import LogWorkout from "../components/LogWorkout";
import CalenderDashboard from "../components/CalenderDashBoard";

const DashboardV2: React.FC = () => {
  // State to hold the search query
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Handle search input and update the query
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // You can add filtering logic here if needed based on the query
  };

  const toLogExercise = () => {
    navigation.navigate("AddExercise");
  };

  const toGraphs = () => {
    navigation.navigate("Graphs");
  };

  const toCalenderView = () => {
    navigation.navigate("CalenderView");
  };

  const toAddWorkouts = () => {
    navigation.navigate("ViewLogUserWorkouts");
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      {/* Profile Section */}
      <DashBaordHeader />

      {/* Search Bar */}
      <SearchBar query={searchQuery} onSearch={handleSearch} />
      {/* Box to allow users to log exercises  */}
      <LogWorkout onPress={() => toAddWorkouts()} />
      {/* <LogExercise onPress={() => toLogExercise()} /> */}

      {/* Graphs Section */}
      <CalenderDashboard onPress={() => toCalenderView()} />

      {/* <GraphDashboard onPress={() => toGraphs()} /> */}
      {/* Main Dashboard Sections */}
      <HomeGrid />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  graphsContainer: {
    backgroundColor: "#f4f4f4", // Light background color
    borderRadius: 8,
    padding: 16,
    marginVertical: 16, // Space above and below the graphs section
    width: "100%", // Full width
    alignItems: "center", // Center content horizontally
    borderWidth: 1,
    borderColor: "#ddd",
  },
  graphsTitle: {
    fontSize: 24, // Larger font size
    fontWeight: "bold", // Bold text
    marginBottom: 16, // Space between the title and the placeholder
    color: "#333", // Darker color
    textAlign: "center", // Center text
  },
  graphPlaceholder: {
    height: 150, // Placeholder height for the graph
    backgroundColor: "#eaeaea",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%", // Full width for placeholder
    marginBottom: 16, // Space between the placeholder and the icon
  },
  graphPlaceholderText: {
    fontSize: 16,
    color: "#999",
  },
  graphIconContainer: {
    alignItems: "center",
  },

  profileImage: {
    width: 80, // Width of the profile picture
    height: 80, // Height of the profile picture
    borderRadius: 40, // Circular image
    marginBottom: 8, // Space between the image and the text
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileSubtitle: {
    fontSize: 16,
    color: "#777",
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
    marginBottom: 16,
  },
});

export default DashboardV2;
