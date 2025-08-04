import React from "react";
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for state and dispatch
import { addSection, selectField, removeSection } from "../store/appSlice"; // Redux actions
import Section from "./Section"; // Component to render each section
import { FiPlus, FiFile } from "react-icons/fi"; // Icons

// Main canvas area where form sections and fields are rendered
const RenderingSurface = () => {
  const dispatch = useDispatch();

  // Destructure sections and form title from Redux state
  const { sections, title } = useSelector((state) => state.form);

  // Handler to add new section to form
  const handleAddSection = () => {
    dispatch(addSection());
  };

  return (
    <div className="rendering-surface">
      {/* Header with form icon, title, and Add Section button (if sections exist) */}
      <div className="rendering-surface-header">
        <div className="rendering-surface-header-left">
          <FiFile size={22} className="rendering-surface-header-icon" />
          <h2 className="rendering-surface-title">Form canvas</h2>
        </div>

        {/* Show Add Section button only if there is at least one section */}
        {sections.length > 0 && (
          <button
            onClick={handleAddSection}
            className="rendering-surface-header-add-btn"
            title="Add a new section"
          >
            <FiPlus size={16} />
            Add Section
          </button>
        )}
      </div>

      {/* If no sections yet, show empty state UI with prompt to add first section */}
      {sections.length === 0 ? (
        <div className="rendering-surface-empty">
          <div className="rendering-surface-empty-icon">
            <FiFile size={56} className="rendering-surface-empty-icon-img" />
          </div>
          <div className="rendering-surface-empty-text">
            <h3 className="rendering-surface-empty-title">
              Start Building Your Form
            </h3>
            <p className="rendering-surface-empty-desc">
              Create your first section to begin building your custom form. Add
              fields, customize layouts, and make it your own.
            </p>
          </div>
          <button
            onClick={handleAddSection}
            className="rendering-surface-add-section-btn"
            title="Create first section"
          >
            <FiPlus size={18} /> Create first section
          </button>
        </div>
      ) : (
        // If sections exist, render each with the Section component
        sections.map((section) => (
          <Section
            key={section.id}
            id={section.id}
            title={section.title}
            fields={section.fields}
          />
        ))
      )}
    </div>
  );
};

export default RenderingSurface;
