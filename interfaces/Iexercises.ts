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
    exercises:Exercise[]
  }