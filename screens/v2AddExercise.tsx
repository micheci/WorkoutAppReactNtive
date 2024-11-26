import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../interfaces/StackInterfaces";

// Sample exercise list with IDs
const sampleExerciseList = [
  { id: "1", name: "Incline Hammer Curls" },
  { id: "2", name: "Wide-Grip Barbell Curl" },
  { id: "3", name: "Barbell Bench Press" },
  { id: "4", name: "Squats" },
  { id: "5", name: "Push-ups" },
  { id: "6", name: "Deadlift" },
  { id: "7", name: "Dumbbell Shoulder Press" },
];

interface FormValues {
  exerciseId: string;
  exerciseName: string;
  sets: string;
  reps: string;
}

const v2AddExercise = () => {
  const { control, handleSubmit, setValue, watch, reset } = useForm<FormValues>(
    {
      defaultValues: { exerciseId: "", exerciseName: "", sets: "", reps: "" },
    }
  );
  const [searchQuery, setSearchQuery] = useState("");
  const filteredExercises = sampleExerciseList.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedExerciseName = watch("exerciseName");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onSubmit = (data: FormValues) => {
    if (!data.exerciseId || !data.exerciseName || !data.sets || !data.reps) {
      alert("All fields are required!");
      return;
    }
    console.log("Form Data Sent to Backend:", data);
    alert("Exercise added successfully!");
    reset();
    navigation.navigate("Dashboard2");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Add a New Exercise</Text>

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
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setValue("exerciseId", item.id); // Save the ID
                setValue("exerciseName", item.name); // Save the name
                setSearchQuery("");
              }}
            >
              <Text style={styles.dropdownText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          style={styles.dropdown}
        />
      )}

      {/* Selected Exercise */}
      {selectedExerciseName && (
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedText}>
            Selected Exercise: {selectedExerciseName}
          </Text>
        </View>
      )}

      {/* Sets Input */}
      <Controller
        name="sets"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter sets"
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
          />
        )}
      />

      {/* Reps Input */}
      <Controller
        name="reps"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter reps"
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
          />
        )}
      />

      {/* Save Button */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.saveButtonText}>Save Exercise</Text>
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
    padding: 12,
    backgroundColor: "#f4f4f4",
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedText: {
    fontSize: 16,
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

export default v2AddExercise;
