import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"; // Using Expo DateTimePicker

const ViewWorkout = ({ route }: any) => {
  const { workout } = route.params;

  // State to track user's custom sets, reps, and weight for each exercise
  const [customExercises, setCustomExercises] = useState(
    workout.exercises.map((exercise: any) => ({
      id: exercise.id,
      name: exercise.exercise.name,
      sets: exercise.sets,
      reps: exercise.reps,
      weight: "",
    }))
  );

  // State for the selected date
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleInputChange = (id: number, field: string, value: string) => {
    setCustomExercises((prevExercises: any[]) =>
      prevExercises.map((exercise) =>
        exercise.id === id ? { ...exercise, [field]: value } : exercise
      )
    );
  };

  const handleLogWorkout = () => {
    const workoutData = {
      workoutId: workout.id,
      date: selectedDate.toISOString(), // Send the selected date in ISO format
      notes: "Felt great, but need to improve strength.", // You can get this value from the state if needed
      exercises: customExercises.map(
        (exercise: { id: any; sets: any; reps: any; weight: string }) => ({
          exerciseId: exercise.id,
          sets: exercise.sets,
          reps: exercise.reps,
          weight: parseFloat(exercise.weight),
        })
      ),
    };

    console.log("Workout data to send:", workoutData);
    // Add logic here to save the workout to the database or API
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

      {/* Date Picker */}
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
          <View style={styles.exerciseItem}>
            <Text style={styles.exerciseName}>{item.name}</Text>

            <View style={styles.inputRow}>
              <InputField
                label="Sets"
                value={item.sets.toString()}
                onChange={(value) => handleInputChange(item.id, "sets", value)}
              />
              <InputField
                label="Reps"
                value={item.reps.toString()}
                onChange={(value) => handleInputChange(item.id, "reps", value)}
              />
              <InputField
                label="Weight"
                value={item.weight.toString()}
                onChange={(value) =>
                  handleInputChange(item.id, "weight", value)
                }
                placeholder="lbs"
              />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <TouchableOpacity style={styles.logButton} onPress={handleLogWorkout}>
        <Text style={styles.logButtonText}>Log Workout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// InputField component for modularization
const InputField = ({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      keyboardType="numeric"
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  asteriskNote: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    marginBottom: 8,
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
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  label: {
    fontSize: 12,
    color: "#555",
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },
  logButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  logButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ViewWorkout;
