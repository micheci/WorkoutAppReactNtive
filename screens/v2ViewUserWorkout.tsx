import React from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native"; // Added SafeAreaView
import { NavigationProp, useNavigation } from "@react-navigation/native";

const ViewWorkout = ({ route }: any) => {
  // Fixed the extra parenthesis
  const { workout } = route.params; // Extract the workout data

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={styles.workoutTitle}>{workout.name}</Text>
      <Text style={styles.workoutDescription}>{workout.description}</Text>

      <Text style={styles.sectionHeader}>Exercises</Text>
      <FlatList
        data={workout.exercises}
        renderItem={({ item }) => (
          <View style={styles.exerciseItem}>
            <Text style={styles.exerciseName}>{item.exercise.name}</Text>
            <Text style={styles.exerciseDetails}>
              Sets: {item.sets} | Reps: {item.reps}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  workoutTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  workoutDescription: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  exerciseItem: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  exerciseDetails: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
});

export default ViewWorkout;
