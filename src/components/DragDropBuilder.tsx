"use client";

import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { v4 as uuidv4 } from "uuid";

type DragDropBuilderProps = {
  onSave: (components: { id: string; type: string; content: string }[]) => void;
};

export default function DragDropBuilder({ onSave }: DragDropBuilderProps) {
  const [components, setComponents] = useState<{ id: string; type: string; content: string }[]>(
    []
  );

  const handleDrop = (event: any) => {
    const id = event.active.id;
    const validTypes = ["Button", "Image", "Text Block"];
    if (!validTypes.includes(id)) return; // Prevent invalid drops
    setComponents((prev) => [...prev, { id: uuidv4(), type: id, content: "" }]);
  };

  const handleUpdateContent = (id: string, newContent: string) => {
    setComponents((prev) =>
      prev.map((item) => (item.id === id ? { ...item, content: newContent } : item))
    );
  };

  const handleRemoveComponent = (id: string) => {
    setComponents((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <DndContext onDragEnd={handleDrop}>
      <div className="border p-4 mb-4">
        <DroppableArea
          components={components}
          onUpdateContent={handleUpdateContent}
          onRemoveComponent={handleRemoveComponent}
        />
      </div>
      <DraggableItems />
      <button
        onClick={() => onSave(components)}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Save Experience
      </button>
    </DndContext>
  );
}

const DraggableItems = () => {
  const items = ["Button", "Image", "Text Block"];
  return (
    <div className="flex gap-4 mt-4">
      {items.map((item) => (
        <Draggable key={item} id={item} label={item} />
      ))}
    </div>
  );
};

const Draggable = ({ id, label }: { id: string; label: string }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="px-4 py-2 border border-gray-400 cursor-grab bg-gray-100 rounded"
    >
      {label}
    </div>
  );
};

const DroppableArea = ({
  components,
  onUpdateContent,
  onRemoveComponent,
}: {
  components: { id: string; type: string; content: string }[];
  onUpdateContent: (id: string, newContent: string) => void;
  onRemoveComponent: (id: string) => void;
}) => {
  const { setNodeRef } = useDroppable({ id: "droppable" });

  return (
    <div
      ref={setNodeRef}
      className="min-h-[100px] border-2 border-dashed border-gray-400 p-4"
    >
      {components.length > 0 ? (
        components.map((component) => (
          <div
            key={component.id}
            className="p-2 border border-gray-300 my-1 flex flex-col gap-2 rounded bg-gray-50"
          >
            <div className="flex justify-between items-center">
              <div className="font-bold">{component.type}</div>
              <button
                onClick={() => onRemoveComponent(component.id)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
            <input
              type="text"
              placeholder={`Add content to ${component.type}`}
              value={component.content}
              onChange={(e) => onUpdateContent(component.id, e.target.value)}
              className="border px-2 py-1 rounded w-full"
            />
          </div>
        ))
      ) : (
        <p className="text-gray-500">Drag items here</p>
      )}
    </div>
  );
};
