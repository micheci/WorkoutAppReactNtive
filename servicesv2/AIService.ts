import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { IExercisesPostTransformed } from '../interfaces/Iexercises';

const API_URL = 'http://192.168.1.10:8080'; // Replace with your actual API URL

class AIService {
  static async generateAIWorkout(muscleGroupsArray:Array<string>) {
    try {
      // Retrieve the token from secure storage
      //const token = await SecureStore.getItemAsync("token"); 
const token='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJIT0xBIiwiaWF0IjoxNzM1ODM3MzE0LCJleHAiOjE3MzU5NDUzMTR9.GJnDQq-BY01T7dCMsQFy7rtfXDACcSDzQ0xIpPyQEp4'
      if (!token) {
        throw new Error("Token not found. Please login again.");
      }
      // Send a GET request to fetch exercises
      const response = await axios.post(`${API_URL}/api/workout/generate`,muscleGroupsArray ,{
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
console.log(response,'inservice',muscleGroupsArray)
      return response.data; // Return the response data
    } catch (error) {
      console.error("Error fetching exercises:", error);
      throw error; // Re-throw the error for further handling
    }
  }

  // Add other service methods here as needed
}

export default AIService;
