import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../interfaces/StackInterfaces";

// Hardcoded workout data
const hardcodedWorkouts = [
  {
    id: 1,
    name: "Full Body Workout",
    exercises: ["Push-ups", "Squats", "Deadlifts", "Plank"],
  },
  {
    id: 2,
    name: "Cardio Routine",
    exercises: ["Running", "Jumping Jacks", "Burpees"],
  },
  {
    id: 3,
    name: "Strength Training",
    exercises: ["Bench Press", "Bicep Curls", "Squats", "Deadlifts"],
  },
];

const V2ViewUserWorkouts = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [workouts, setWorkouts] = useState<any[]>([]);

  // Set the hardcoded data as the workouts on component mount
  useEffect(() => {
    setWorkouts(hardcodedWorkouts);
  }, []);

  // Navigate to the 'Add Workout' screen
  const handleCreateWorkout = () => {
    navigation.navigate("V2AddWorkout"); // Adjust the route name if necessary
  };

  // Navigate to the 'Body diagram' screen so they can click on what body parts
  const goToBodyDiagram = () => {
    navigation.navigate("BodyDiagram"); // Adjust the route name if necessary
  };

  // Render each workout in the list
  const renderWorkoutItem = ({ item }: any) => (
    <View style={styles.workoutItem}>
      <Text style={styles.workoutTitle}>{item.name}</Text>
      <Text style={styles.exercisesText}>
        Exercises: {item.exercises.join(", ")}
      </Text>
      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => {
          // Logic to view workout details (could navigate to another screen)
          alert("Workout details: " + item.name);
        }}
      >
        <Text style={styles.viewButtonText}>View Workout</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Your Workouts</Text>

      {/* If there are no workouts */}
      {workouts.length === 0 ? (
        <Text style={styles.noWorkoutsText}>No workouts created yet.</Text>
      ) : (
        <FlatList
          data={workouts}
          renderItem={renderWorkoutItem}
          keyExtractor={(item) => item.id.toString()} // Assuming each workout has a unique ID
        />
      )}

      {/* Button to create a new workout */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleCreateWorkout}
      >
        <Text style={styles.createButtonText}>Create New Workout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.createButton} onPress={goToBodyDiagram}>
        <Text style={styles.createButtonText}>
          Dont know where to start? We can make you a FREE custom workout!
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  workoutItem: {
    padding: 12,
    backgroundColor: "#f4f4f4",
    borderRadius: 8,
    marginBottom: 12,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  exercisesText: {
    fontSize: 16,
    marginTop: 8,
  },
  viewButton: {
    backgroundColor: "#FF6347",
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
    alignItems: "center",
  },
  viewButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  createButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  noWorkoutsText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 16,
  },
});

export default V2ViewUserWorkouts;
