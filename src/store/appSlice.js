import { createSlice } from '@reduxjs/toolkit'; 
import { nanoid } from 'nanoid';

// Initial state for the form builder Redux slice
const initialState = {
  title: 'Form',          // Form title (can be extended to be editable)
  sections: [],           // Array to hold form sections, each with fields
  nextSectionId: 1,       // Incremental ID counter for new sections
  selectedFieldId: null,  // Currently selected field's unique ID (for editing)
  isPreviewOpen: false,   // Whether preview mode is active
  isJSONOpen: false,      // Whether JSON view popup is open
};

// Redux slice named 'form'
export const appSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    // Select a field by ID (or deselect by passing null)
    selectField: (state, action) => {
      state.selectedFieldId = action.payload;
    },

    // Add a new field of `fieldType` to the section specified by `sectionId`
    addField: (state, action) => {
      const { sectionId, fieldType } = action.payload;
      // Find section to add the field to
      const section = state.sections.find(s => s.id === sectionId);

      if (!section) return; // Do nothing if section not found

      // Generate unique ID for new field
      const id = nanoid();

      // Default configuration for the new field
      const config = {
        label: fieldType.charAt(0).toUpperCase() + fieldType.slice(1), // Use capitalized field type as label
        placeholder: `Enter ${fieldType} here`,
        required: false,
      };

      // For fields that support multiple options, add default options array
      if (fieldType === 'dropdown' || fieldType === 'radio' || fieldType === 'checkbox') {
        config.options = ['Option 1', 'Option 2', 'Option 3'];
      }

      // Define the new field object
      const newField = {
        id,
        type: 'field',        // Distinguish from other possible types (e.g. layout or non-field objects)
        fieldType: fieldType, // Specific field type (e.g. text-input, checkbox)
        config,
      };

      // Add new field to the section's fields array
      section.fields.push(newField);

      // Automatically select the new field for editing
      state.selectedFieldId = id;
    },

    // Update configuration of an existing field
    updateField: (state, action) => {
      const { sectionId, fieldId, config } = action.payload;
      const section = state.sections.find(s => s.id === sectionId);

      if (section) {
        const field = section.fields.find(e => e.id === fieldId);

        if (field && field.type === 'field') {
          // Merge new config properties with existing ones
          field.config = { ...field.config, ...config };
        }
      }
    },

    // Remove a field from a section
    removeField: (state, action) => {
      const { sectionId, fieldId } = action.payload;
      const section = state.sections.find(s => s.id === sectionId);

      if (section) {
        // Filter out the field with matching ID
        section.fields = section.fields.filter(f => f.id !== fieldId);
      }

      // If the removed field was selected, clear selection
      if (state.selectedFieldId === fieldId) {
        state.selectedFieldId = null;
      }
    },

    // Add a new section to the form, with incremental ID and default title
    addSection: (state) => {
      const id = `section-${state.nextSectionId}`;
      state.sections.push({
        id,
        title: `Section ${state.nextSectionId}`,
        fields: [],
      });
      state.nextSectionId += 1; // Increment for next new section
    },

    // Remove an entire section by ID
    removeSection: (state, action) => {
      state.sections = state.sections.filter(s => s.id !== action.payload);

      // Reset section ID counter if all sections are removed
      if (state.sections.length === 0) {
        state.nextSectionId = 1;
      }
    },

    // Update the title of an existing section
    updateSectionTitle: (state, action) => {
      const { sectionId, title } = action.payload;
      const section = state.sections.find(s => s.id === sectionId);
      if (section) {
        section.title = title;
      }
    },

    // Toggle the preview mode on/off
    togglePreview: (state) => {
      state.isPreviewOpen = !state.isPreviewOpen;

      // If preview opens, ensure JSON view is closed
    //   if (state.isPreviewOpen) {
    //     state.isJSONOpen = false;
    //   }
    },

    // Toggle the JSON schema view popup on/off
    toggleJson: (state) => {
      state.isJSONOpen = !state.isJSONOpen;

      // If JSON view opens, ensure preview mode is closed
      // if (state.isJSONOpen) {
      //   state.isPreviewOpen = false;
      // }
    },
  },
});

// Export actions for dispatching
export const { 
  selectField,
  addField,
  removeField,
  updateField,
  addSection,
  removeSection,
  updateSectionTitle,
  togglePreview,
  toggleJson
} = appSlice.actions;

// Export the reducer to configure the Redux store
export default appSlice.reducer;
