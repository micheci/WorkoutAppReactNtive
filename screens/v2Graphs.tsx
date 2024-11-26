import React from "react";
import { SafeAreaView, StyleSheet, Text, ScrollView } from "react-native";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
} from "victory-native";

const WeeklyGraphs = () => {
  // Data for Graphs
  const weightData = [
    { date: "11-18", weight: 188 },
    { date: "11-19", weight: 187.5 },
    { date: "11-20", weight: 187 },
    { date: "11-21", weight: 186.5 },
    { date: "11-22", weight: 186 },
    { date: "11-23", weight: 185.5 },
    { date: "11-24", weight: 185 },
  ];

  const caloriesData = [
    { date: "11-18", calories: 2500 },
    { date: "11-19", calories: 2400 },
    { date: "11-20", calories: 2300 },
    { date: "11-21", calories: 2200 },
    { date: "11-22", calories: 2100 },
    { date: "11-23", calories: 2000 },
    { date: "11-24", calories: 1900 },
  ];

  const allDates = weightData.map((entry) => entry.date);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Title for Weight Graph */}
        <Text style={styles.graphTitle}>Weight Graph</Text>
        <VictoryChart theme={VictoryTheme.material} scale={{ x: "time" }}>
          <VictoryAxis
            tickValues={allDates} // Show all days in the week
            style={{
              axisLabel: { fontSize: 12, padding: 30 },
              tickLabels: { fontSize: 10, angle: -45, textAnchor: "end" },
            }}
          />
          <VictoryAxis
            dependentAxis
            label="Weight (lbs)"
            style={{
              axisLabel: { fontSize: 12, padding: 40 },
              tickLabels: { fontSize: 10 },
            }}
          />
          <VictoryLine
            data={weightData}
            x="date"
            y="weight"
            style={{
              data: { stroke: "#FF6347", strokeWidth: 3 },
            }}
          />
        </VictoryChart>

        {/* Title for Calories Graph */}
        <Text style={styles.graphTitle}>Calories Graph</Text>
        <VictoryChart theme={VictoryTheme.material} scale={{ x: "time" }}>
          <VictoryAxis
            tickValues={allDates} // Show all days in the week
            style={{
              axisLabel: { fontSize: 12, padding: 30 },
              tickLabels: { fontSize: 10, angle: -45, textAnchor: "end" },
            }}
          />
          <VictoryAxis
            dependentAxis
            label="Calories"
            style={{
              axisLabel: { fontSize: 12, padding: 40 },
              tickLabels: { fontSize: 10 },
            }}
          />
          <VictoryLine
            data={caloriesData}
            x="date"
            y="calories"
            style={{
              data: { stroke: "#4CAF50", strokeWidth: 3 },
            }}
          />
        </VictoryChart>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 30, // Add some bottom padding to ensure content is not cut off
  },
  graphTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
    textAlign: "center",
    color: "#333",
  },
});

export default WeeklyGraphs;
