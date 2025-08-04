import React from "react"; // React library
import FormGroup from "./FormGroup"; // Component to render individual form fields
import { FiTrash2, FiEdit2 } from "react-icons/fi"; // Icons
import { useDroppable } from "@dnd-kit/core"; // Hook to create a droppable container
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for state and dispath
import { removeSection } from "../store/appSlice"; // Redux actions

// Represents a single section within the form builder canvas
// Supports editing the section title, removing the section, and dropping fields inside
const Section = ({ id, title, fields }) => {
  // Setup droppable area for dnd-kit library with unique droppable ID for this section
  const { setNodeRef, isOver } = useDroppable({
    id: `${id}`,
  });

  const dispatch = useDispatch();

  // Current selected field ID from Redux store (to highlight selected field)
  const selectedFieldId = useSelector((state) => state.form.selectedFieldId);

  // Local state to manage editing mode and input value for section title
  const [editing, setEditing] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(title);

  // Local state to show/hide edit icon on hover for UI affordance
  const [hovered, setHovered] = React.useState(false);

  // Synchronize local inputValue with prop title: updates if title changes externally
  React.useEffect(() => {
    setInputValue(title);
  }, [title]);

  // Enable editing mode when section title clicked
  const handleTitleClick = () => setEditing(true);

  // Update local inputValue when user types in input
  const handleInputChange = (e) => setInputValue(e.target.value);

  // On input blur, save changes if any and disable editing mode
  const handleInputBlur = () => {
    setEditing(false);
    if (inputValue.trim() && inputValue !== title) {
      // Dispatch action to update section title in Redux store
      dispatch({
        type: "form/updateSectionTitle",
        payload: { sectionId: id, title: inputValue.trim() },
      });
    }
  };

  // Support hitting Enter key to commit edit (blur input to trigger save)
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  return (
    <div className="section-card">
      {/* Section header with editable title and delete button */}
      <div className="section-card-header">
        <span
          className="section-card-title-group"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {editing ? (
            // Render input box to edit section title
            <input
              className="section-card-title-input"
              value={inputValue}
              autoFocus
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              placeholder="Section Title"
            />
          ) : (
            <>
              {/* Display title text with click-to-edit behavior */}
              <span
                onClick={handleTitleClick}
                className="section-card-title"
                title="Click to edit section title"
              >
                {title}
              </span>
              {/* Show pencil icon on hover for better edit affordance */}
              {hovered && (
                <FiEdit2 size={16} className="section-card-title-edit-icon" />
              )}
            </>
          )}
        </span>

        {/* Delete section button */}
        <button
          onClick={() => dispatch(removeSection(id))}
          className="section-card-delete-btn"
          title="Delete Section"
          aria-label={`Delete section ${title}`}
        >
          <FiTrash2 size={16} />
        </button>
      </div>

      {/* Droppable container for fields within this section */}
      <div
        ref={setNodeRef} // Attach droppable ref for dnd-kit
        className={`section-card-droppable${isOver ? " active" : ""}`} // Highlight on drop hover
      >
        {/* If no fields, show empty drop zone instructions */}
        {fields.length === 0 && (
          <div className="section-card-droppable-empty">
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem" }}>📋</div>
              <div style={{ fontWeight: 600, margin: "8px 0 2px 0" }}>
                Drop fields here
              </div>
              <div style={{ fontSize: "0.95rem", color: "#b91c1c" }}>
                Drag and drop form fields to build your section
              </div>
            </div>
          </div>
        )}

        {/* Render all fields in this section using FormGroup components */}
        {fields.map((field) => (
          <FormGroup
            key={field.id}
            field={field}
            sectionId={id}
            isSelected={selectedFieldId === field.id} // Highlight if selected
          />
        ))}
      </div>
    </div>
  );
};
export default Section;
