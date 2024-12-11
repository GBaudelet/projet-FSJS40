import React, { useState, useRef } from "react";
import Sidebar from "./DragAndDrop/Sidebar";
import DropZone from "./DragAndDrop/DropZone";
import PropertiesPanel from "./DragAndDrop/PropertiesPanel";
import { useSelector } from "react-redux";
import SavePopup from "./Partial/savePop";
import domtoimage from "dom-to-image";

const Drag = () => {
  const [droppedItems, setDroppedItems] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [dropZoneBackgroundColor, setDropZoneBackgroundColor] =
    useState("#d3d3d3");
  const dropZoneRef = useRef(null);
  const userId = useSelector((state) => state.user.id);
  const [showPopup, setShowPopup] = useState(false);

  const addItemToDropZone = (item) => {
    const newItem = {
      id: Date.now(),
      type: item.type,
      x: item.x || 0,
      y: item.y || 0,
      width:
        item.type === "triangle-up" || item.type === "triangle-down"
          ? 0
          : item.width || 100,
      height:
        item.type === "triangle-up" || item.type === "triangle-down"
          ? 0
          : item.height || 100,
      backgroundColor:
        item.type === "text" ||
        item.type === "triangle-up" ||
        item.type === "triangle-down"
          ? "rgba(0, 0, 0, 0)"
          : "rgba(211, 211, 211, 1)",
      text: item.type === "text" ? "Editable Text" : "",
      borderStyle: item.borderStyle || "solid",
      borderWidth: item.borderWidth || getBorderWidth(item),
      borderColor: item.borderColor || getBorderColor(item),
      borderRadius: item.type === "circle" ? "50%" : "0",
      color: item.color || "#000000",
      size: item.fontSize || "16px",
      zIndex: item.zIndex || 1,
      baseHeight: item.baseHeight || 100,
      baseColor: item.baseColor || "#000000",
      baseSize: item.baseSize || 100,
    };
    setDroppedItems([...droppedItems, newItem]);
  };

  const getBorderWidth = (item) => {
    return item.type === "triangle-up"
      ? "0px 100px 100px 100px"
      : item.type === "triangle-down"
      ? "100px 100px 0px 100px"
      : "1px";
  };

  const getBorderColor = (item) => {
    return item.type === "triangle-up"
      ? "rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 1) rgba(0, 0, 0, 0)"
      : item.type === "triangle-down"
      ? "rgba(0, 0, 0, 1) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0)"
      : "#000000";
  };

  const handleElementSelect = (item) => {
    setSelectedElement(item);
  };

  const handleElementMove = (movedElement) => {
    setDroppedItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === movedElement.id ? { ...item, ...movedElement } : item
      );
      handleSave(updatedItems);
      return updatedItems;
    });
  };

  const handleElementUpdate = (updatedElement) => {
    setDroppedItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === updatedElement.id ? { ...item, ...updatedElement } : item
      );
      handleSave(updatedItems);
      return updatedItems;
    });
  };

  const handleElementDelete = (element) => {
    setDroppedItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== element.id);
      handleSave(updatedItems);
      return updatedItems;
    });
    setSelectedElement(null);
  };

  const handleSave = (data = {}) => {
    const itemsToSave = Array.isArray(data.items) ? data.items : droppedItems;

    const saveData = {
      userId: userId,
      backgroundColor: dropZoneBackgroundColor,
      items: itemsToSave.map((item) => ({ ...item })),
    };

    localStorage.setItem("dropZoneData", JSON.stringify(saveData));
  };

  const handleLoad = () => {
    const savedData = localStorage.getItem("dropZoneData");
    if (savedData) {
      const { items, backgroundColor } = JSON.parse(savedData);
      setDropZoneBackgroundColor(backgroundColor);

      if (dropZoneRef.current) {
        const dropZoneBounds = dropZoneRef.current.getBoundingClientRect();

        const updatedItems = items.map((item) => {
          const xPos = (item.x / 100) * dropZoneBounds.width;
          const yPos = (item.y / 100) * dropZoneBounds.height;

          return {
            ...item,
            x: xPos > dropZoneBounds.width ? 0 : xPos,
            y: yPos > dropZoneBounds.height ? 0 : yPos,
          };
        });

        setDroppedItems(updatedItems);
      }
    }
  };

  const onOpen = () => {
    setShowPopup(true);
  };

  const onClose = () => {
    setShowPopup(false);
  };

  const handleFormSubmit = (formData) => {
    if (dropZoneRef.current) {
      domtoimage
        .toPng(dropZoneRef.current, {
          style: { margin: 0, padding: 0, border: "none" },
        })
        .then((dataUrl) => {
          const img = new Image();
          img.src = dataUrl;

          fetch(img.src)
            .then((res) => res.blob())
            .then((blob) => {
              const file = new File([blob], "dropzone-image.png", {
                type: "image/png",
              });
              const formDataWithImage = new FormData();
              formDataWithImage.append("file", file);
              formDataWithImage.append(
                "data",
                JSON.stringify({
                  ...formData,
                  userId,
                  droppedItems,
                  backgroundColor: dropZoneBackgroundColor,
                })
              );

              fetch("http://localhost:9000/api/v1/sheet/create", {
                method: "POST",
                body: formDataWithImage,
                credentials: "include",
              })
                .then((response) => response.json())
                .then((data) => {
                  setShowPopup(false);
                })
                .catch((error) => console.error("Error saving data:", error));
            });
        })
        .catch((error) => {
          console.error("Error capturing image:", error);
        });
    }
  };

  return (
    <div className="drag">
      <Sidebar
        onAddItem={addItemToDropZone}
        onLoad={handleLoad}
        onOpen={onOpen}
      />
      <DropZone
        dropZoneRef={dropZoneRef}
        droppedItems={droppedItems}
        setDroppedItems={setDroppedItems}
        onSelectElement={handleElementSelect}
        setSelectedElement={setSelectedElement}
        backgroundColor={dropZoneBackgroundColor}
        onUpdateElement={handleElementUpdate}
        onMoveElement={handleElementMove}
      />
      <PropertiesPanel
        selectedElement={selectedElement}
        onUpdate={handleElementUpdate}
        onDelete={handleElementDelete}
        setSelectedElement={setSelectedElement}
        onBackgroundColorChange={setDropZoneBackgroundColor}
        dropZoneBackgroundColor={dropZoneBackgroundColor}
      />

      {showPopup && (
        <SavePopup onClick={onClose} onSubmitForm={handleFormSubmit} />
      )}
    </div>
  );
};

export default Drag;
