export interface UserExercise{
  id: number;
  exerciseName: string;
  reps: number;
  sets: number;
  weight: number | null; // Weight can be a number or null
  notes: string | null; // Notes can be a string or null
  createdAt: string; // ISO date string
  exerciseId:string
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