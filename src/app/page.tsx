"use client";

import Link from "next/link";
import { useExperience } from "@/contexts/ExperienceContext";

export default function Home() {
  const { experiences } = useExperience();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">My Personal Website</h1>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">My Experiences</h2>
        {experiences.length > 0 ? (
          experiences.map((exp) => (
            <div
              key={exp.id}
              className="mt-2 p-2 border border-gray-300 rounded bg-gray-100"
            >
              <Link href={`/experience/${exp.id}`} className="text-blue-600">
                Experience ID: {exp.id}
              </Link>
            </div>
          ))
        ) : (
          <p className="mt-2 text-gray-500">No experiences added yet.</p>
        )}
      </div>
      <Link href="/builder">
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Add Experience
        </button>
      </Link>
    </div>
  );
}
