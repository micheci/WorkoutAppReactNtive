/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { hookstate } from '@hookstate/core';
import { ExerciseResponse, UserExercise } from '../interfaces/Iexercises'
import { addUserExercise, getCurrentDayExercises, getExercisesByDate, getExercisesByRange } from '../services/userExercisesService';

const userExerciseState = hookstate({
  userExercises:[] as any[] //change this type!!!
})
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

export const fetchExercisesByDate = async (date: string) => {
  try {
    const response = await getExercisesByDate(date);
    console.log(response, 'the response in store', date);
    
    userExerciseState.userExercises.set([{ date, exercises: response }]);
    
    // Log the state after updating
    console.log('Updated User Exercises State:', userExerciseState.userExercises.get());

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
  userExerciseState,
    addExercise,
    getDailyExercise,
    fetchExercisesByDate,
    fetchExercisesRange
};
