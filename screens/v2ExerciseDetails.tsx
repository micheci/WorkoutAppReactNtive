import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const V2ExerciseDetails = ({ route }: any) => {
  const { exercise } = route.params;
  const [loading, setLoading] = useState(true);

  // Track the current exercise data and reset loading state when exercise changes
  useEffect(() => {
    setLoading(true); // Reset loading when exercise changes
  }, [exercise]); // This will trigger every time `exercise` changes

  // Set the loading state to false when the image has loaded
  const onImageLoad = () => setLoading(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{exercise.name}</Text>

      {/* Show loading spinner until the image is loaded */}
      {loading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}

      {/* Conditionally render the Image only after loading is complete */}
      {!loading && (
        <Image
          key={exercise.name} // Key ensures re-render when exercise changes
          source={{ uri: exercise.imageUrl }}
          style={styles.gif}
          resizeMode="contain"
          onLoad={onImageLoad} // Trigger onImageLoad once the image has loaded
        />
      )}

      {/* Display exercise details */}
      <Text>Muscles: {exercise.muscle}</Text>
      <Text>Equipment: {exercise.equipment}</Text>
      <Text>Difficulty: {exercise.difficulty}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  gif: {
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  loader: {
    marginBottom: 16, // Add space between the loader and the image
  },
});

export default V2ExerciseDetails;
