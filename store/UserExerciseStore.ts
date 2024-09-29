/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { hookstate } from '@hookstate/core';
import { Exercise, ExerciseData, ExerciseResponse } from '../interfaces/Iexercises'
import { addUserExercise, getCurrentDayExercises, getExercisesByDate } from '../services/userExercisesService';


// Fetch exercises from the backend and save to state
async function addExercise(exerciseData:any) {
  try {  console.log("Entered addExercise function");

    const response = await addUserExercise(exerciseData); // Fetch exercises from the backend
    return response;
  } catch (e) {
    console.error(e);
  }
}

// Fetch the current day exercies
async function getDailyExercise() {
    try {  console.log("Entered addExercise function");
  
      const response = await getCurrentDayExercises(); // Fetch exercises from the backend
      return response;
    } catch (e) {
      console.error(e);
    }
  }

  // Fetch the users exercise based on date
  export const fetchExercisesByDate = async (date: string): Promise<ExerciseResponse[]> => {
    try {
      const response = await getExercisesByDate(date); // Pass the date parameter
      console.log(response,'in store for date')
      return response; // This should return an array of Exercise objects
    } catch (e) {
      console.error(e);
      throw e; // Re-throw the error if needed for further handling
    }
  };

export const userExerciseStore = {
    addExercise,
    getDailyExercise,
    fetchExercisesByDate
};
