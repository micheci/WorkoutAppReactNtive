import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Calendar } from "react-native-calendars"; // Import Calendar component
interface MarkedDateProps {
  marked?: boolean;
  selected?: boolean;
  selectedColor?: string;
  selectedTextColor?: string;
}

const V2CalenderView = () => {
  // Hardcoded logged dates
  const loggedDates = ["2024-12-05", "2024-12-10", "2024-12-15"]; // Example logged dates

  const markedDates: Record<string, MarkedDateProps> = loggedDates.reduce(
    (acc: Record<string, MarkedDateProps>, date: string) => {
      acc[date] = {
        marked: true,
        selected: true,
        selectedColor: "gold",
        selectedTextColor: "#fff",
      };
      return acc;
    },
    {}
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Workout Calendar</Text>
      <Calendar
        markedDates={markedDates} // Pass marked dates to the calendar
        theme={{
          todayTextColor: "#FF6347", // Customize today's date color
          dotColor: "gold", // Customize dot color for marked dates
          selectedDotColor: "#ffffff", // Customize dot color for selected dates
        }}
        style={styles.calendar} // Custom style for the calendar
      />
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
    color: "#333",
    textAlign: "center",
    marginBottom: 16,
  },
  calendar: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd", // Border color around the calendar
    borderRadius: 8,
    padding: 10,
  },
});

export default V2CalenderView;
