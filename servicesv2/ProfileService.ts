import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { IExercisesPostTransformed } from '../interfaces/Iexercises';

const API_URL = 'http://192.168.1.10:8080'; // Replace with your actual API URL
const apiKey = process.env.EXPO_PUBLIC_TEST_AUTH;

class ProfileService {
  static async getUserInfo() {
    try {
      // Retrieve the token from secure storage
      //const token = await SecureStore.getItemAsync("token"); 
      // if (!token) {
      //   throw new Error("Token not found. Please login again.");
      // }
      // Send a GET request to fetch exercises
      const response = await axios.get(`${API_URL}/api/userprofile/getProfile` ,{
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
  static async updateProfileInfo(data:any) {
    try {
      // Retrieve the token from secure storage
      //const token = await SecureStore.getItemAsync("token"); 
      // if (!token) {
      //   throw new Error("Token not found. Please login again.");
      // }
      // Send a GET request to fetch exercises
      const response = await axios.put(`${API_URL}/api/userprofile/updateProfile` ,data,{
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

export default ProfileService;
