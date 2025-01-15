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
import { workoutStore } from "../storev2/WorkoutStore";

const V2ViewLogWorkouts = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState<boolean>(true); // Tracks if workouts are being loaded

  const [workouts, setWorkouts] = useState<any[]>([]);

  useEffect(() => {
    let test;

    const fetchWorkouts = async () => {
      try {
        setLoading(true); // Start loading
        const response = await workoutStore.getUsersWorkouts();
        test = response;
        console.log("Workout response:", response); // Debug response
        if (response) {
          setWorkouts(response); // Set the workouts in state
        }
        console.log("hello", response);
      } catch (e) {
        console.error("Error fetching workouts:", e);
      } finally {
        setLoading(false); // End loading
      }
    };
    console.log(test, "oom");
    fetchWorkouts();
  }, []);

  // Navigate to the 'Body diagram' screen so they can click on what body parts
  const goToViewWorkout = (workout: any) => {
    navigation.navigate("ViewUserWorkouts", { workout }); // Pass the workout as a parameter
  };

  // Render each workout in the list
  const renderWorkoutItem = ({ item }: any) => (
    <View style={styles.workoutItem}>
      <Text style={styles.workoutTitle}>{item.name}</Text>
      <Text style={styles.exercisesText}>
        Exercises:{" "}
        {item.exercises
          .map((ex: { exercise: { name: any } }) => ex.exercise.name)
          .join(", ")}
      </Text>
      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => goToViewWorkout(item)} // Pass the entire workout to the function
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

export default V2ViewLogWorkouts;
