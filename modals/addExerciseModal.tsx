import React, { useEffect } from "react";
import { Modal, View, Text, Button, TextInput, StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { exerciseStore } from "../store/ExerciseStore";

interface AddExerciseModalProps {
  visible: boolean;
  onClose: () => void;
  onAddExercise: (exercise: {
    name: string;
    sets: number;
    reps: number;
  }) => void;
}

const AddExerciseModal: React.FC<AddExerciseModalProps> = ({
  visible,
  onClose,
  onAddExercise,
}) => {
  const exercisesData = exerciseStore.exerciseState.get(); // Access the state

  useEffect(() => {
    const fetchExercises = async () => {
      console.log("Fetching exercises...");
      await exerciseStore.getExercises(); // Fetch exercises
    };

    fetchExercises();
  }, []);

  console.log(exercisesData, "Initial data from state");

  const [exerciseName, setExerciseName] = React.useState<string>("Push Up");
  const [sets, setSets] = React.useState<number>(0);
  const [reps, setReps] = React.useState<number>(0);
  const exerciseArray = exercisesData.exercises;
  console.log(exercisesData.exercises, "in modal");
  // Transform exercisesData into the required format for SelectList
  const exercises = exerciseArray.map((exercise, index) => ({
    key: String(exercise.exerciseId), // Ensure key is a string
    value: exercise.name,
  }));

  const handleAdd = () => {
    onAddExercise({ name: exerciseName, sets, reps });
    onClose(); // Close the modal after adding
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Add Exercise</Text>

        <Text style={styles.label}>Exercise Name</Text>
        <SelectList
          setSelected={setExerciseName}
          data={exercises} // Use the transformed exercises array
          save="value"
          placeholder="Select an exercise"
          boxStyles={{ borderRadius: 2 }}
        />

        <Text style={styles.label}>Sets</Text>
        <TextInput
          keyboardType="numeric"
          value={sets.toString()}
          onChangeText={(text) => setSets(Number(text))}
          style={styles.input}
        />

        <Text style={styles.label}>Reps</Text>
        <TextInput
          keyboardType="numeric"
          value={reps.toString()}
          onChangeText={(text) => setReps(Number(text))}
          style={styles.input}
        />

        <Button title="Add" onPress={handleAdd} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Align items at the top
    padding: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  selectList: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default AddExerciseModal;
