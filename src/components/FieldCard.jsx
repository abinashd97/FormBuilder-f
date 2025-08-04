import React from "react";
// Hook for draggable interaction
import { useDraggable } from "@dnd-kit/core";
// Utility for translating transforms
import { CSS } from "@dnd-kit/utilities";

// Card component for each field type in the palette
const FieldCard = ({ id, icon, label, description }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    // useDraggable hook registers this card as a draggable source

    id: `${id}`,
  });

  const style = {
    // Use a template literal to add rotate() next to the translate
    transform: transform
      ? `${CSS.Translate.toString(transform)} rotate(4deg)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef} // Connect DnD ref
      style={style} // Inline style for drag transform
      {...listeners} // Pointer event handlers for drag start
      {...attributes} // DnD accessibility attributes
      className="element-card" // Class for styling the card
    >
      <div className="element-card-content">
        <div className="element-card-icon">{icon}</div>{" "}
        {/* Icon for the field */}
        <span className="element-card-label">{label}</span>{" "}
        {/* Label (e.g. Text Input) */}
        <span className="element-card-desc">{description}</span>{" "}
        {/* Description (e.g. Single line text input) */}
      </div>
    </div>
  );
};

export default FieldCard;
