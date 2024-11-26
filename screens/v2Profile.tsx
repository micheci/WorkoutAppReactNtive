import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Switch,
  Image,
  Alert,
} from "react-native";

const v2Profile = () => {
  const [darkMode, setDarkMode] = useState(false); // State for dark/light mode
  const [contactInfo, setContactInfo] = useState("123-456-7890");
  const [email, setEmail] = useState("user@example.com");

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => console.log("Account deleted"),
        },
      ]
    );
  };

  const handleChangePassword = () => {
    console.log("Navigate to Change Password Page");
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        darkMode ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      {/* Profile Picture */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }} // Replace with actual image URI
          style={styles.profileImage}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.username}>@johndoe</Text>
      </View>

      {/* User Details */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Email:</Text>
        <TextInput
          style={styles.infoValue}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.infoTitle}>Contact Info:</Text>
        <TextInput
          style={styles.infoValue}
          value={contactInfo}
          onChangeText={setContactInfo}
          keyboardType="phone-pad"
        />

        <Text style={styles.infoTitle}>Height:</Text>
        <Text style={styles.infoValue}>5'9" (175 cm)</Text>

        <Text style={styles.infoTitle}>Weight:</Text>
        <Text style={styles.infoValue}>160 lbs (72 kg)</Text>
      </View>

      {/* Options Section */}
      <View style={styles.optionsSection}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={handleChangePassword}
        >
          <Text style={styles.optionButtonText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, styles.deleteButton]}
          onPress={handleDeleteAccount}
        >
          <Text style={styles.optionButtonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>

      {/* Dark Mode Toggle */}
      <View style={styles.darkModeSection}>
        <Text style={styles.darkModeText}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  lightContainer: {
    backgroundColor: "#fff",
  },
  darkContainer: {
    backgroundColor: "#333",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  username: {
    fontSize: 16,
    color: "#888",
  },
  infoSection: {
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  infoValue: {
    fontSize: 16,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  optionsSection: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#FF6347",
  },
  optionButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  darkModeSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  darkModeText: {
    fontSize: 16,
  },
});

export default v2Profile;
