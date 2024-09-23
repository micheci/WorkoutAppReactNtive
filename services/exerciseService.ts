// services/exerciseService.ts
export const fetchExercises = async () => {
    // Replace with your actual API endpoint
    const response = await fetch("https://your-api.com/exercises");
    const data = await response.json();
    return data; // Adjust based on your API response structure
  };
  