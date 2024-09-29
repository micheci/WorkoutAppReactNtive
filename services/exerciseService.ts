import axios from 'axios';
import * as SecureStore from 'expo-secure-store'

const API_URL = 'http://192.168.1.10:8080'; // Update this to your actual API URL

export const fetchExercises = async () => {
  try {
    // Replace 'YOUR_TOKEN_HERE' with your actual token
    const token = await SecureStore.getItemAsync("token");


    const response = await axios.get(`${API_URL}/exercises`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    
    return response.data; // Axios automatically parses the response data
  } catch (error) {
    console.error("Error fetching exercises:", error);
    throw error; // Re-throw the error if needed for further handling
  }
};
