export interface IWorkoutPost {
    name: string; // Name of the workout
    description?: string; // Optional description of the workout
    exercises: IWorkoutExercise[]; // Array of exercises
  }
  export interface IWorkoutExercise {
    exerciseId: number; // ID of the exercise
    name: string; // Name of the exercise
    category: string; // Category of the exercise (e.g., "Back")
    muscle: string; // Target muscles
    equipment: string; // Equipment used
    reps: number; // Reps for the workout
    sets: number; // Sets for the workout
    imageUrl: string; // Exercise image URL
    instructions: string; // Instructions for the exercise
  }