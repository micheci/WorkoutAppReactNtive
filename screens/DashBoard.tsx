import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ExpandableExercises from "../components/ExpandableExercise";

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hi, Micheci</Text>

      <Text style={styles.exercisesLabel}>Exercises</Text>
      <ExpandableExercises />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#282828",
  },
  greeting: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 20,
  },
  exercisesLabel: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default Dashboard;
