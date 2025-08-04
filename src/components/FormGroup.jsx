import React from "react";
import { useDispatch } from "react-redux";
import { removeField, selectField } from "../store/appSlice";
import { FiTrash2 } from "react-icons/fi"; // Trash/delete icon

// Displays a single form field (one group), with label, input, and a remove button.
// Props:
// - field: The field object (type, config, id)
// - sectionId: Section this field belongs to (used for removal)
// - isSelected: Whether the field is currently selected (for styling/highlight)
const FormGroup = ({ field, sectionId, isSelected }) => {
  const dispatch = useDispatch();

  // Selects this field when its root div is clicked
  const handleSelect = (e) => {
    e.stopPropagation(); // Prevent click bubbling to parents
    dispatch(selectField(field.id));
  };

  // Removes this field from its section on delete button click
  const handleRemove = (e) => {
    e.stopPropagation();
    dispatch(removeField({ sectionId, fieldId: field.id }));
  };

  // For debug
  console.log("fieldType:", field.fieldType, field);

  return (
    <div
      className={`form-group-root${isSelected ? " selected" : ""}`} // Highlight if selected
      onClick={handleSelect}
    >
      {/* Trash/delete button top right */}
      <div className="form-group-actions">
        <button onClick={handleRemove} className="form-group-delete-btn">
          <FiTrash2 size={16} />
        </button>
      </div>

      {/* Field label + required asterisk */}
      <div className="form-group-label">
        <label>
          {field.config.label}
          {field.config.required && (
            <span className="form-group-required">*</span>
          )}
        </label>
      </div>

      {/* Render the correct input type based on the field.fieldType */}
      {field.fieldType === "text-input" && (
        <input
          type="text"
          className="form-group-input"
          placeholder={field.config.placeholder}
          disabled
        />
      )}

      {field.fieldType === "email" && (
        <input
          type="email"
          className="form-group-input"
          placeholder={field.config.placeholder}
          disabled
        />
      )}

      {field.fieldType === "password" && (
        <input
          type="password"
          className="form-group-input"
          placeholder="Enter password"
          disabled
        />
      )}

      {field.fieldType === "number" && (
        <input
          type="number"
          className="form-group-input"
          placeholder="Enter only numeric values"
          disabled
        />
      )}

      {field.fieldType === "date-picker" && (
        <input type="date" className="form-group-input" disabled />
      )}

      {field.fieldType === "text-area" && (
        <textarea
          className="form-group-input"
          placeholder={field.config.placeholder}
          rows={3}
          disabled
        />
      )}

      {field.fieldType === "dropdown" && (
        <select className="form-group-input" disabled>
          <option value="">Select an option</option>
          {field.config.options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {field.fieldType === "radio" && (
        <div className="form-group-radio-group">
          {field.config.options?.map((option, index) => (
            <div key={index} className="form-group-radio-item">
              <input
                type="radio"
                id={`radio-${field.id}-${index}`}
                name={`radio-${field.id}`}
                className="form-group-radio"
                disabled
              />
              <label
                htmlFor={`radio-${field.id}-${index}`}
                className="form-group-radio-label"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      )}

      {field.fieldType === "checkbox" && (
        <div className="form-group-checkbox-group">
          {field.config.options?.map((option, index) => (
            <div key={index} className="form-group-checkbox-item">
              <input
                type="checkbox"
                id={`checkbox-${field.id}-${index}`}
                name={`checkbox-${field.id}`}
                className="form-group-checkbox"
                disabled
              />
              <label
                htmlFor={`checkbox-${field.id}-${index}`}
                className="form-group-checkbox-label"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      )}

      {field.fieldType === "file-upload" && (
        <input type="file" className="form-group-input" disabled />
      )}

      {field.fieldType === "color" && (
        <input
          type="color"
          className="form-group-input"
          value={field.config.value || "#000000"}
          disabled
          style={{
            width: 48,
            height: 32,
            padding: 0,
            border: "none",
            background: "none",
          }}
        />
      )}

      {field.fieldType === "range" && (
        <input
          type="range"
          className="form-group-input"
          min={field.config.min || 0}
          max={field.config.max || 100}
          value={field.config.value || 50}
          disabled
          style={{ width: "100%" }}
        />
      )}

      {field.fieldType === "time" && (
        <input type="time" className="form-group-input" disabled />
      )}

      {field.fieldType === "url" && (
        <input
          type="url"
          className="form-group-input"
          placeholder={field.config.placeholder}
          disabled
        />
      )}

      {field.fieldType === "phone-number" && (
        <input
          type="tel"
          className="form-group-input"
          placeholder={field.config.placeholder}
          disabled
        />
      )}
    </div>
  );
};

export default FormGroup;
