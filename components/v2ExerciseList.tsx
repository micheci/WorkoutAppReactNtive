// Box.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import MaterialIcons
import Box from "./Box";
import { SearchBar } from "react-native-screens";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../interfaces/StackInterfaces";

export interface exercise {
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
}

const sampleExerciseList = [
  {
    name: "Incline Hammer Curls",
    type: "strength",
    muscle: "biceps",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Seat yourself on an incline bench with a dumbbell in each hand. You should pressed firmly against the back with your feet together. Allow the dumbbells to hang straight down at your side, holding them with a neutral grip. This will be your starting position. Initiate the movement by flexing at the elbow, attempting to keep the upper arm stationary. Continue to the top of the movement and pause, then slowly return to the start position.",
  },
  {
    name: "Wide-grigp barbell curl",
    type: "strength",
    muscle: "biceps",
    equipment: "barbell",
    difficulty: "beginner",
    instructions:
      "Stand up with your torso upright while holding a barbell at the wide outer handle. The palm of your hands should be facing forward. The elbows should be close to the torso. This will be your starting position. While holding the upper arms stationary, curl the weights forward while contracting the biceps as you breathe out. Tip: Only the forearms should move. Continue the movement until your biceps are fully contracted and the bar is at shoulder level. Hold the contracted position for a second and squeeze the biceps hard. Slowly begin to bring the bar back to starting position as your breathe in. Repeat for the recommended amount of repetitions. Variations: You can also perform this movement using an E-Z bar or E-Z attachment hooked to a low pulley. This variation seems to really provide a good contraction at the top of the movement. You may also use the closer grip for variety purposes.",
  },
  {
    name: "Barbell Bench Press",
    type: "strength",
    muscle: "chest",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions:
      "Lie flat on your back on a bench with a barbell resting on the rack above you. Grip the barbell with hands slightly wider than shoulder-width apart. Unrack the bar and lower it to your chest, keeping your elbows at about a 45-degree angle. Press the bar back up until your arms are fully extended. Keep your feet flat on the floor and maintain a strong core throughout the movement.",
  },
  {
    name: "Squats",
    type: "strength",
    muscle: "legs",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions:
      "Stand with your feet shoulder-width apart and a barbell resting on your upper back (if using weight). Keeping your back straight and chest up, bend at the hips and knees, lowering your body until your thighs are parallel to the ground or deeper if flexibility allows. Push through your heels to return to the starting position, maintaining proper form and posture throughout.",
  },
  {
    name: "Push-ups",
    type: "strength",
    muscle: "chest, shoulders, triceps",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Begin in a high plank position with your hands placed slightly wider than shoulder-width apart. Lower your body towards the floor by bending your elbows while keeping your core tight and body in a straight line. Once your chest is just above the ground, push through your palms to return to the starting position.",
  },
  {
    name: "Deadlift",
    type: "strength",
    muscle: "hamstrings, glutes, lower back",
    equipment: "barbell",
    difficulty: "advanced",
    instructions:
      "Stand with your feet shoulder-width apart and a barbell in front of you. Bend at the hips and knees to grip the bar with your hands just outside your knees. Keeping your back straight, stand up by driving through your heels and extending your hips and knees. Lower the bar back to the ground with control, ensuring your back remains flat throughout the movement.",
  },
  {
    name: "Dumbbell Shoulder Press",
    type: "strength",
    muscle: "shoulders",
    equipment: "dumbbells",
    difficulty: "intermediate",
    instructions:
      "Sit or stand with a dumbbell in each hand at shoulder height. With your palms facing forward and elbows bent, press the dumbbells overhead until your arms are fully extended. Slowly lower the weights back to the starting position, maintaining control and keeping your core engaged.",
  },
];

const V2ExerciseList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredExercises = sampleExerciseList.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
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
            <Text style={styles.title}>{item.name}</Text>
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
    paddingTop: 16, // Padding at the top
    backgroundColor: "#fff",
  },
  searchBar: {
    height: 48, // Adjust the height of the search bar
    width: "90%", // Slightly shorter than full width
    alignSelf: "center", // Center it horizontally
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12, // Space inside the search bar
    marginBottom: 16, // Space between the search bar and the list
  },
  exerciseItem: {
    backgroundColor: "#f4f4f4",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default V2ExerciseList;
