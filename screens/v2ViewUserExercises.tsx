import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native"; // <-- Add Text here

const V2ViewUserExercises = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Testing</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
});

export default V2ViewUserExercises;
