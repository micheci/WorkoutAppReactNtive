import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { userExerciseStore } from "../store/UserExerciseStore";
import { useHookstate } from "@hookstate/core";
import { UserExercise } from "../interfaces/Iexercises";
import AddExerciseModal from "../modals/addExerciseModal";

const formatDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const ExpandableExercises = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [exerciseModal, setExerciseModal] = useState(false);
  const State = useHookstate(userExerciseStore.userExerciseState);
  const { userExerciseState, fetchExercisesByDate } = userExerciseStore;

  // Fetch exercises when component mounts and whenever currentDate changes
  useEffect(() => {
    const dateString = formatDateString(currentDate);
    fetchExercisesByDate(dateString);
  }, [fetchExercisesByDate, currentDate]);

  const exercisesData = userExerciseState.userExercises.get();
  const exercises = exercisesData.length > 0 ? exercisesData[0].exercises : [];
  console.log(exercises, "Current Exercises");

  const handleSwipe = (event: any) => {
    const { velocityX } = event.nativeEvent;
    if (Math.abs(velocityX) > 300) {
      if (velocityX < 0) {
        handleNextDay();
      } else {
        handlePreviousDay();
      }
    }
  };

  const handleNextDay = async () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(nextDate); // Update current date
    const dateString = formatDateString(nextDate);
    await fetchExercisesByDate(dateString); // Fetch exercises for the new date
  };

  const handlePreviousDay = async () => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(prevDate); // Update current date
    const dateString = formatDateString(prevDate);
    await fetchExercisesByDate(dateString); // Fetch exercises for the new date
  };

  const handleAddExercise = async (exerciseData: UserExercise) => {
    const formattedData = {
      exercise: {
        exerciseId: Number(exerciseData.exerciseId),
      },
      reps: exerciseData.reps,
      sets: exerciseData.sets,
      date: currentDate,
    };

    console.log(
      "Before adding exercise:",
      userExerciseState.userExercises.get()
    ); // Use get() to access current state
    await userExerciseStore.addExercise(formattedData);
    // Refetch exercises after adding a new one
    const dateString = formatDateString(currentDate); // Use the current date
    console.log("currentday", currentDate, "currentdayed", dateString);

    await fetchExercisesByDate(dateString); // Fetch updated exercises
    console.log("After adding exercise:", userExerciseState.get());
    setExerciseModal(false);
  };

  return (
    <GestureHandlerRootView style={styles.gestureContainer}>
      <PanGestureHandler onEnded={handleSwipe}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.header}
            onPress={() => setIsExpanded(!isExpanded)}
          >
            <Text style={styles.date}>{currentDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {isExpanded && (
            <View style={styles.content}>
              <ScrollView>
                {exercises.length > 0 ? (
                  exercises.map((exercise: UserExercise, index: number) => (
                    <View key={index} style={styles.exerciseContainer}>
                      <Text style={styles.exerciseText}>
                        {exercise.exerciseName}: {exercise.reps} reps{" "}
                        {exercise.sets} sets
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.exerciseText}>No exercises found.</Text>
                )}
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => setExerciseModal(true)}
                >
                  <Text style={styles.addButtonText}>Add Exercise</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          )}
          <AddExerciseModal
            visible={exerciseModal}
            onClose={() => setExerciseModal(false)}
            onAddExercise={handleAddExercise}
          />
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
    paddingBottom: 1,
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
  exerciseContainer: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#5A6B8C",
  },
  exerciseText: {
    color: "#fff",
    marginBottom: 5,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ExpandableExercises;
