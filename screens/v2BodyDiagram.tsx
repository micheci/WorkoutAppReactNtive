import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator, // Import the ActivityIndicator
} from "react-native";
import { AIStore } from "../storev2/AiStore";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../interfaces/StackInterfaces";

const V2BodyDiagram = () => {
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [activeParts, setActiveParts] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const bodyParts = [
    {
      name: "Chest",
      shape: "rect",
      coords: {
        x: 160 / 800,
        y: 240 / 600,
        width: (242 - 143) / 800,
        height: (601 - 580) / 600,
      },
    },
    {
      name: "Abs",
      shape: "rect",
      coords: {
        x: 160 / 800,
        y: 270 / 600,
        width: (242 - 143) / 800,
        height: (531 - 484) / 600,
      },
    },
    {
      name: "Quads",
      shape: "rect",
      coords: {
        x: 160 / 800,
        y: 320 / 600,
        width: (242 - 143) / 800,
        height: (580 - 530) / 600,
      },
    },
    {
      name: "Shoulder (Left)",
      shape: "rect",
      coords: {
        x: 144 / 800,
        y: 216 / 600,
        width: (91 - 144) / 800,
        height: (256 - 216) / 600,
      },
    },
    {
      name: "Shoulder (Right)",
      shape: "rect",
      coords: {
        x: 263 / 800,
        y: 230 / 600,
        width: (291 - 243) / 800,
        height: (260 - 240) / 600,
      },
    },
    {
      name: "Back",
      shape: "rect",
      coords: {
        x: 531 / 800,
        y: 235 / 600,
        width: (606 - 491) / 800,
        height: (300 - 240) / 600,
      },
    },
    {
      name: "Triceps",
      shape: "rect",
      coords: {
        x: 665 / 800,
        y: 255 / 600,
        width: (630 - 591) / 800,
        height: (260 - 230) / 600,
      },
    },
    {
      name: "Glutes",
      shape: "rect",
      coords: {
        x: 531 / 800,
        y: 300 / 600,
        width: (630 - 515) / 800,
        height: (260 - 230) / 600,
      },
    },
    {
      name: "Hamstring",
      shape: "rect",
      coords: {
        x: 530 / 800,
        y: 370 / 600,
        width: (630 - 515) / 800,
        height: (260 - 210) / 600,
      },
    },
  ];

  const handlePress = (bodyPart: string) => {
    if (activeParts.includes(bodyPart)) {
      setActiveParts(activeParts.filter((part) => part !== bodyPart));
    } else {
      setActiveParts([...activeParts, bodyPart]);
    }
  };

  const generateWorkoutAI = async (activeParts: string[]) => {
    console.log(activeParts, "the muscle groups sent to AI");

    setLoading(true); // Set loading to true when starting the API request

    try {
      const apiResponse = await AIStore.generateAIWorkouts(activeParts);
      navigation.navigate("V2GeneratedWorkouts", {
        state: { workouts: apiResponse.workouts },
      });
    } catch (e) {
      console.error("Error generating workouts:", e);
    } finally {
      setLoading(false); // Set loading to false after the request is completed
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Message */}
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>
          {activeParts.length === 0
            ? "Select one or more muscle groups to generate a workout specifically for you."
            : `Selected Muscle Groups: ${activeParts.join(", ")}`}
        </Text>
      </View>

      {/* Body Diagram */}
      <ImageBackground
        source={require("../assets/diagramHuman.avif")}
        style={styles.image}
        resizeMode="contain"
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setImageDimensions({ width, height });
        }}
      >
        {bodyParts.map((part, index) => {
          if (part.shape === "rect") {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  position: "absolute",
                  left: part.coords.x * imageDimensions.width,
                  top: part.coords.y * imageDimensions.height,
                  width: part.coords.width * imageDimensions.width,
                  height: part.coords.height * imageDimensions.height,
                  backgroundColor: activeParts.includes(part.name)
                    ? "rgba(255, 0, 0, 0.3)" // Active color
                    : "rgba(0, 255, 0, 0.3)", // Default color
                }}
                onPress={() => handlePress(part.name)}
              />
            );
          }
        })}
      </ImageBackground>

      {/* Bottom Generate Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.generateButton,
            activeParts.length === 0 && styles.disabledButton, // Gray out when no parts selected
            loading && styles.loadingButton, // Apply loading styles when fetching
          ]}
          disabled={activeParts.length === 0 || loading} // Disable when no parts selected or while loading
          onPress={() => generateWorkoutAI(activeParts)}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" /> // Show loading spinner
          ) : (
            <Text style={styles.buttonText}>Generate</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
  },
  messageContainer: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  messageText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  buttonContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f5f5f5",
  },
  generateButton: {
    backgroundColor: "#007bff",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  loadingButton: {
    backgroundColor: "#666", // Button color when loading
  },
  disabledButton: {
    backgroundColor: "#ccc", // Gray when disabled
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default V2BodyDiagram;
