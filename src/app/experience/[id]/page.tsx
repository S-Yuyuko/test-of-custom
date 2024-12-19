"use client";

import { useParams } from "next/navigation";
import { useExperience } from "@/contexts/ExperienceContext";

export default function ExperienceDetail() {
  const { id } = useParams();
  const { experiences } = useExperience();

  const experience = experiences.find((exp) => exp.id === id);

  if (!experience) {
    return <p className="p-4">Experience not found.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Experience Details</h1>
      {experience.components.map((component) => (
        <div key={component.id} className="mb-4">
          <strong>{component.type}:</strong>
          <p>{component.content}</p>
        </div>
      ))}
    </div>
  );
}
