import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { AuthProvider } from "./context/AuthContext";
import { ExerciseProvider } from "./context/ExerciseContext";
import Dashboard from "./screens/DashBoard";
import DashboardV2 from "./screens/DashBoardv2";
import v2ExerciseList from "./components/v2ExerciseList";
import v2ExerciseDetails from "./screens/v2ExerciseDetails";
import v2AddExercise from "./screens/v2AddExercise";
import v2Graphs from "./screens/v2Graphs";
import v2Nutrition from "./screens/v2Nutrition";
import v2WeightLoseRecipes from "./screens/v2WeightLoseRecipes";
import v2Profile from "./screens/v2Profile";
import v2ViewUserExercises from "./screens/v2ViewUserExercises";
import V2AddWorkout from "./screens/v2AddWorkout";
import ViewAddWorkoutHome from "./screens/ViewOrAddWorkoutHome";
import V2BodyDiagram from "./screens/v2BodyDiagram";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <ExerciseProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Dashboard2"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Dashboard2" component={DashboardV2} />
            <Stack.Screen name="Exercises" component={v2ExerciseList} />
            <Stack.Screen name="ExerciseDetail" component={v2ExerciseDetails} />
            <Stack.Screen name="AddExercise" component={v2AddExercise} />
            <Stack.Screen name="Graphs" component={v2Graphs} />
            <Stack.Screen name="Nutrition" component={v2Nutrition} />
            <Stack.Screen
              name="WeightLoseRecipes"
              component={v2WeightLoseRecipes}
            />
            <Stack.Screen name="Profile2" component={v2Profile} />
            <Stack.Screen
              name="ViewUserExercises"
              component={v2ViewUserExercises}
            />
            <Stack.Screen name="V2AddWorkout" component={V2AddWorkout} />
            <Stack.Screen
              name="ViewAddWorkoutHome"
              component={ViewAddWorkoutHome}
            />
            <Stack.Screen name="BodyDiagram" component={V2BodyDiagram} />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </ExerciseProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
