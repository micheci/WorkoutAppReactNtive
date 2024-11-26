// Box.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// Props for the Box component
interface BoxProps {
  title: string;
  content: string;
  onPress: () => void;
  image: any;
}

const Box = ({ title, content, onPress, image }: BoxProps) => {
  return (
    <TouchableOpacity
      style={styles.box}
      onPress={onPress}
      delayPressIn={200} // Prevent accidental press during swipe
    >
      <Text style={styles.boxTitle}>{title}</Text>
      <View>{image}</View>
      <Text style={styles.boxContent}>{content}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    flexBasis: "48%", // Each box takes 48% of the available width (leaving space for margin)
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
});

export default Box;
