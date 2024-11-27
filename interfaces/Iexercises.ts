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
export interface IExercises{
  exercise_id: number; // Unique identifier for the exercise
  category: string; // Category of the exercise (e.g., Back, Shoulder, etc.)
  created_at: Date | null; // Timestamp when the exercise was created
  description: string; // Description of the exercise
  difficulty: 'Easy' | 'Medium' | 'Hard'; // Difficulty level of the exercise
  duration: number | null; // Duration of the exercise in minutes (if applicable)
  image_url: string; // URL to the image representing the exercise
  name: string; // Name of the exercise
  updated_at: Date | null; // Timestamp when the exercise was last updated
}