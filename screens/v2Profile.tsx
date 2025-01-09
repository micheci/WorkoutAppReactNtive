import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { profileStore } from "../storev2/ProfileStore";
import { Picker } from "@react-native-picker/picker"; // Install this package
import Slider from "@react-native-community/slider";

const V2Profile = () => {
  const [contactInfo, setContactInfo] = useState("");
  const [email, setEmail] = useState("");
  const [heightFeet, setHeightFeet] = useState("5");
  const [heightInches, setHeightInches] = useState("7");
  const [username, setUsername] = useState("");
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [originalProfile, setOriginalProfile] = useState(null); // Original profile data

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

  const fetchUserProfile = async () => {
    try {
      const userInfo = await profileStore.getUserInformation();

      if (userInfo) {
        setEmail(userInfo.email);
        setContactInfo(userInfo.phoneContact);
        setWeight(userInfo.weight);
        setUsername(userInfo.user.username);

        // Convert total inches to feet and inches for the height
        if (userInfo.height) {
          const totalInches = parseInt(userInfo.height); // Assuming height is stored in inches
          const { feet, inches } = convertToFeetAndInches(totalInches);
          setHeightFeet(feet.toString());
          setHeightInches(inches.toString());
        }

        // Store original profile data
        setOriginalProfile({
          email: userInfo.email,
          phoneContact: userInfo.phoneContact,
          height: userInfo.height,
          weight: userInfo.weight,
        });
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleChangePassword = () => {
    console.log("Navigate to Change Password Page");
  };
  const convertToTotalInches = (feet: string, inches: string) => {
    return parseInt(feet) * 12 + parseInt(inches); // 1 foot = 12 inches
  };
  const convertToFeetAndInches = (totalInches: number) => {
    const feet = Math.floor(totalInches / 12); // Get the whole number of feet
    const inches = totalInches % 12; // Get the remaining inches
    return { feet, inches };
  };
  const handleSaveChanges = () => {
    const totalInches = convertToTotalInches(heightFeet, heightInches);
    const updatedProfile = {
      email,
      phoneContact: contactInfo,
      height: totalInches.toString(), // Send total inches as string
      weight,
    };

    // Compare current state with the original profile
    const isChanged =
      JSON.stringify(updatedProfile) !== JSON.stringify(originalProfile);

    if (isChanged) {
      console.log("Profile updated:", updatedProfile);
      profileStore.updateProfileInformation(updatedProfile);
      setOriginalProfile(updatedProfile); // Update original profile to reflect saved changes
    } else {
      console.log("No changes detected. Update skipped.");
    }

    setIsEditing(false); // Exit edit mode
  };

  return (
    <SafeAreaView style={[styles.container, styles.lightContainer]}>
      {/* Profile Picture */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{username}</Text>
      </View>

      {/* User Details */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Email:</Text>
        {isEditing ? (
          <TextInput
            style={[styles.infoValue, isEditing && styles.inputField]}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        ) : (
          <Text style={styles.infoValue}>{email}</Text>
        )}

        <Text style={styles.infoTitle}>Contact Info:</Text>
        {isEditing ? (
          <TextInput
            style={[styles.infoValue, isEditing && styles.inputField]}
            value={contactInfo}
            onChangeText={setContactInfo}
            keyboardType="phone-pad"
          />
        ) : (
          <Text style={styles.infoValue}>{contactInfo}</Text>
        )}

        <View style={styles.infoSection}>
          {/* Height Section */}
          <Text style={styles.infoTitle}>Height:</Text>
          {isEditing ? (
            <View style={styles.inputRow}>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={heightFeet}
                  style={styles.picker}
                  onValueChange={setHeightFeet}
                >
                  {/* Feet Picker */}
                  {[...Array(10).keys()].map((i) => (
                    <Picker.Item
                      key={i}
                      label={`${i + 4} ft`}
                      value={`${i + 4}`}
                    />
                  ))}
                </Picker>
              </View>

              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={heightInches}
                  style={styles.picker}
                  onValueChange={setHeightInches}
                >
                  {/* Inches Picker */}
                  {[...Array(12).keys()].map((i) => (
                    <Picker.Item key={i} label={`${i} in`} value={`${i}`} />
                  ))}
                </Picker>
              </View>
            </View>
          ) : (
            <Text style={styles.infoValue}>
              {heightFeet && heightInches
                ? `${heightFeet} ft ${heightInches} in`
                : "N/A"}
            </Text>
          )}

          {/* Weight Section */}
          <Text style={styles.infoTitle}>Weight:</Text>
          {isEditing ? (
            <View style={styles.inputRowWeight}>
              <Slider
                style={styles.slider}
                value={weight}
                onValueChange={setWeight}
                minimumValue={30}
                maximumValue={200}
                step={1}
              />
              <View style={styles.sliderValueContainer}>
                <Text style={styles.sliderValue}>{weight} kg</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.infoValue}>
              {weight ? `${weight} kg` : "N/A"}
            </Text>
          )}
        </View>
      </View>

      {/* Options Section */}
      {/* Options Section */}
      <View style={styles.optionsSection}>
        {!isEditing && (
          <>
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
          </>
        )}

        <TouchableOpacity
          style={[styles.optionButton, styles.editButton]}
          onPress={() => {
            if (isEditing) {
              handleSaveChanges(); // Save changes if in edit mode
            } else {
              setIsEditing(true); // Enable edit mode
            }
          }}
        >
          <Text style={styles.optionButtonText}>
            {isEditing ? "Save" : "Edit"}
          </Text>
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
  inputField: {
    backgroundColor: "#f0f0f0", // Add background color for input fields in edit mode
    borderColor: "#007BFF", // Add border color for input fields in edit mode
    borderWidth: 1, // Add border width
    borderRadius: 5, // Optional: rounded borders
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
  editButton: {
    backgroundColor: "#28A745",
  },
  optionButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  pickerContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 200, // Increased space between height and weight section
  },
  inputRowWeight: {
    flexDirection: "row",
    alignItems: "center",
  },
  sliderContainer: {
    marginVertical: 10,
  },
  sliderValue: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  sliderValueContainer: {
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default V2Profile;
