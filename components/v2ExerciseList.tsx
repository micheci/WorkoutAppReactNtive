import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../interfaces/StackInterfaces";
import { pickListStore } from "../storev2/PicklistStore";
import { useHookstate } from "@hookstate/core";

export interface exercise {
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
}

const V2ExerciseList = () => {
  useEffect(() => {
    // Fetch exercises on component mount
    pickListStore.getAllExercises();
  }, []);

  const Exercises = useHookstate(pickListStore.PicklistState.exercises);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredExercises = Exercises.get().filter((exercise) =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>All Exercises</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search exercises..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredExercises}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.exerciseItem}
            onPress={() =>
              navigation.navigate("ExerciseDetail", { exercise: item })
            }
          >
            <Text style={styles.exerciseTitle}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: "#fff",
    alignItems: "center", // Center the content horizontally
  },
  headerText: {
    fontSize: 28, // Larger title size
    fontWeight: "bold",
    marginBottom: 24, // Space between title and search bar
    textAlign: "center", // Center the header text
  },
  searchBar: {
    height: 48,
    width: "90%",
    alignSelf: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    marginBottom: 24, // Space between the search bar and list
  },
  exerciseItem: {
    backgroundColor: "#f4f4f4",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "100%", // Ensures exercise items aren't too wide
    alignSelf: "center", // Center each item horizontally
  },
  exerciseTitle: {
    fontSize: 22, // Larger font size for exercise title
    fontWeight: "bold",
    textAlign: "center", // Center the exercise title
  },
});

export default V2ExerciseList;
