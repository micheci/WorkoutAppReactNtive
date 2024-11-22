import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import ExpandableExercises from "../components/ExpandableExercise";
import ExpandableGraph from "../components/ExpandableGraph";
import AddExerciseModal from "../modals/addExerciseModal";

const { width, height } = Dimensions.get("window");

const Dashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hi, Micheci</Text>

      <Text style={styles.expandableLabel}>Exercises</Text>
      <ExpandableExercises />

      <Text style={styles.expandableLabel}>Graph</Text>
      <ExpandableGraph />
      {/* 
      <Text style={styles.expandableLabel}>Graph</Text>
      <ExpandableGraph />

      <Text style={styles.expandableLabel}>Graph</Text>
      <ExpandableGraph />

      <Text style={styles.expandableLabel}>Graph</Text>
      <ExpandableGraph /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05, // Use relative padding
    paddingTop: height * 0.1,
    backgroundColor: "#282828",
  },
  greeting: {
    color: "#fff",
    fontSize: 36,
    marginBottom: 20,
  },
  expandableLabel: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5, // Reduced margin to avoid extra space
    textAlign: "center",
  },
});

export default Dashboard;
