import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import MaterialIcons
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../interfaces/StackInterfaces";
import { SafeAreaView } from "react-native-safe-area-context";
import { exercise } from "../components/v2ExerciseList";

const V2ExerciseDetails = ({ route }: any) => {
  const { exercise } = route.params;
  console.log(exercise, "thisthe onei pciked");
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{exercise.name}</Text>
      <Text>Type: {exercise.type}</Text>
      <Text>Muscle: {exercise.muscle}</Text>
      <Text>Equipment: {exercise.equipment}</Text>
      <Text>Difficulty: {exercise.difficulty}</Text>
      <Text style={styles.instructions}>Instructions:</Text>
      <Text>{exercise.instructions}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  instructions: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 8,
  },
});

export default V2ExerciseDetails;
