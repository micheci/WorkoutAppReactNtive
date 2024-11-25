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
