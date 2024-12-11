import React from "react";
import DraggableElement from "./DraggableElement";

const DropZone = ({
  dropZoneRef,
  droppedItems,
  setDroppedItems,
  backgroundColor,
  setSelectedElement,
  onMoveElement,
}) => {
  const updatePosition = (id, x, y) => {
    // Math.min est utilisé pour s'assurer que les valeurs newX et newY ne dépassent pas la limite de la dropZone inférieure (0)
    //  ou la limite supérieure (100 - proportions des dimensions de l'élément).
    if (dropZoneRef.current) {
      const dropZoneBounds = dropZoneRef.current.getBoundingClientRect();
      const updatedItems = droppedItems.map((item) => {
        if (item.id === id) {
          const newX = Math.max(
            0,
            Math.min(
              (x / dropZoneBounds.width) * 100,
              100 - ((item.width || 100) / dropZoneBounds.width) * 100
            )
          );
          const newY = Math.max(
            0,
            Math.min(
              (y / dropZoneBounds.height) * 100,
              100 - ((item.height || 100) / dropZoneBounds.height) * 100
            )
          );
          onMoveElement({ id, x: newX, y: newY });
          return { ...item, x: newX, y: newY };
        }
        return item;
      });
      setDroppedItems(updatedItems);
    }
  };

  return (
    <div className="dropzone" ref={dropZoneRef} style={{ backgroundColor }}>
      {droppedItems.map((item) => (
        <DraggableElement
          key={item.id}
          item={item}
          onSelect={(id, x, y) => {
            updatePosition(id, x, y);
            setSelectedElement(item);
          }}
        />
      ))}
    </div>
  );
};

export default DropZone;
