import axios from 'axios';
import * as SecureStore from 'expo-secure-store'
import { ExerciseResponse, UserExercise } from '../interfaces/Iexercises';

const API_URL = 'http://192.168.1.10:8080'; // Update this to your actual API URL

export const addUserExercise = async (exerciseData:any) => {
  try {
    // Replace 'YOUR_TOKEN_HERE' with your actual token
    const token = await SecureStore.getItemAsync("token");
    console.log(exerciseData,'datatobackend')
    const response = await axios.post(`${API_URL}/addExercise`,exerciseData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    }); 
    console.log(response.data,'from backend')
    return response.data; // Axios automatically parses the response data
  } catch (error) {
    console.error("Error adding exercises:", error);
    throw error; // Re-throw the error if needed for further handling
  }
};
//Get all users daily exercises
export const getCurrentDayExercises = async () => {
    try {
      // Replace 'YOUR_TOKEN_HERE' with your actual token
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.get(`${API_URL}/user/exercises`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }); 
      return response.data; // Axios automatically parses the response data
    } catch (error) {
      console.error("Error adding exercises:", error);
      throw error; // Re-throw the error if needed for further handling
    }
  };

 // Function to get exercises for a specific date
 export const getExercisesByDate = async (date: string): Promise<any[]> => {
  try {
    const token = await SecureStore.getItemAsync("token");
    console.log('inService',date)
    const response = await axios.get(`${API_URL}/user/exercises/${date}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Error fetching date exercises:", error);
    throw error; 
  }
};
  
 // Function to get exercises for a specific date
 export const getExercisesByRange = async (): Promise<ExerciseResponse> => {
  try {
    const token = await SecureStore.getItemAsync("token");
    const response = await axios.get(`${API_URL}/user/exercises/range`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    console.log(response.data,'inservie')
    return response.data; 
  } catch (error) {
    console.error("Error fetching date exercises:", error);
    throw error; 
  }
};
  