import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

const ExpandableExercises = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleSwipe = (event: any) => {
    const { velocityX } = event.nativeEvent;

    // Check if the swipe was fast enough to change the date
    if (Math.abs(velocityX) > 300) {
      if (velocityX < 0) {
        handleNextDay(); // Swipe left
      } else {
        handlePreviousDay(); // Swipe right
      }
    }
  };

  const handleNextDay = () => {
    setCurrentDate((prevDate) => {
      const nextDate = new Date(prevDate);
      nextDate.setDate(prevDate.getDate() + 1);
      return nextDate;
    });
  };

  const handlePreviousDay = () => {
    setCurrentDate((prevDate) => {
      const prevDateCopy = new Date(prevDate);
      prevDateCopy.setDate(prevDate.getDate() - 1);
      return prevDateCopy;
    });
  };

  return (
    <GestureHandlerRootView style={styles.gestureContainer}>
      <PanGestureHandler onEnded={handleSwipe}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.header}
            onPress={() => setIsExpanded(!isExpanded)} // Toggle expand/collapse
          >
            <Text style={styles.date}>{currentDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {isExpanded && (
            <View style={styles.content}>
              {/* Add your exercise details here */}
              <Text style={styles.exerciseText}>Exercise 1: 10 reps</Text>
              <Text style={styles.exerciseText}>Exercise 2: 15 reps</Text>
            </View>
          )}
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
  },
  container: {
    marginBottom: 20,
    backgroundColor: "#3A4D6A",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4A4A4A",
    padding: 20,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  date: {
    fontSize: 16,
    color: "#fff",
  },
  content: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#4A4A4A",
    borderRadius: 5,
  },
  exerciseText: {
    color: "#fff",
    marginBottom: 5,
  },
});

export default ExpandableExercises;
