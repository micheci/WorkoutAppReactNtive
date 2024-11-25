// Box.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import MaterialIcons

// Props for the Box component
interface LogExerciseProp {
  onPress: () => void;
}

const LogExercise = ({ onPress }: LogExerciseProp) => {
  return (
    <TouchableOpacity style={styles.box} onPress={onPress}>
      <Text style={styles.graphsTitle}>Log Exercises</Text>
      <Icon name="fitness-center" size={50} color="#FF6347" />
    </TouchableOpacity>
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
});

export default LogExercise;
