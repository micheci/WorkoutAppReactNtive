import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { userExerciseStore } from "../store/UserExerciseStore";
import { DailyExerciseData, UserExercise } from "../interfaces/Iexercises";
import ProfileHeader from "../components/ProfileHeader";
import AddExercise from "../components/buttons/AddExercise";

const ExerciseSwiper = () => {
  const [exerciseData, setExerciseData] = useState<DailyExerciseData[]>([]);
  const [loading, setLoading] = useState(true);
  const windowWidth = Dimensions.get("window").width;

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await userExerciseStore.fetchExercisesRange();
      console.log(data, "exercisesData");
      setExerciseData(data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddExercise = async (exerciseData: UserExercise) => {
    await userExerciseStore.addExercise(exerciseData);
    await fetchData(); // Refresh the data after adding
  };

  const renderItem = ({ item }: { item: DailyExerciseData }) => (
    <View style={[styles.card, { width: windowWidth }]}>
      <Text style={styles.date}>{item.date}</Text>
      {item.exercises.length > 0 ? (
        item.exercises.map((exercise) => (
          <View key={exercise.id} style={styles.exerciseContainer}>
            <Text style={styles.exercise}>
              {exercise.exerciseName} - {exercise.reps} reps, {exercise.sets}{" "}
              sets
              {exercise.weight ? `, ${exercise.weight} lbs` : ""}
              {exercise.notes ? ` - ${exercise.notes}` : ""}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.noExercises}>No exercises recorded for today.</Text>
      )}
    </View>
  );

  const initialScrollIndex = 15; // Start at index 15

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ProfileHeader />
      {exerciseData.length > 0 ? (
        <FlatList
          data={exerciseData}
          renderItem={renderItem}
          keyExtractor={(item) => item.date}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          snapToInterval={windowWidth}
          decelerationRate="fast"
          initialScrollIndex={initialScrollIndex}
          getItemLayout={(data, index) => ({
            length: windowWidth,
            offset: windowWidth * index,
            index,
          })}
          onScrollToIndexFailed={(info) => {
            console.warn(
              `Failed to scroll to index ${info.index}: ${info.highestMeasuredFrameIndex}`
            );
          }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No exercises recorded.</Text>
            </View>
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No exercise data available.</Text>
        </View>
      )}
      <AddExercise onAddExercise={handleAddExercise} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282828",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    height: "100%",
    justifyContent: "flex-start", // Align items to the start
    alignItems: "center",
    backgroundColor: "#3A4D6A",
    borderWidth: 1, // Add border
    borderColor: "#4A4A4A", // Darker border color
    borderRadius: 8, // Rounded corners
    padding: 20,
    shadowColor: "#000", // Shadow for elevation
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  date: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
    color: "#FFFFFF", // Change date text color to white
  },
  exerciseContainer: {
    borderWidth: 1, // Border for each exercise
    borderColor: "#4A4A4A", // Darker border color
    borderRadius: 5, // Rounded corners for each exercise
    padding: 10,
    marginVertical: 5, // Space between exercises
    width: "100%", // Make sure it takes the full width
  },
  exercise: {
    fontSize: 18,
    color: "#FFFFFF", // Change exercise text color to white
  },
  noExercises: {
    fontSize: 16,
    color: "#999",
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
  },
});

export default ExerciseSwiper;
