import { hookstate } from "@hookstate/core";
import { IExercises, IExercisesPost } from "../interfaces/Iexercises";
import PicklistService from "../servicesv2/PicklistService";
import ExerciseService from "../servicesv2/ExerciseService";
import { IWorkoutPost } from "../interfaces/Iworkout";
import WorkoutService from "../servicesv2/WorkoutService";

const WorkoutState = hookstate({
});

async function addUserWorkout(data:IWorkoutPost) {
  try {
   
    const response = await WorkoutService.addUserWorkout(data); 
    return response;
  } catch (e) {
    console.error(e);
  }
}

async function saveGeneratedWorkoutToUser(data:IWorkoutPost) {
  try {
   console.log(data,'inthestore123')
    const response = await WorkoutService.saveAIWorkout(data); 
    return response;
  } catch (e) {
    console.error(e);
  }
}

export const workoutStore = {
    WorkoutState,
    addUserWorkout,
    saveGeneratedWorkoutToUser
};
