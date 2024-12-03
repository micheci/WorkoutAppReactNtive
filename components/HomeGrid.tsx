import React from "react";
import { View, StyleSheet } from "react-native";
import Box from "./Box"; // Import the Box component
import Icon from "react-native-vector-icons/MaterialIcons"; // Import MaterialIcons
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../interfaces/StackInterfaces";

const HomeGrid: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Example data or content for each box with icons
  const boxData = [
    {
      title: "All Exercises",
      content: "Your daily workout routine",
      onPress: () => navigation.navigate("Exercises"),
      image: <Icon name="list" size={30} color="#000" />, // Icon for Exercises
    },
    {
      title: "View/Add Workouts",
      content: "Healthy meal plans and tips",
      onPress: () => navigation.navigate("ViewAddWorkoutHome"),
      image: <Icon name="apple" size={50} color="#34C759" />, // Icon for Nutrition (Apple icon)
    },
    //Can add this feature later
    // {
    //   title: "Nutrition",
    //   content: "Healthy meal plans and tips",
    //   onPress: () => navigation.navigate("Nutrition"),
    //   image: <Icon name="apple" size={50} color="#34C759" />, // Icon for Nutrition (Apple icon)
    // },
    {
      title: "Profile",
      content: "View and edit your profile",
      onPress: () => navigation.navigate("Profile2"),
      image: <Icon name="account-circle" size={50} color="#808080" />, // Icon for Profile
    },
    {
      title: "Settings",
      content: "Manage your app settings",
      onPress: () => alert("Navigate to Settings"),
      image: <Icon name="settings" size={50} color="#0078D4" />, // Icon for Settings
    },
  ];

  return (
    <View style={styles.grid}>
      {boxData.map((box, index) => (
        <Box
          key={index}
          title={box.title}
          content={box.content}
          onPress={box.onPress}
          image={box.image} // Pass the icon as the image prop to Box
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row", // Align items in rows
    flexWrap: "wrap", // Allow items to wrap to the next row
    justifyContent: "space-between", // Space between items
    marginBottom: 16, // Spacing at the bottom of the grid
  },
});

export default HomeGrid;
