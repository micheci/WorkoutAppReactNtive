// ProfileHeader.js
import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { useAuth } from "../context/AuthContext";

const ProfileHeader = () => {
  const { user } = useAuth(); // Access user from AuthContext
  console.log(user, "user!");
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}> Hi {user?.username || "User"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40, // Adds padding for the status bar
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "#282828",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default ProfileHeader;
