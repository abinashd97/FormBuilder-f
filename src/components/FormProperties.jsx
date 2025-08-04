import React from "react";
import { updateField } from "../store/appSlice";
import { FiX, FiPlus, FiTrash2 } from "react-icons/fi"; // React Icons
import { useDispatch, useSelector } from "react-redux";

// Properties panel for configuring the currently selected field in the form builder
const FormProperties = () => {
  const dispatch = useDispatch();

  // Get all form sections and the selected field's id from Redux state
  const { sections, selectedFieldId } = useSelector((state) => state.form);

  // Find the selected field object and the section it belongs to
  let selectedField = null;
  let sectionId = "";

  for (const section of sections) {
    const found = section.fields.find((e) => e.id === selectedFieldId);
    if (found) {
      selectedField = found;
      sectionId = section.id;
      break;
    }
  }

  // If no field is selected, show a friendly "No Fields Selected" UI
  if (!selectedField || selectedField.type !== "field") {
    return (
      <div className="properties-panel-empty">
        <div className="properties-panel-header">
          <h3 className="properties-panel-title">Form Properties</h3>
        </div>
        <div className="properties-panel-empty-center">
          <div style={{ fontSize: "2rem", textAlign: "center" }}>🛠️</div>
          <div
            style={{
              fontWeight: 600,
              margin: "8px 0 2px 0",
              textAlign: "center",
            }}
          >
            No Fields Selected
          </div>
          <div
            style={{
              fontSize: "0.95rem",
              color: "#b91c1c",
              textAlign: "center",
            }}
          >
            Click on a field in the canvas to configure its properties
          </div>
        </div>
      </div>
    );
  }

  // Current field configuration (label, placeholder, required, options, etc.)
  const { config } = selectedField;

  // Updates a single property of the selected field configuration in Redux store
  const handleConfigChange = (key, value) => {
    dispatch(
      updateField({
        sectionId,
        fieldId: selectedFieldId,
        config: { [key]: value },
      })
    );
  };

  // Adds a new option to the options array (for dropdown, radio, or checkbox)
  const handleAddOption = () => {
    const newOptions = [
      ...(config.options || []),
      `Option ${(config.options?.length || 0) + 1}`,
    ];
    handleConfigChange("options", newOptions);
  };

  // Removes option by index from options array
  const handleRemoveOption = (index) => {
    const newOptions = [...(config.options || [])];
    newOptions.splice(index, 1);
    handleConfigChange("options", newOptions);
  };

  // Edits the option value at a particular index
  const handleChangeOption = (index, value) => {
    const newOptions = [...(config.options || [])];
    newOptions[index] = value;
    handleConfigChange("options", newOptions);
  };

  // Main property editing UI
  return (
    <div className="properties-panel-root">
      {/* Header for the panel */}
      <div className="properties-panel-header">
        <h3 className="properties-panel-title">Form Properties</h3>
      </div>

      {/* Properties editing content */}
      <div className="properties-panel-content">
        {/* Editable field label */}
        <div>
          <label htmlFor="label" className="property-label">
            Label
          </label>
          <input
            id="label"
            type="text"
            value={config.label || ""}
            onChange={(e) => handleConfigChange("label", e.target.value)}
            className="property-input"
          />
        </div>

        {/* Placeholder is not shown for color or range fields */}
        {selectedField.fieldType !== "color" &&
          selectedField.fieldType !== "range" && (
            <div>
              <label htmlFor="placeholder" className="property-label">
                Placeholder
              </label>
              <input
                id="placeholder"
                type="text"
                value={config.placeholder || ""}
                onChange={(e) =>
                  handleConfigChange("placeholder", e.target.value)
                }
                className="property-input"
              />
            </div>
          )}

        {/* Validation section: only the "required" flag for now */}
        <div className="property-validations">
          <h4 className="property-validations-title">Validations</h4>
          <div className="property-validation-item">
            <input
              id="required"
              type="checkbox"
              checked={config.required || false}
              onChange={(e) => handleConfigChange("required", e.target.checked)}
              className="property-checkbox"
            />
            <label htmlFor="required" className="property-checkbox-label">
              Required
            </label>
          </div>
        </div>

        {/* Render options manager for dropdown, radio, or checkbox fields */}
        {(selectedField.fieldType === "dropdown" ||
          selectedField.fieldType === "radio" ||
          selectedField.fieldType === "checkbox") && (
          <div className="property-options">
            <div className="property-options-header">
              <h4 className="property-options-title">Options</h4>
              <button
                onClick={handleAddOption}
                className="property-options-add-btn"
                title="Add option"
              >
                <FiPlus size={16} />
              </button>
            </div>
            <div className="property-options-list">
              {config.options?.map((option, index) => (
                <div key={index} className="property-options-item">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleChangeOption(index, e.target.value)}
                    className="property-input"
                  />
                  <button
                    onClick={() => handleRemoveOption(index)}
                    className="property-options-remove-btn"
                    title="Remove option"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormProperties;
