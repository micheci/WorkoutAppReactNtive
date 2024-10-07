import React, { useEffect } from "react";
import { Modal, View, Text, Button, TextInput, StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { exerciseStore } from "../store/ExerciseStore";

interface AddExerciseModalProps {
  visible: boolean;
  onClose: () => void;
  onAddExercise: any;
}

const AddExerciseModal: React.FC<AddExerciseModalProps> = ({
  visible,
  onClose,
  onAddExercise,
}) => {
  const exercisesData = exerciseStore.exerciseState.get(); // Access the state

  useEffect(() => {
    const fetchExercises = async () => {
      await exerciseStore.getExercises(); // Fetch exercises
    };

    fetchExercises();
  }, []);

  const [exerciseId, setExerciseId] = React.useState<string>("id");
  const [sets, setSets] = React.useState<number>(0);
  const [reps, setReps] = React.useState<number>(0);
  const [weight, setWeight] = React.useState<number>(0);
  const exerciseData = {
    exerciseId: exerciseId,
    reps: reps,
    sets: sets,
    weight: weight,
  };
  const exerciseArray = exercisesData.exercises;
  // Transform exercisesData into the required format for SelectList
  const exercises = exerciseArray.map((exercise, index) => ({
    key: String(exercise.exerciseId), // Ensure key is a string
    value: exercise.name,
  }));

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Add Exercise</Text>

        <Text style={styles.label}>Exercise Name</Text>
        <SelectList
          //setSeelcted gets us te value so the name but i need to get the exerciseId
          setSelected={setExerciseId}
          data={exercises} // Use the transformed exercises array
          save="key"
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

        <Text style={styles.label}>Weight</Text>
        <TextInput
          keyboardType="numeric"
          value={weight.toString()}
          onChangeText={(text) => setWeight(Number(text))}
          style={styles.input}
        />

        <Button title="Add" onPress={() => onAddExercise(exerciseData)} />
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
