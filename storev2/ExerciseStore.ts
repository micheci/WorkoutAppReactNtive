import { hookstate } from "@hookstate/core";
import { IExercises, IExercisesPost } from "../interfaces/Iexercises";
import PicklistService from "../servicesv2/PicklistService";
import ExerciseService from "../servicesv2/ExerciseService";

const ExerciseState = hookstate({
});

async function addUserExercise(data:IExercisesPost) {
  try {
    const transformedData = {
        exercise: {
          exerciseId: parseInt(data.exerciseId.toString()),  // Convert exerciseId to integer
        },
        reps: parseInt(data.reps),  // Convert reps to integer
        sets: parseInt(data.sets),  // Convert sets to integer
      };
    const response = await ExerciseService.addUserExercise(transformedData); 
    return response;
  } catch (e) {
    console.error(e);
  }
}

export const exerciseStore = {
    ExerciseState,
  addUserExercise,
};
