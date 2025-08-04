import React from "react";
import { DndContext } from "@dnd-kit/core"; // DnD-kit main context for all drag-and-drop events
import { useDispatch, useSelector } from "react-redux"; // Redux state management hooks
import { addField, selectField } from "../store/appSlice"; // Redux actions for form state
import SidePanel from "./SidePanel"; // Palette of fields (left sidebar)
import RenderingSurface from "./RenderingSurface"; // Main canvas for building forms
import FormProperties from "./FormProperties"; // Panel for editing form/field properties
import ViewJson from "./ViewJson"; // JSON preview popup
import PreviewOn from "./PreviewOn"; // Form preview component

const FormBuilder = () => {
  // Redux dispatch function for firing actions
  const dispatch = useDispatch();

  // Redux selector to get preview and JSON display state from store
  const { isPreviewOpen, isJSONOpen } = useSelector((state) => state.form);

  /**
   * Handles the start of a drag event.
   * If dragging a "palette field" (denoted by "dragStart-" in ID), deselect any selected field.
   */
  // const handleDragStart = (event) => {
  //   const { active } = event;
  // };

  /**
   * Handles the drop of a draggable field onto a droppable area.
   * - Only proceeds when dragged from palette to a canvas section.
   * - Adds the dropped field (fieldType) into a specific section (sectionId).
   */
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return; // If not dropped over a valid area, exit

    const fieldType = active.id.toString();
    const sectionId = over.id.toString();
    // console.log("Field Type:", fieldType, "Section ID:", sectionId);

    dispatch(addField({ sectionId, fieldType }));
  };

  return (
    <div className="form-builder-root">
      {/* DndContext enables drag-and-drop events throughout the builder */}
      <DndContext onDragEnd={handleDragEnd}>
        {/* Side panel with field palette */}
        <div className="form-builder-sidebar">
          <SidePanel />
        </div>

        {/* Main canvas: displays either live form preview or the builder surface */}
        <div className="form-builder-canvas">
          {isPreviewOpen ? <PreviewOn /> : <RenderingSurface />}
        </div>

        {/* Properties panel to edit selected form/field details */}
        <div className="form-builder-properties">
          <FormProperties />
        </div>
      </DndContext>

      {/* View form JSON (modal popup) */}
      {isJSONOpen && <ViewJson />}
    </div>
  );
};

export default FormBuilder;
