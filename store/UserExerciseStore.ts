/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { hookstate } from '@hookstate/core';
import { ExerciseResponse, UserExercise } from '../interfaces/Iexercises'
import { addUserExercise, getCurrentDayExercises, getExercisesByDate, getExercisesByRange } from '../services/userExercisesService';


async function addExercise(exerciseData:any) {
  try {  
    const response = await addUserExercise(exerciseData); // Fetch exercises from the backend
    return response;
  } catch (e) {
    console.error(e);
  }
}

// Fetch the current day exercies
async function getDailyExercise() {
    try {  
      const response = await getCurrentDayExercises(); // Fetch exercises from the backend
      return response;
    } catch (e) {
      console.error(e);
    }
  }

  // Fetch the users exercise based on date
  export const fetchExercisesByDate = async (date: string): Promise<UserExercise[]> => {
    try {
      const response = await getExercisesByDate(date); 
      return response; 
    } catch (e) {
      console.error(e);
      throw e; 
    }
  };

  // Fetch the users in a range of 15 days before and 10 days after
  export const fetchExercisesRange = async (): Promise<ExerciseResponse> => {
    try {
      const exerciseResponse = await getExercisesByRange(); 
      console.log(exerciseResponse.data, 'instore'); // Now this accesses data directly
      return exerciseResponse; // Return the whole response object
    } catch (e) {
      console.error(e);
      throw e; 
    }
  };

export const userExerciseStore = {
    addExercise,
    getDailyExercise,
    fetchExercisesByDate,
    fetchExercisesRange
};
