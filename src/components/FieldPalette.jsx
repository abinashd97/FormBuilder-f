import React from "react";

import {
  FiType,
  FiMail,
  FiLock,
  FiHash,
  FiCalendar,
  FiAlignJustify,
  FiChevronDown,
  FiCircle,
  FiCheckSquare,
  FiUpload,
  FiClock,
  FiLink,
  FiPhone,
  FiSliders,
  FiDroplet,
} from "react-icons/fi";
import FieldCard from "./FieldCard";

// List of all field configurations shown in palette
const FieldPalette = () => {
  const fields = [
    {
      id: "text-input",
      icon: <FiType size={20} />,
      label: "Text Input",
      description: "Single line text input",
    },
    {
      id: "email",
      icon: <FiMail size={20} />,
      label: "Email Input",
      description: "Email Validation Input",
    },
    {
      id: "password",
      type: "password",
      icon: <FiLock size={20} />,
      label: "Password Input",
      description: "Secure Password Input",
    },
    {
      id: "number",
      icon: <FiHash size={20} />,
      label: "Number Input",
      description: "Numeric input only",
    },
    {
      id: "date-picker",
      icon: <FiCalendar size={20} />,
      label: "Date Picker",
      description: "Date selection widget",
    },
    {
      id: "text-area",
      icon: <FiAlignJustify size={20} />,
      label: "Text Area",
      description: "Multi line text input",
    },
    {
      id: "dropdown",
      icon: <FiChevronDown size={20} />,
      label: "Drop Down Select",
      description: "Multiple choice selection",
    },
    {
      id: "radio",
      icon: <FiCircle size={20} />,
      label: "Radio Buttons",
      description: "Single choice selection",
    },
    {
      id: "checkbox",
      icon: <FiCheckSquare size={20} />,
      label: "Checkboxes",
      description: "Multiple choice selection",
    },
    {
      id: "file-upload",
      icon: <FiUpload size={20} />,
      label: "File Upload",
      description: "File upload input",
    },
    {
      id: "color",
      icon: <FiDroplet size={20} />,
      label: "Color Picker",
      description: "Pick a color",
    },
    {
      id: "range",
      icon: <FiSliders size={20} />,
      label: "Range Slider",
      description: "Select a value in a range",
    },
    {
      id: "time",
      icon: <FiClock size={20} />,
      label: "Time Picker",
      description: "Time selection widget",
    },
    {
      id: "url",
      icon: <FiLink size={20} />,
      label: "URL Input",
      description: "URL input",
    },
    {
      id: "phone-number",
      icon: <FiPhone size={20} />,
      label: "Phone Number",
      description: "Telephone Number Input",
    },
  ];

  // Map over field configs to render each FieldCard as a draggable item
  return (
    <div className="field-palette">
      {fields.map((field) => (
        <FieldCard key={field.id} {...field} />
      ))}
    </div>
  );
};

export default FieldPalette;
