import { useSelector, useDispatch } from "react-redux";
import { toggleJson } from "../store/appSlice"; // Redux action to toggle JSON view visibility
import { FiX } from "react-icons/fi"; // Close icon from react-icons

// ViewJson: Popup modal to display the generated JSON schema of the current form
const ViewJson = () => {
  // Select entire form state from Redux store
  const form = useSelector((state) => state.form);
  const dispatch = useDispatch();

  // Transform the Redux form state into a simplified JSON view object
  // Only includes section ID/title and fields with type 'field', along with their config
  const jsonView = {
    title: form.title,
    sections: form.sections.map((section) => ({
      id: section.id,
      title: section.title,
      fields: section.fields
        .map((field) => {
          // Only serialize fields of type 'field'
          if (field.type === "field") {
            return {
              id: field.id,
              type: field.fieldType,
              config: field.config,
            };
          }
          return null; // Ignore other types (if any)
        })
        .filter(Boolean), // Remove nulls resulting from other types
    })),
  };

  // Convert the JSON view object to a pretty string for display
  const jsonString = JSON.stringify(jsonView, null, 2);

  // Handler to close the JSON popup by toggling off JSON view in Redux
  const handleCloseJson = () => {
    dispatch(toggleJson());
  };

  return (
    // Overlay backdrop for modal popup; clicking outside content closes popup
    <div className="json-popup-overlay">
      <div className="json-popup-container">
        {/* Popup header with title and close button */}
        <div className="json-popup-header">
          <h2 className="json-popup-title">Generated JSON Schema</h2>
          <button
            className="json-popup-close-btn"
            onClick={handleCloseJson}
            aria-label="Close JSON view"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Popup content showing the formatted JSON string */}
        <div className="json-popup-content">
          <pre className="json-popup-code">{jsonString}</pre>
        </div>
      </div>
    </div>
  );
};

export default ViewJson;
