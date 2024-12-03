import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useForm } from "react-hook-form";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../interfaces/StackInterfaces";
import { pickListStore } from "../storev2/PicklistStore";
import { useHookstate } from "@hookstate/core";

interface Exercise {
  exerciseId: string;
  name: string;
  sets: string;
  reps: string;
}

const V2AddWorkout = () => {
  const { setValue, reset } = useForm();
  const PicklistState = useHookstate(pickListStore.PicklistState);

  useEffect(() => {
    // Fetch exercises on component mount
    pickListStore.getAllExercises();
  }, []);

  const [workoutName, setWorkoutName] = useState(""); // State for workout name
  const [workoutDescription, setWorkoutDescription] = useState(""); // State for workout description
  const [searchQuery, setSearchQuery] = useState("");
  const [workoutExercises, setWorkoutExercises] = useState<Exercise[]>([]); // State for selected exercises

  const filteredExercises = PicklistState.exercises
    .get()
    .filter((exercise) =>
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Handle adding exercise to workout with sets and reps
  const handleAddExercise = (exercise: any) => {
    setWorkoutExercises((prevExercises) => [
      ...prevExercises,
      { ...exercise, sets: "", reps: "" }, // Initialize sets and reps
    ]);
    reset(); // Clear form inputs
  };

  // Handle removing exercise from workout
  const handleRemoveExercise = (exerciseId: string) => {
    setWorkoutExercises((prevExercises) =>
      prevExercises.filter((exercise) => exercise.exerciseId !== exerciseId)
    );
  };

  // Handle updating sets and reps for a specific exercise
  const handleUpdateSetsReps = (
    exerciseId: string,
    sets: string,
    reps: string
  ) => {
    setWorkoutExercises((prevExercises) =>
      prevExercises.map((exercise) =>
        exercise.exerciseId === exerciseId
          ? { ...exercise, sets, reps }
          : exercise
      )
    );
  };

  // Handle form submission
  const onSubmit = () => {
    if (!workoutName.trim()) {
      alert("Please enter a workout name!");
      return;
    }
    if (workoutExercises.length === 0) {
      alert("Please add at least one exercise to the workout!");
      return;
    }
    const workoutData = {
      name: workoutName,
      description: workoutDescription,
      exercises: workoutExercises,
    };
    console.log("Workout Created:", workoutData);
    alert("Workout successfully created!");
    // Save workout logic here (backend or local state)
    // navigation.navigate("Dashboard2");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Create a New Workout</Text>

      {/* Input for Workout Name */}
      <TextInput
        style={styles.input}
        placeholder="Enter workout name"
        value={workoutName}
        onChangeText={setWorkoutName}
      />

      {/* Input for Workout Description */}
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Enter workout description"
        value={workoutDescription}
        onChangeText={setWorkoutDescription}
        multiline={true}
        numberOfLines={3}
      />

      {/* Searchable Dropdown */}
      <TextInput
        style={styles.input}
        placeholder="Search for an exercise..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {searchQuery.length > 0 && (
        <FlatList
          data={filteredExercises}
          keyExtractor={(item) => item.exerciseId.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setValue("exerciseId", item.exerciseId.toString());
                setValue("exerciseName", item.name);
                setSearchQuery(""); // Clear search
                handleAddExercise(item); // Add exercise to workout
              }}
            >
              <Text style={styles.dropdownText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          style={styles.dropdown}
        />
      )}

      {/* Display Added Exercises */}
      <FlatList
        data={workoutExercises}
        keyExtractor={(item) => item.exerciseId.toString()}
        renderItem={({ item }) => (
          <View style={styles.selectedContainer}>
            <Text style={styles.selectedText}>{item.name}</Text>

            {/* Input for Sets */}
            <TextInput
              style={styles.input}
              placeholder="Enter sets"
              value={item.sets}
              onChangeText={(text) =>
                handleUpdateSetsReps(item.exerciseId, text, item.reps)
              }
              keyboardType="numeric"
            />

            {/* Input for Reps */}
            <TextInput
              style={styles.input}
              placeholder="Enter reps"
              value={item.reps}
              onChangeText={(text) =>
                handleUpdateSetsReps(item.exerciseId, item.sets, text)
              }
              keyboardType="numeric"
            />

            {/* Remove Exercise Button */}
            <TouchableOpacity
              onPress={() => handleRemoveExercise(item.exerciseId)}
              style={styles.removeButton}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={onSubmit}>
        <Text style={styles.saveButtonText}>Save Workout</Text>
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
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: "top", // Ensures text starts at the top
  },
  dropdown: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 12,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  dropdownText: {
    fontSize: 16,
  },
  selectedContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#f4f4f4",
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  removeButton: {
    backgroundColor: "#FF6347",
    padding: 6,
    borderRadius: 4,
    alignItems: "center",
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#FF6347",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default V2AddWorkout;
