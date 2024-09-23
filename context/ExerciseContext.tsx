// context/ExerciseContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchExercises } from "../services/exerciseService";

interface Exercise {
  id: number;
  name: string;
}

interface ExerciseContextType {
  exercises: Exercise[];
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(
  undefined
);

export const ExerciseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const loadExercises = async () => {
      const data = await fetchExercises(); // Fetch exercises from backend
      setExercises(data);
    };
    loadExercises();
  }, []);

  return (
    <ExerciseContext.Provider value={{ exercises }}>
      {children}
    </ExerciseContext.Provider>
  );
};

export const useExercises = () => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error("useExercises must be used within an ExerciseProvider");
  }
  return context;
};
