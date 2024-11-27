import React from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";

const V2WeightLoseRecipes = () => {
  const weightLossRecipes = [
    {
      id: "1",
      title: "Grilled Chicken Salad",
      description:
        "A healthy salad with grilled chicken, mixed greens, and a light vinaigrette.",
      calories: 300,
    },
    {
      id: "2",
      title: "Zucchini Noodles with Pesto",
      description: "Low-carb zucchini noodles tossed in a fresh basil pesto.",
      calories: 250,
    },
    {
      id: "3",
      title: "Berry Smoothie Bowl",
      description:
        "A refreshing smoothie bowl made with mixed berries and topped with granola.",
      calories: 200,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Weight Loss Recipes</Text>
      <FlatList
        data={weightLossRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.recipeItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.calories}>Calories: {item.calories}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  recipeItem: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  calories: {
    fontSize: 12,
    color: "#888",
  },
});

export default V2WeightLoseRecipes;
