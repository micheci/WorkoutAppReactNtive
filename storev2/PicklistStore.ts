import { hookstate } from "@hookstate/core";
import { IExercises } from "../interfaces/Iexercises";
import PicklistService from "../servicesv2/PicklistService";

const PicklistState = hookstate({
  exercises: [] as IExercises[],
});

async function getAllExercises() {
  try {
    const exercisesArray = await PicklistService.getAllExercises(); // Fetch exercises from the backend
    PicklistState.exercises.set(exercisesArray); // Store fetched exercises in state
    return exercisesArray;
  } catch (e) {
    console.error(e);
    PicklistState.exercises.set([]); // Reset state on error
  }
}

export const pickListStore = {
  PicklistState,
  getAllExercises,
};
