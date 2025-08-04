import React from "react";
import FieldPalette from "./FieldPalette"; // Component rendering the draggable field items
import { useDispatch } from "react-redux"; // Redux dispatch hook (currently unused here but available for future use)

const SidePanel = () => {
  const dispatch = useDispatch(); // Prepare dispatch if needed for future interactivity

  return (
    <div className="side-panel">
      {/* Header area with main and subtitle for the panel */}
      <div className="side-panel-header">
        <div className="side-panel-title-container">
          <div className="side-panel-main-title">Field Palette</div>
          <div className="side-panel-subtitle">Drag & Drop Components</div>
        </div>
      </div>

      {/* Main content container for draggable fields */}
      <div className="side-panel-content">
        {/* Render the list of draggable field cards */}
        <FieldPalette />
      </div>
    </div>
  );
};

export default SidePanel;
