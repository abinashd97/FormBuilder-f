import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { togglePreview } from "../store/appSlice";

// PreviewOn: Read-only preview of the live form (fields are interactive-looking but non-functional)
const PreviewOn = () => {
  // Get form structure from Redux state
  const { sections, title } = useSelector((state) => state.form);

  // UI state for submit/reset warning
  const [showWarning, setShowWarning] = useState(false);
  // Local state for any "range" field value for live preview
  const [rangeValues, setRangeValues] = useState({});

  const dispatch = useDispatch();

  // Determine if there are any fields in any section (for empty-state UI)
  const hasFields =
    sections.length > 0 &&
    sections.some((section) => section.fields.length > 0);

  // Handling demo Submit/Reset -- just shows a warning, doesn't submit anything.
  const handleButtonClick = () => {
    setShowWarning(true);
    setTimeout(() => setShowWarning(false), 3000); // Warning auto-hides after 3s
  };

  // Closes preview mode by toggling off in Redux store
  const handleClosePreview = () => {
    dispatch(togglePreview());
  };

  // Render input widgets for each form field type (read-only preview look)
  const renderField = (field) => {
    const { fieldType, config, id } = field;

    // Debug log for what field types are rendered
    console.log("fieldType: ", fieldType);

    switch (fieldType) {
      case "text-input":
        return (
          <input
            type="text"
            className="form-input"
            placeholder={config.placeholder}
          />
        );
      case "email":
        return (
          <input
            type="email"
            className="form-input"
            placeholder={config.placeholder}
          />
        );
      case "password":
        return (
          <input
            type="password"
            className="form-input"
            placeholder={config.placeholder}
          />
        );
      case "number":
        return (
          <input
            type="number"
            className="form-input"
            placeholder={config.placeholder}
          />
        );
      case "date-picker":
        return <input type="date" className="form-input" />;
      case "text-area":
        return (
          <textarea
            className="form-textarea"
            placeholder={config.placeholder}
            rows={3}
          />
        );
      case "dropdown":
        return (
          <select className="form-select">
            <option value="">Select an option</option>
            {config.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "radio":
        return (
          <div className="radio-group">
            {config.options?.map((option, index) => (
              <div key={index} className="radio-item">
                <input
                  type="radio"
                  id={`radio-${field.id}-${index}`}
                  name={`radio-${field.id}`}
                  className="radio-input"
                />
                <label
                  htmlFor={`radio-${field.id}-${index}`}
                  className="radio-label"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        );
      case "checkbox":
        return (
          <div className="checkbox-group">
            {config.options?.map((option, index) => (
              <div key={index} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`checkbox-${field.id}-${index}`}
                  name={`checkbox-${field.id}`}
                  className="checkbox-input"
                />
                <label
                  htmlFor={`checkbox-${field.id}-${index}`}
                  className="checkbox-label"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        );
      case "file-upload":
        return <input type="file" className="form-input" />;
      case "color":
        // Shows color picker, but disables direct interaction in preview
        return (
          <input
            type="color"
            className="form-input"
            value={field.config.value || "#000000"}
            style={{
              width: 48,
              height: 32,
              padding: 0,
              border: "none",
              background: "none",
            }}
          />
        );
      case "range": {
        // For range inputs: preserves current value in local state for preview slider effect
        const min = config.min || 0;
        const max = config.max || 100;
        const value = rangeValues[id] ?? config.value ?? 50;
        const percent = Math.round(((value - min) / (max - min)) * 100);

        return (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <input
              type="range"
              className="form-input"
              min={min}
              max={max}
              value={value}
              style={{ width: "100%" }}
              // Allow value to update during preview for user demo visual feedback
              onChange={(e) =>
                setRangeValues((v) => ({ ...v, [id]: Number(e.target.value) }))
              }
            />
            {/* Show percent indicator for visual feedback */}
            <span style={{ minWidth: 40 }}>{percent}%</span>
          </div>
        );
      }
      case "url":
        return (
          <input
            type="url"
            className="form-input"
            placeholder={config.placeholder}
          />
        );
      case "phone-number":
        return (
          <input
            type="tel"
            className="form-input"
            placeholder={config.placeholder}
          />
        );
      default:
        return null; // No widget for unsupported types
    }
  };

  // No fields in any section? Show empty state UI
  if (!hasFields) {
    return (
      <div className="form-preview-container">
        <div className="empty-preview-message">
          <h2 className="empty-preview-title">📝 No fields yet</h2>
          <p className="empty-preview-text">
            Add some fields to see the preview
          </p>
        </div>
      </div>
    );
  }

  // Main preview UI (when fields exist)
  return (
    <div className="form-preview-container">
      {/* Sticky preview mode header */}
      <div className="preview-header">
        <h2 className="form-preview-title">Preview Mode</h2>
        <button className="preview-close-btn" onClick={handleClosePreview}>
          ✕
        </button>
      </div>

      {/* Render all sections and fields for preview */}
      {sections.map((section) => (
        <div key={section.id} className="preview-section">
          <div className="preview-section-header">
            <h3 className="preview-section-title">{section.title}</h3>
            <div className="preview-section-divider"></div>
          </div>

          <div className="preview-section-content">
            {section.fields.map((field) => (
              <div key={field.id} className="field-container">
                <div className="field-label-container">
                  <label className="field-label">
                    {field.config.label}
                    {field.config.required && (
                      <span className="required-indicator">*</span>
                    )}
                  </label>
                </div>
                {/* Render the preview version of the field */}
                {renderField(field)}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Submit & Reset buttons: only show warning, not real form handling */}
      <div className="submit-container">
        <button className="submit-button" onClick={handleButtonClick}>
          Submit
        </button>
        <button className="reset-button" onClick={handleButtonClick}>
          Reset
        </button>
      </div>

      {/* Non-interactive mode banner */}
      {showWarning && (
        <div className="preview-warning">
          ⚠️ Form interactions are disabled in preview mode
        </div>
      )}
    </div>
  );
};

export default PreviewOn;
