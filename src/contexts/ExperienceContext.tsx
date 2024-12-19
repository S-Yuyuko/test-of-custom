"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

// Define types
type ComponentItem = { id: string; type: string; content: string };
type ExperienceItem = { id: string; components: ComponentItem[] };

type ExperienceContextType = {
  experiences: ExperienceItem[];
  addExperience: (newExperience: Omit<ExperienceItem, "id">) => void;
};

// Create context
const ExperienceContext = createContext<ExperienceContextType | undefined>(undefined);

export const ExperienceProvider = ({ children }: { children: ReactNode }) => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);

  const addExperience = (newExperience: Omit<ExperienceItem, "id">) => {
    const experienceWithId = { ...newExperience, id: uuidv4() };
    setExperiences((prev) => [...prev, experienceWithId]);
  };

  return (
    <ExperienceContext.Provider value={{ experiences, addExperience }}>
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperience = () => {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error("useExperience must be used within an ExperienceProvider");
  }
  return context;
};
