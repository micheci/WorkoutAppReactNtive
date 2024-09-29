import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import AddExerciseModal from "../modals/addExerciseModal";
import { userExerciseStore } from "../store/UserExerciseStore";
import { Exercise, ExerciseResponse } from "../interfaces/Iexercises";

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [todayExercises, setTodayExercises] = useState<ExerciseResponse[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [noExercisesMessage, setNoExercisesMessage] = useState("");

  const handleLogout = async () => {
    await logout();
  };

  // Fetch exercises for a given date
  const getDailyExercise = async (date: Date) => {
    try {
      console.log("Fetching exercises for date:", date);
      const formattedDate = date.toISOString().split("T")[0]; // Format to 'YYYY-MM-DD'
      const response = await userExerciseStore.fetchExercisesByDate(
        formattedDate
      );

      if (response.length === 0) {
        setTodayExercises([]);
        setNoExercisesMessage(`No exercises found for ${formattedDate}.`);
      } else {
        setTodayExercises(response);
        setNoExercisesMessage("");
      }
    } catch (e) {
      console.error(e);
      setTodayExercises([]);
      setNoExercisesMessage("Error fetching exercises.");
    }
  };

  useEffect(() => {
    getDailyExercise(currentDate); // Fetch exercises for the current date
  }, [currentDate]); // Add currentDate as a dependency

  // Handle swiping right (yesterday)
  const handleSwipeRight = () => {
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);
    setCurrentDate(yesterday); // Update the current date to yesterday
  };

  // Handle swiping left (tomorrow)
  const handleSwipeLeft = () => {
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate() + 1);
    setCurrentDate(tomorrow); // Update the current date to tomorrow
  };

  const handleAddExercise = async (exerciseData: any) => {
    const formattedData = {
      exercise: {
        exerciseId: parseInt(exerciseData.exerciseId),
      },
      date: new Date().toISOString().split("T")[0],
      reps: exerciseData.reps,
      sets: exerciseData.sets,
    };

    await userExerciseStore.addExercise(formattedData);
    setModalVisible(false);
  };

  const renderExerciseItem = ({ item }: any) => (
    <View style={styles.exerciseItem}>
      <Text>{`Exercise ID: ${item.exercise.exerciseId}`}</Text>
      <Text>{`Reps: ${item.reps}`}</Text>
      <Text>{`Sets: ${item.sets}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Welcome, {user?.username}!</Text>

        {noExercisesMessage ? (
          <Text style={styles.message}>{noExercisesMessage}</Text>
        ) : (
          <FlatList
            data={todayExercises}
            renderItem={renderExerciseItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.exerciseList}
          />
        )}

        <View style={styles.buttonContainer}>
          <Button title="Add Exercise" onPress={() => setModalVisible(true)} />
        </View>
      </View>

      <AddExerciseModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddExercise={handleAddExercise}
      />

      {/* Example buttons to simulate swipe actions */}
      <View style={styles.swipeButtons}>
        <Button title="Swipe Left (Tomorrow)" onPress={handleSwipeLeft} />
        <Button title="Swipe Right (Yesterday)" onPress={handleSwipeRight} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingBottom: 20,
  },
  logoutButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: Dimensions.get("window").width * 0.06,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
    width: "100%",
  },
  exerciseList: {
    width: "100%",
    marginBottom: 20,
  },
  exerciseItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  message: {
    fontSize: Dimensions.get("window").width * 0.05,
    color: "gray",
    textAlign: "center",
    marginVertical: 20,
  },
  swipeButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
});

export default ProfileScreen;
