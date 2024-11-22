import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

const dummyData = ["Weight Loss", "Sets", "Reps"];

const ExpandableGraph = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // State for the current index

  const handleSwipe = (event: any) => {
    const { velocityX } = event.nativeEvent;

    // Check if the swipe was fast enough to change the metric
    if (Math.abs(velocityX) > 300) {
      if (velocityX < 0) {
        // Swipe left to go to the next metric
        setCurrentIndex((prevIndex) => (prevIndex + 1) % dummyData.length);
      } else {
        // Swipe right to go to the previous metric
        setCurrentIndex(
          (prevIndex) => (prevIndex - 1 + dummyData.length) % dummyData.length
        );
      }
    }
  };

  const toggleMetric = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % dummyData.length); // Loop through the options
  };

  return (
    <GestureHandlerRootView style={styles.gestureContainer}>
      <PanGestureHandler onEnded={handleSwipe}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.header}
            onPress={() => setIsExpanded(!isExpanded)} // Toggle expand/collapse
          >
            <Text style={styles.metric}>{dummyData[currentIndex]}</Text>
          </TouchableOpacity>
          {isExpanded && (
            <View style={styles.content}>
              {/* Replace with actual data based on currentIndex */}
              <Text style={styles.metricText}>
                {dummyData[currentIndex] === "Weight Loss"
                  ? "Lost 2 lbs this week"
                  : dummyData[currentIndex] === "Sets"
                  ? "Total Sets: 20"
                  : "Total Reps: 100"}
              </Text>
              <TouchableOpacity
                onPress={toggleMetric}
                style={styles.toggleButton}
              >
                <Text style={styles.toggleButtonText}>Next Metric</Text>
              </TouchableOpacity>
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
  metric: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#4A4A4A",
    borderRadius: 5,
  },
  metricText: {
    color: "#fff",
    marginBottom: 10,
  },
  toggleButton: {
    padding: 10,
    backgroundColor: "#5A6D8D",
    borderRadius: 5,
    alignItems: "center",
  },
  toggleButtonText: {
    color: "#fff",
  },
});

export default ExpandableGraph;
