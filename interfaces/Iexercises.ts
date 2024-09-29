export interface Exercise {
    exerciseId: number;
    name: string;
    description: string;
    category: string;
    difficulty: 'Easy' | 'Medium' | 'Hard'; // Adjust based on your requirements
    duration: number | null; // Assuming duration is in minutes or null
    imageUrl: string;
    createdAt: Date | null; // Assuming you may want to use a Date object
    updatedAt: Date | null; // Same as above
  }
  
  export interface ExerciseData{
    exercises:ExerciseResponse[]
  }
  export interface ExerciseResponse {
    id: number;
    user: {
        id: number;
        username: string;
        password: string; // Consider not exposing password for security
    };
    exercise: {
        exerciseId: number;
        name: string;
        description: string;
        category: string;
        difficulty: 'Easy' | 'Medium' | 'Hard';
        duration: number | null;
        imageUrl: string;
        createdAt: Date | null;
        updatedAt: Date | null;
    };
    date: string; // Format 'YYYY-MM-DD'
    duration: number | null;
    reps: number;
    sets: number;
    weight: number | null;
    notes: string | null;
    createdAt: string; // ISO date string
}
