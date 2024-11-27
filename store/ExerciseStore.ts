// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable prettier/prettier */
// import { hookstate } from '@hookstate/core';
// import { Exercise, ExerciseData } from '../interfaces/Iexercises'
// import { fetchExercises } from '../services/exerciseService';
// const exerciseState = hookstate<ExerciseData>({
//   exercises: [] as Exercise[],
// });

// // Fetch exercises from the backend and save to state
// async function getExercises() {
//   try {
//     const response = await fetchExercises(); // Fetch exercises from the backend
//     exerciseState.exercises.set(response); // Store fetched exercises in state
//     return response;
//   } catch (e) {
//     console.error(e);
//     exerciseState.exercises.set([]); // Reset state on error
//   }
// }

// export const exerciseStore = {
//   exerciseState,
//   getExercises,
// };
