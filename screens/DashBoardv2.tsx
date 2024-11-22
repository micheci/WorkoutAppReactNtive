import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
// Import any additional components like SearchBar, ProfileCard, etc.
import SearchBar from "../components/SearchBar";
import HomeGrid from "../components/HomeGrid";
import { Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const DashboardV2: React.FC = () => {
  // Example data for sections (this can be dynamic in the future)
  const exampleSections = [
    {
      id: "1",
      title: "Exercise Section",
      description: "Your daily workout routine.",
    },
    {
      id: "2",
      title: "Nutrition Section",
      description: "Healthy meal suggestions.",
    },
    {
      id: "3",
      title: "Mental Health Section",
      description: "Tips for mental well-being.",
    },
    // Add more sections as needed
  ];

  // State to hold the search query
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Handle search input and update the query
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // You can add filtering logic here if needed based on the query
  };

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: "https://via.placeholder.com/100", // Replace with actual profile image URL
          }}
          style={styles.profileImage}
        />
        <Text style={styles.profileTitle}>Hello, User!</Text>
        {/* You can add an image or profile card here */}
        <Text style={styles.profileSubtitle}>
          Welcome back to your dashboard.
        </Text>
      </View>

      {/* Search Bar */}
      <SearchBar query={searchQuery} onSearch={handleSearch} />

      {/* Graphs Section */}

      <View style={styles.graphsContainer}>
        {/* Title centered and larger */}
        <Text style={styles.graphsTitle}>Graph Progress</Text>

        {/* Placeholder for the graphs */}

        {/* Icon for Graphs */}
        <View style={styles.graphIconContainer}>
          <Icon name="show-chart" size={50} color="#333" />
        </View>
      </View>

      {/* Main Dashboard Sections */}
      <HomeGrid />
    </View>
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
  profileContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
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
