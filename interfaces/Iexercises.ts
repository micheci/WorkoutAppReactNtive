export interface UserExercise {
  id: number | string;
  exerciseName: string;
  reps: number;
  sets: number;
  weight: number | null; // Weight can be a number or null
  notes: string | null; // Notes can be a string or null
  createdAt: string; // ISO date string
  exerciseId: string;
}
export interface DailyExerciseData {
  date: string; // YYYY-MM-DD
  exercises: UserExercise[];
}
// Interface for the overall response
export interface ExerciseResponse {
  success: boolean; // Indicates if the request was successful
  message: string; // Message about the request status
  data: DailyExerciseData[]; // Array of daily exercise data
}
export interface IExercises {
  exerciseId: number; // Unique identifier for the exercise
  category: string; // Category of the exercise (e.g., Back, Shoulder, etc.)
  created_at: Date | null; // Timestamp when the exercise was created
  description: string; // Description of the exercise
  difficulty: "Easy" | "Medium" | "Hard"; // Difficulty level of the exercise
  duration: number | null; // Duration of the exercise in minutes (if applicable)
  image_url: string; // URL to the image representing the exercise
  name: string; // Name of the exercise
  updated_at: Date | null; // Timestamp when the exercise was last updated
}

export interface IExercisesPost {
  exerciseId: number|string; // Unique identifier for the exercise
  exerciseName: string;
  reps: string;
  sets: string;
}

export interface IExercisesPostTransformed {
  exercise: {
    exerciseId: number;  // exerciseId as number after transformation
  };
  reps: number;  // reps as a number after transformation
  sets: number;  // sets as a number after transformation
}
