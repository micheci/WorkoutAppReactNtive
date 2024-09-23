// screens/LoginScreen.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigation = useNavigation();

  // const handleLogin = async () => {
  //   // Placeholder for your login logic
  //   if (username && password) {
  //     console.log("Logging in with:", username, password);
  //     // Call your authentication service here
  //     const userToken = await login(username, password);
  //     // Example: authService.login(username, password).then(...).catch(...);
  //   } else {
  //     setError("Please enter both username and password.");
  //   }
  // };
  const handleLogin = async () => {
    if (username && password) {
      setLoading(true); // Start loading
      try {
        await login(username, password); // Call the context login function
        navigation.navigate("Profile"); // Redirect to Profile screen on success
      } catch (error) {
        setError("Login failed. Please check your credentials.");
      } finally {
        setLoading(false); // Stop loading in finally block
      }
    } else {
      setError("Please enter both username and password.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {loading ? ( // Show loading animation
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default LoginScreen;
