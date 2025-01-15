import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { IExercisesPostTransformed } from '../interfaces/Iexercises';

const API_URL = 'http://192.168.1.10:8080'; // Replace with your actual API URL
const apiKey = process.env.EXPO_PUBLIC_TEST_AUTH;

class WorkoutService {
  static async addUserWorkout(data:any) {
    try {
      // Retrieve the token from secure storage
      //const token = await SecureStore.getItemAsync("token"); 
const token='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJIT0xBIiwiaWF0IjoxNzM1ODM3MzE0LCJleHAiOjE3MzU5NDUzMTR9.GJnDQq-BY01T7dCMsQFy7rtfXDACcSDzQ0xIpPyQEp4'
      if (!token) {
        throw new Error("Token not found. Please login again.");
      }
console.log('beforeSrvice')
      // Send a GET request to fetch exercises
//       const response = await axios.post(`${API_URL}/addUserExercise`,data ,{
//         headers: {
//           Authorization: `Bearer ${token}`, // Include the token in the Authorization header
//         },
//       });
// console.log(response,'inservice')
//       return response.data; // Return the response data
    } catch (error) {
      console.error("Error fetching exercises:", error);
      throw error; // Re-throw the error for further handling
    }
  }

  // Add other service methods here as needed
  static async saveAIWorkout(data:any) {
    try {
      // Retrieve the token from secure storage
      //const token = await SecureStore.getItemAsync("token"); 
      // if (!token) {
      //   throw new Error("Token not found. Please login again.");
      // }
console.log('beforeSrvice')
      const response = await axios.post(`${API_URL}/api/workout/create`,data ,{
        headers: {
          Authorization: `Bearer ${apiKey}`, // Include the token in the Authorization header
        },
      });
 console.log(response,'inservice')
       return response.data; // Return the response data
    } catch (error) {
      console.error("Error fetching exercises:", error);
      throw error; // Re-throw the error for further handling
    }
  }

   // Add other service methods here as needed
   static async getUserWorkouts() {
    console.log("Environment Variables:", process.env);

    try {
      // Retrieve the token from secure storage
      //const token = await SecureStore.getItemAsync("token"); 
      // if (!token) {
      //   throw new Error("Token not found. Please login again.");
      // }
      console.log(apiKey,'KEY')
      const response = await axios.get(`${API_URL}/api/workout/user-workouts` ,{
        headers: {
          Authorization: `Bearer ${apiKey}`, // Include the token in the Authorization header
        },
      });
 console.log('fetching user workouts')
       return response.data; // Return the response data
    } catch (error) {
      console.error("Error fetching exercises:", error);
      throw error; // Re-throw the error for further handling
    }
  }

  //Logging user workou
  static async logUserWorkout(data:any) {
    try {
      // Retrieve the token from secure storage
      //const token = await SecureStore.getItemAsync("token"); 
      // if (!token) {
      //   throw new Error("Token not found. Please login again.");
      // }
console.log('beforeSrvice')
      // Send a GET request to fetch exercises
      const response = await axios.post(`${API_URL}/api/workout/add`,data ,{
        headers: {
          Authorization: `Bearer ${apiKey}`, // Include the token in the Authorization header
        },
      });
console.log(response,'inservice')
      return response.data; // Return the response data
    } catch (error) {
      console.error("Error fetching exercises:", error);
      throw error; // Re-throw the error for further handling
    }
  }
}

export default WorkoutService;
