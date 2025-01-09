import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { IExercisesPostTransformed } from '../interfaces/Iexercises';

const API_URL = 'http://192.168.1.10:8080'; // Replace with your actual API URL

class ProfileService {
  static async getUserInfo() {
    try {
      // Retrieve the token from secure storage
      //const token = await SecureStore.getItemAsync("token"); 
const token='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJIT0xBIiwiaWF0IjoxNzM2Mzc2MDE1LCJleHAiOjE3MzY0ODQwMTV9.7cTFMPXM_kHgboJt2bX5X9U6ZzgSryvkfHwf9cC5zgQ'
      if (!token) {
        throw new Error("Token not found. Please login again.");
      }
      // Send a GET request to fetch exercises
      const response = await axios.get(`${API_URL}/api/userprofile/getProfile` ,{
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
  static async updateProfileInfo(data:any) {
    try {
      // Retrieve the token from secure storage
      //const token = await SecureStore.getItemAsync("token"); 
const token='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJIT0xBIiwiaWF0IjoxNzM2Mzc2MDE1LCJleHAiOjE3MzY0ODQwMTV9.7cTFMPXM_kHgboJt2bX5X9U6ZzgSryvkfHwf9cC5zgQ'
      if (!token) {
        throw new Error("Token not found. Please login again.");
      }
      // Send a GET request to fetch exercises
      const response = await axios.put(`${API_URL}/api/userprofile/updateProfile` ,data,{
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

export default ProfileService;
