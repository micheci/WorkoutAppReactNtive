// screens/ProfileScreen.tsx
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <Text>Name: </Text>
      <Text>Email: </Text>
      <Button title="Logout" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default ProfileScreen;
