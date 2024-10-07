import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { UserExercise } from "../interfaces/Iexercises";

const ExerciseItem = (exercise: UserExercise) => {
  return (
    <View style={styles.exerciseItem}>
      <Text>{`Name: ${exercise.exerciseName}`}</Text>
      <Text>{`Reps: ${exercise.reps}`}</Text>
      <Text>{`Sets: ${exercise.sets}`}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => console.log(exercise.id)}
      >
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  exerciseItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    position: "relative",
  },
  editButton: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "blue",
    padding: 5,
    borderRadius: 5,
  },
  editButtonText: {
    color: "#fff",
  },
});
export default ExerciseItem;
