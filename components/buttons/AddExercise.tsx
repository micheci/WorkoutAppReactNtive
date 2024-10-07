import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { userExerciseStore } from "../../store/UserExerciseStore";
import AddExerciseModal from "../../modals/addExerciseModal";
import { UserExercise } from "../../interfaces/Iexercises";

const AddExercise: React.FC<any> = ({ onAddExercise }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddExercise = async (exerciseData: UserExercise) => {
    const formattedData = {
      exercise: {
        exerciseId: Number(exerciseData.exerciseId), // Ensure exerciseId is a number
      },
      reps: exerciseData.reps,
      sets: exerciseData.sets,
    };

    console.log(formattedData, "handleAddExercise");
    await onAddExercise(formattedData); // Call the passed function
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Add Exercise</Text>
      </TouchableOpacity>
      <AddExerciseModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddExercise={handleAddExercise}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#191970", // Green color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddExercise;
