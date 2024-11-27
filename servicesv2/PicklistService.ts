import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = 'http://192.168.1.10:8080'; // Replace with your actual API URL

class PicklistService {
  static async getAllExercises() {
    try {
      // Retrieve the token from secure storage
      //const token = await SecureStore.getItemAsync("token"); 
const token='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJIT0xBIiwiaWF0IjoxNzMyNzMxOTgyLCJleHAiOjE3MzI4Mzk5ODJ9.tGX1v80_slpgo50UDwXayCq1ci55ZyblSKqj1029yf8'
      if (!token) {
        throw new Error("Token not found. Please login again.");
      }

      // Send a GET request to fetch exercises
      const response = await axios.get(`${API_URL}/allExercises`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      return response.data; // Return the response data
    } catch (error) {
      console.error("Error fetching exercises:", error);
      throw error; // Re-throw the error for further handling
    }
  }

  // Add other service methods here as needed
}

export default PicklistService;
