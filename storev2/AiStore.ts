import { hookstate } from "@hookstate/core";
import { IExercises, IExercisesPost } from "../interfaces/Iexercises";
import PicklistService from "../servicesv2/PicklistService";
import ExerciseService from "../servicesv2/ExerciseService";
import AIService from "../servicesv2/AIService";

const AIState = hookstate({
});

async function generateAIWorkouts(arrayOfMuscleGroups:Array<string>) {
  try {
    const response = await AIService.generateAIWorkout(arrayOfMuscleGroups); 
    return response
  } catch (e) {
    console.error(e);
  }
}

export const AIStore = {
    AIState,
    generateAIWorkouts,
};
