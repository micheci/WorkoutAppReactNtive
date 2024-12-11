import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { IExercisesPostTransformed } from '../interfaces/Iexercises';

const API_URL = 'http://192.168.1.10:8080'; // Replace with your actual API URL

class WorkoutService {
  static async addUserWorkout(data:any) {
    try {
      // Retrieve the token from secure storage
      //const token = await SecureStore.getItemAsync("token"); 
const token='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJIT0xBIiwiaWF0IjoxNzMyOTk1OTQ2LCJleHAiOjE3MzMxMDM5NDZ9.oCw_zgDdmPhc2CEL_J9rAGKAlJfR_zFNWRJdX4onYsE'
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
const token='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJIT0xBIiwiaWF0IjoxNzMzODc1NTczLCJleHAiOjE3MzM5ODM1NzN9.cQNOUOz8Pph5a0LGT7zzMHqkubW-cumbIEYtrJqi6pI'
      if (!token) {
        throw new Error("Token not found. Please login again.");
      }
console.log('beforeSrvice')
      const response = await axios.post(`${API_URL}/api/workout/create`,data ,{
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
}

export default WorkoutService;
