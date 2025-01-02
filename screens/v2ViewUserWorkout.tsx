import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { workoutStore } from "../storev2/WorkoutStore";
import WorkoutLogAnimationModal from "../modals/WorkoutLogAnimationModal";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../interfaces/StackInterfaces";

const ViewWorkout = ({ route }: any) => {
  const { workout } = route.params;

  const [customExercises, setCustomExercises] = useState(
    workout.exercises.map((exercise: any) => ({
      id: exercise.id,
      name: exercise.exercise.name,
      sets: exercise.sets.toString(),
      reps: exercise.reps.toString(),
      weight: "",
      disabled: false, // Track if the exercise is disabled
      errors: { sets: false, reps: false, weight: false },
    }))
  );

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleInputChange = (id: number, field: string, value: string) => {
    setCustomExercises((prevExercises: any[]) =>
      prevExercises.map((exercise) =>
        exercise.id === id && !exercise.disabled
          ? {
              ...exercise,
              [field]: value,
              errors: { ...exercise.errors, [field]: false },
            }
          : exercise
      )
    );
  };

  const toggleDisableExercise = (id: number) => {
    setCustomExercises((prevExercises: any[]) =>
      prevExercises.map((exercise) =>
        exercise.id === id
          ? {
              ...exercise,
              disabled: !exercise.disabled,
              sets: exercise.disabled ? exercise.sets : "N/A", // Reset fields to N/A when enabling
              reps: exercise.disabled ? exercise.reps : "N/A",
              weight: exercise.disabled ? exercise.weight : "N/A",
            }
          : exercise
      )
    );
  };

  const validateInputs = () => {
    let isValid = true;

    const updatedExercises = customExercises.map(
      (exercise: { sets: any; reps: any; weight: any }) => {
        const errors = {
          sets:
            !exercise.sets ||
            isNaN(Number(exercise.sets)) ||
            Number(exercise.sets) <= 0,
          reps:
            !exercise.reps ||
            isNaN(Number(exercise.reps)) ||
            Number(exercise.reps) <= 0,
          weight:
            !exercise.weight ||
            isNaN(Number(exercise.weight)) ||
            Number(exercise.weight) <= 0,
        };

        if (errors.sets || errors.reps || errors.weight) {
          isValid = false;
        }

        return { ...exercise, errors };
      }
    );

    setCustomExercises(updatedExercises);
    return isValid;
  };

  const handleLogWorkout = () => {
    if (!validateInputs()) {
      Alert.alert(
        "Validation Error",
        "Please fill in all required fields with valid numbers."
      );
      return;
    }

    const workoutData = {
      workoutId: workout.id,
      date: selectedDate.toISOString(),
      notes: "TEST.",
      exercises: customExercises.map(
        (exercise: {
          id: any;
          sets: string;
          reps: string;
          weight: string;
        }) => ({
          exerciseId: exercise.id,
          sets: exercise.sets === "N/A" ? null : parseInt(exercise.sets),
          reps: exercise.reps === "N/A" ? null : parseInt(exercise.reps),
          weight:
            exercise.weight === "N/A" ? null : parseFloat(exercise.weight),
        })
      ),
    };

    console.log("Workout data to send:", workoutData);
    workoutStore.logUserWorkout(workoutData);

    // Show the modal after the workout is logged
    setModalVisible(true);
  };

  const toDashboard = () => {
    navigation.navigate("Dashboard2");
  };

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || new Date();
    setSelectedDate(currentDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.asteriskNote}>
        * The sets and reps shown are recommended from the template workout, but
        feel free to change them as needed.
      </Text>

      <Text style={styles.workoutTitle}>{workout.name}</Text>
      <Text style={styles.workoutDescription}>{workout.description}</Text>

      <Text style={styles.sectionHeader}>Exercises</Text>

      <Text style={styles.sectionHeader}>Select Date</Text>
      <DateTimePicker
        value={selectedDate}
        mode="date"
        display="default"
        onChange={onDateChange}
      />

      <FlatList
        data={customExercises}
        renderItem={({ item }) => (
          <View
            style={[
              styles.exerciseItem,
              item.disabled && { backgroundColor: "#f0f0f0" }, // Apply faded background if disabled
            ]}
          >
            <Text style={styles.exerciseName}>{item.name}</Text>
            <TouchableOpacity
              style={styles.disableButton}
              onPress={() => toggleDisableExercise(item.id)} // Toggle exercise disabled state
            >
              <Text style={styles.disableButtonText}>
                {item.disabled ? "Enable" : "Disable"}
              </Text>
            </TouchableOpacity>

            <View style={styles.inputRow}>
              <InputField
                label="Sets"
                value={item.sets}
                onChange={(value) => handleInputChange(item.id, "sets", value)}
                placeholder="Sets"
                hasError={item.errors.sets}
                disabled={item.disabled}
              />
              <InputField
                label="Reps"
                value={item.reps}
                onChange={(value) => handleInputChange(item.id, "reps", value)}
                placeholder="Reps"
                hasError={item.errors.reps}
                disabled={item.disabled}
              />
              <InputField
                label="Weight"
                value={item.weight}
                onChange={(value) =>
                  handleInputChange(item.id, "weight", value)
                }
                placeholder="Weight"
                hasError={item.errors.weight}
                disabled={item.disabled}
              />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <TouchableOpacity style={styles.logButton} onPress={handleLogWorkout}>
        <Text style={styles.logButtonText}>Log Workout</Text>
      </TouchableOpacity>

      {/* Modal for workout logging */}
      <WorkoutLogAnimationModal
        toDashboard={toDashboard}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        loggedDate={selectedDate.toISOString().split("T")[0]} // Format the date to "yyyy-mm-dd"
      />
    </SafeAreaView>
  );
};

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  hasError,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hasError: boolean;
  disabled: boolean;
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[
        styles.input,
        hasError && { borderColor: "red" }, // Highlight error with red border
        disabled && { backgroundColor: "#e0e0e0" }, // Grey out input when disabled
      ]}
      keyboardType="numeric"
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      editable={!disabled}
    />
    {hasError && <Text style={styles.errorText}>Required</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  asteriskNote: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    marginBottom: 8,
  },
  workoutTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  workoutDescription: { fontSize: 16, color: "#555", marginBottom: 16 },
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
  },
  exerciseName: { fontSize: 18, fontWeight: "bold" },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  inputContainer: { flex: 1, marginHorizontal: 4 },
  label: { fontSize: 12, color: "#555", marginBottom: 4 },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  errorText: { color: "red", fontSize: 12 },
  logButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  logButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  disableButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#FF6347",
    padding: 4,
    borderRadius: 4,
  },
  disableButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default ViewWorkout;
