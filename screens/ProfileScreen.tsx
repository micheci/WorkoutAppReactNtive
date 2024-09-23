import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import AddExerciseModal from "../modals/addExerciseModal";

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    await logout(); // Call the logout function from context
  };

  const handleAddExercise = () => {
    // Navigate to the AddExercise screen (you'll implement this screen)
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Welcome, {user?.username}!</Text>
        <View style={styles.buttonContainer}>
          <Button title="Add Exercise" onPress={() => setModalVisible(true)} />
        </View>
      </View>

      <AddExerciseModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddExercise={handleAddExercise}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40, // Space for the status bar
    paddingBottom: 20, // Space for the button
  },
  logoutButton: {
    position: "absolute",
    top: 40, // Avoids overlap with status bar
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
    paddingHorizontal: 16, // Horizontal padding for better spacing
  },
  title: {
    fontSize: Dimensions.get("window").width * 0.06, // Responsive font size
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end", // Push the button to the bottom
    marginBottom: 20, // Add margin for spacing
    width: "100%", // Make sure it takes full width
  },
});

export default ProfileScreen;
