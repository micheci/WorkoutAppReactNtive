import { hookstate } from "@hookstate/core";
import ProfileService from "../servicesv2/ProfileService";

const ProfileState = hookstate({
  //exercises: [] as IExercises[],
});

async function getUserInformation() {
  try {
    const exercisesArray = await ProfileService.getUserInfo(); // Fetch exercises from the backend
    //PicklistState.exercises.set(exercisesArray); // Store fetched exercises in state
    console.log(exercisesArray,'POOPY')
    return exercisesArray;
  } catch (e) {
    console.error(e);
    //PicklistState.exercises.set([]); // Reset state on error
  }
}

export const profileStore = {
    ProfileState,
  getUserInformation,
};
