import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Modal,
  TouchableOpacity,
  Text,
} from "react-native";
import { Calendar } from "react-native-calendars";

const WorkoutLogAnimationModal = ({
  visible,
  onClose,
  loggedDate,
  toDashboard,
}) => {
  const [calendarHeight] = useState(new Animated.Value(0));
  const [markedDate, setMarkedDate] = useState(null);

  useEffect(() => {
    if (visible) {
      // Expand the calendar from bottom
      Animated.timing(calendarHeight, {
        toValue: 400, // Final height for the calendar
        duration: 500,
        useNativeDriver: false,
      }).start();

      // Immediately mark the selected date without delay
      setMarkedDate(loggedDate.split("T")[0]);
    } else {
      calendarHeight.setValue(0);
      setMarkedDate(null); // Reset marked date when modal is closed
    }
  }, [visible, loggedDate]);

  const handleNavigateDashboard = () => {
    // Collapse the calendar first
    Animated.timing(calendarHeight, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      // Then call the toDashboard function after the animation completes
      onClose(); // Close the modal
      toDashboard(); // Call the toDashboard function
    });
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <Animated.View
          style={[styles.calendarContainer, { height: calendarHeight }]}
        >
          <Calendar
            current={loggedDate}
            markedDates={{
              [markedDate]: {
                marked: true,
                dotColor: "gold",
                selected: true,
                selectedColor: "gold",
              },
            }}
            theme={{
              todayTextColor: "#FF6347",
              dotColor: "gold",
              selectedDotColor: "#ffffff",
            }}
          />
        </Animated.View>

        {/* Only one button is rendered */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleNavigateDashboard}
        >
          <Text style={styles.buttonText}>Go to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Dimmed background
    justifyContent: "flex-end",
    alignItems: "center", // Center the button horizontally
  },
  calendarContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    width: "100%",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 32,
    width: "80%", // Adjust the button width
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default WorkoutLogAnimationModal;
