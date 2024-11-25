// Box.tsx
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import MaterialIcons

// Props for the Box component
interface LogExerciseProp {
  onPress: () => void;
}

const DashBaordHeader = () => {
  return (
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
  );
};

const styles = StyleSheet.create({
  box: {
    margin: "1%", // Space between the boxes
    padding: 16,
    backgroundColor: "#f4f4f4",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 150, // Adjust this as needed
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  boxContent: {
    fontSize: 14,
    textAlign: "center",
  },
  graphsTitle: {
    fontSize: 24, // Larger font size
    fontWeight: "bold", // Bold text
    marginBottom: 16, // Space between the title and the placeholder
    color: "#333", // Darker color
    textAlign: "center", // Center text
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
});

export default DashBaordHeader;
