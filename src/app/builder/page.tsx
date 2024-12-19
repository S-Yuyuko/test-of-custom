"use client";

import { useRouter } from "next/navigation";
import { useExperience } from "@/contexts/ExperienceContext";
import DragDropBuilder from "@/components/DragDropBuilder";

export default function Builder() {
  const { addExperience } = useExperience();
  const router = useRouter();

  const handleSave = (components: { id: string; type: string; content: string }[]) => {
    addExperience({ components }); // Save the entire experience
    router.push("/");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Build Your Experience</h1>
      <DragDropBuilder onSave={handleSave} />
    </div>
  );
}
