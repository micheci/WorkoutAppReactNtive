import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { AIWorkout } from "../interfaces/Iworkout";
import { workoutStore } from "../storev2/WorkoutStore";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../interfaces/StackInterfaces";

const V2GeneratedWorkouts = ({ route }: any) => {
  const workouts = route.params?.state?.workouts || []; // Safely access workouts with fallback
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [selectedWorkouts, setSelectedWorkouts] = useState<AIWorkout[]>([]); // To track selected workouts
  const formatWorkoutForBackend = (workout: AIWorkout) => ({
    name: workout.name, // Map workout_name to name
    description: workout.description,
    exercises: workout.exercises.map((ex) => ({
      name: ex.name,
      sets: ex.sets,
      reps: ex.reps,
    })),
  });

  const handleSelectWorkout = (workout: AIWorkout) => {
    // Add the selected workout to the list
    setSelectedWorkouts((prevSelectedWorkouts) => {
      // Check if the workout is already selected
      const isSelected = prevSelectedWorkouts.some(
        (w) => w.name === workout.name
      );

      if (!isSelected) {
        console.log("Selected Workout:", workout); // Log selected workout to console
        return [...prevSelectedWorkouts, workout]; // Add to selected list
      }

      return prevSelectedWorkouts; // Return previous state if already selected
    });
    const formattedWorkout = formatWorkoutForBackend(workout);
    console.log(formattedWorkout, "REAL");
    workoutStore.saveGeneratedWorkoutToUser(formattedWorkout);
    navigation.navigate("ViewAddWorkoutHome");
  };

  if (!workouts || workouts.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.noDataText}>No workouts found. Try again.</Text>
      </SafeAreaView>
    );
  }

  const renderWorkout = ({ item }: { item: AIWorkout }) => (
    <View style={styles.workoutCard}>
      <Text style={styles.workoutTitle}>{item.name}</Text>
      <Text style={styles.workoutDescription}>{item.description}</Text>
      <Text style={styles.exerciseHeader}>Exercises:</Text>
      {item.exercises.map((exercise, index) => (
        <View key={index} style={styles.exercise}>
          <Text style={styles.exerciseName}>{exercise.name}</Text>
          <Text style={styles.exerciseDetails}>
            {`${exercise.sets || 0} sets x ${exercise.reps || 0} reps`}
          </Text>
        </View>
      ))}
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => handleSelectWorkout(item)}
      >
        <Text style={styles.buttonText}>Select</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={workouts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderWorkout}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  workoutCard: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  workoutTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  workoutDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  exerciseHeader: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 6,
  },
  exercise: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  exerciseName: {
    fontSize: 14,
    color: "#333",
  },
  exerciseDetails: {
    fontSize: 14,
    color: "#888",
  },
  noDataText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
    color: "#666",
  },
  selectButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#007bff",
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default V2GeneratedWorkouts;
