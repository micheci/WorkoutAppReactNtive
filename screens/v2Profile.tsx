import React, { useEffect, useState } from "react";
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
import { profileStore } from "../storev2/profileStore";

const V2Profile = () => {
  const [darkMode, setDarkMode] = useState(false); // State for dark/light mode
  const [contactInfo, setContactInfo] = useState("");
  const [email, setEmail] = useState("");
  const [height, setHeight] = useState("");
  const [username, setUsername] = useState("");

  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(true); // For loading state

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

  // Function to fetch user profile
  const fetchUserProfile = async () => {
    try {
      const userInfo = await profileStore.getUserInformation(); // Fetch user info from your service

      if (userInfo) {
        // Map API response to your state variables
        setEmail(userInfo.email);
        setContactInfo(userInfo.phoneContact);
        setHeight(userInfo.height); // Set height
        setWeight(userInfo.weight); // Set weight
        setUsername(userInfo.user.username);
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Call fetchUserProfile when the component mounts
  useEffect(() => {
    fetchUserProfile();
  }, []); // Empty dependency array to call once on mount

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
        <TextInput
          style={styles.name}
          value={username}
          onChangeText={setUsername}
        />
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
        <TextInput
          style={styles.infoValue}
          value={height.toString()} // Ensure height is a string for TextInput
          onChangeText={(text) => setHeight(text)}
        />

        <Text style={styles.infoTitle}>Weight:</Text>
        <TextInput
          style={styles.infoValue}
          value={weight.toString()} // Ensure weight is a string for TextInput
          onChangeText={(text) => setWeight(text)}
        />
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

export default V2Profile;
