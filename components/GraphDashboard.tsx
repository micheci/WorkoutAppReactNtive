// Box.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import MaterialIcons

// Props for the Box component
interface LogExerciseProp {
  onPress: () => void;
}

const GraphDashboard = ({ onPress }: LogExerciseProp) => {
  return (
    <View style={styles.box} onTouchEnd={onPress}>
      <Text style={styles.graphsTitle}>Graphs</Text>
      <Icon name="show-chart" size={50} color="#333" />{" "}
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
});

export default GraphDashboard;
