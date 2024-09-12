import React, { useRef, useEffect } from "react";
import DraggableElement from "./DraggableElement";

const DropZone = ({ droppedItems, setDroppedItems, onSelectElement }) => {
  const dropZoneRef = useRef(null);

  const updatePosition = (id, x, y) => {
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
          return { ...item, x: newX, y: newY };
        }
        return item;
      });
      setDroppedItems(updatedItems);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setDroppedItems((prevItems) =>
        prevItems.map((item) => {
          const dropZoneBounds = dropZoneRef.current.getBoundingClientRect();
          const newX = Math.max(
            0,
            Math.min(
              (item.x / 100) * dropZoneBounds.width,
              dropZoneBounds.width - (item.width || 100)
            )
          );
          const newY = Math.max(
            0,
            Math.min(
              (item.y / 100) * dropZoneBounds.height,
              dropZoneBounds.height - (item.height || 100)
            )
          );
          return { ...item, x: newX, y: newY };
        })
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [droppedItems]);

  return (
    <div className="dropzone" ref={dropZoneRef}>
      {droppedItems.map((item) => (
        <DraggableElement
          key={item.id}
          item={item}
          onSelect={onSelectElement}
          updatePosition={updatePosition}
        />
      ))}
    </div>
  );
};

export default DropZone;
