import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../interfaces/StackInterfaces";

// Sample exercise list with IDs

const v2Nutrition = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // need to change this so it hits the specific pages so
  //wirght lose or high protein
  const goToRecipes = (category: string) => {
    navigation.navigate("RecipeList", { category });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Nutrition Categories</Text>
      <View style={styles.categories}>
        {/* Weight Loss */}
        <TouchableOpacity
          style={styles.categoryBox}
          onPress={() => goToRecipes("Weight Loss")}
        >
          <Text style={styles.categoryText}>Weight Loss</Text>
        </TouchableOpacity>

        {/* High Protein */}
        <TouchableOpacity
          style={styles.categoryBox}
          onPress={() => goToRecipes("High Protein")}
        >
          <Text style={styles.categoryText}>High Protein</Text>
        </TouchableOpacity>

        {/* Vegan/Vegetarian */}
        <TouchableOpacity
          style={styles.categoryBox}
          onPress={() => goToRecipes("Vegan/Vegetarian")}
        >
          <Text style={styles.categoryText}>Vegan/Vegetarian</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  categories: {
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },
  categoryBox: {
    width: "90%",
    padding: 20,
    backgroundColor: "#FF6347",
    borderRadius: 10,
    alignItems: "center",
  },
  categoryText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default v2Nutrition;
