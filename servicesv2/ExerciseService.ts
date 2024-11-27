import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { IExercisesPostTransformed } from '../interfaces/Iexercises';

const API_URL = 'http://192.168.1.10:8080'; // Replace with your actual API URL

class ExerciseService {
  static async addUserExercise(data:IExercisesPostTransformed) {
    try {
      // Retrieve the token from secure storage
      //const token = await SecureStore.getItemAsync("token"); 
const token='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJIT0xBIiwiaWF0IjoxNzMyNzQ0OTg1LCJleHAiOjE3MzI4NTI5ODV9.hFfnzrw8A6p09P6kbviosQJqu2UTFagYUU_XQR2YfuM'
      if (!token) {
        throw new Error("Token not found. Please login again.");
      }
console.log('beforeSrvice')
      // Send a GET request to fetch exercises
      const response = await axios.post(`${API_URL}/addUserExercise`,data ,{
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
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
}

export default ExerciseService;
