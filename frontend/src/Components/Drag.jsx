import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable"; // Importation de react-draggable
import "../assets/scss/Drag.css"; // Import du fichier CSS

const SidebarItem = ({ item, onAddItem }) => {
  return (
    <div
      className="sidebar-item"
      onClick={() => onAddItem(item)}
      style={{ cursor: "pointer" }}
    >
      {item.name}
    </div>
  );
};

const DraggableElement = ({ item, onSelect, updatePosition }) => {
  const handleStop = (e, data) => {
    updatePosition(item.id, data.x, data.y);
  };

  return (
    <Draggable
      bounds="parent"
      defaultPosition={{ x: item.x, y: item.y }}
      onStop={handleStop}
    >
      <div
        className="draggable-element"
        style={{
          width: `${item.width || 100}px`,
          height: `${item.height || 100}px`,
          backgroundColor:
            item.type === "text"
              ? "transparent"
              : item.backgroundColor || "lightgray",
          fontSize: `${item.fontSize || 16}px`,
          fontFamily: item.fontFamily || "Arial",
          color: item.color || "#000000",
          borderStyle: item.borderStyle || "solid",
          borderWidth: item.borderWidth || "1px",
          borderColor: item.borderColor || "#000000",
          borderRadius: `${item.borderRadius || 0}px`,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "move",
          position: "absolute",
        }}
        onClick={() => onSelect(item)}
      >
        {item.type === "text" ? (
          <p style={{ margin: 0, minWidth: "100%", minHeight: "100%" }}>
            {item.text || " "}
          </p>
        ) : (
          item.type
        )}
      </div>
    </Draggable>
  );
};

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

const PropertiesPanel = ({ selectedElement, onUpdate, onDelete }) => {
  const [styles, setStyles] = useState({
    width: 100,
    height: 100,
    backgroundColor: "lightgray",
    text: "",
    fontSize: 16,
    fontFamily: "Arial",
    color: "#000000",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#000000",
    borderRadius: 0,
  });

  useEffect(() => {
    if (selectedElement) {
      setStyles({
        width: selectedElement.width || 100,
        height: selectedElement.height || 100,
        backgroundColor: selectedElement.backgroundColor || "lightgray",
        text: selectedElement.text || "",
        fontSize: selectedElement.fontSize || 16,
        fontFamily: selectedElement.fontFamily || "Arial",
        color: selectedElement.color || "#000000",
        borderWidth: selectedElement.borderWidth || "1px",
        borderStyle: selectedElement.borderStyle || "solid",
        borderColor: selectedElement.borderColor || "#000000",
        borderRadius: selectedElement.borderRadius || 0,
      });
    }
  }, [selectedElement]);

  const handleStyleChange = (e) => {
    const { name, value } = e.target;
    setStyles((prevStyles) => ({ ...prevStyles, [name]: value }));
    onUpdate({ ...selectedElement, [name]: value });
  };

  return (
    <div className="properties-panel">
      {selectedElement ? (
        <>
          <label>
            Width:
            <input
              type="number"
              name="width"
              value={styles.width}
              onChange={handleStyleChange}
            />
          </label>
          <label>
            Height:
            <input
              type="number"
              name="height"
              value={styles.height}
              onChange={handleStyleChange}
            />
          </label>
          <label>
            Background Color:
            <input
              type="color"
              name="backgroundColor"
              value={styles.backgroundColor}
              onChange={handleStyleChange}
            />
          </label>

          <label>
            Border Style:
            <select
              name="borderStyle"
              value={styles.borderStyle}
              onChange={handleStyleChange}
            >
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
              <option value="dotted">Dotted</option>
              <option value="double">Double</option>
              <option value="none">None</option>
            </select>
          </label>
          <label>
            Border Color:
            <input
              type="color"
              name="borderColor"
              value={styles.borderColor}
              onChange={handleStyleChange}
            />
          </label>
          <label>
            Border Radius:
            <input
              type="number"
              name="borderRadius"
              value={styles.borderRadius}
              onChange={handleStyleChange}
              placeholder="e.g., 10px"
            />
          </label>
          {selectedElement.type === "text" && (
            <>
              <label>
                Text:
                <input
                  type="text"
                  name="text"
                  value={styles.text}
                  onChange={handleStyleChange}
                />
              </label>
              <label>
                Font Size:
                <input
                  type="number"
                  name="fontSize"
                  value={styles.fontSize}
                  onChange={handleStyleChange}
                />
              </label>
              <label>
                Font Family:
                <select
                  name="fontFamily"
                  value={styles.fontFamily}
                  onChange={handleStyleChange}
                >
                  <option value="Arial">Arial</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Verdana">Verdana</option>
                </select>
              </label>
              <label>
                Font Color:
                <input
                  type="color"
                  name="color"
                  value={styles.color}
                  onChange={handleStyleChange}
                />
              </label>
            </>
          )}
          <button
            className="delete-button"
            onClick={() => onDelete(selectedElement.id)}
          >
            Supprimer l'élément
          </button>
        </>
      ) : (
        <p>Sélectionnez un élément pour le modifier</p>
      )}
    </div>
  );
};

const Drag = () => {
  const [droppedItems, setDroppedItems] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  const items = [
    { id: 1, type: "rectangle", name: "Rectangle" },
    { id: 2, type: "circle", name: "Circle" },
    { id: 3, type: "text", name: "Text" },
  ];

  const handleAddItem = (item) => {
    setDroppedItems((prevItems) => [
      ...prevItems,
      {
        ...item,
        id: prevItems.length + 1,
        x: 50,
        y: 50,
        fromSidebar: false,
      },
    ]);
  };

  const handleUpdateElement = (updatedElement) => {
    setDroppedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === updatedElement.id ? updatedElement : item
      )
    );
    setSelectedElement(updatedElement); // Mettre à jour également l'élément sélectionné
  };

  const handleDeleteElement = (id) => {
    setDroppedItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setSelectedElement(null); // Réinitialiser l'élément sélectionné après suppression
  };

  return (
    <div className="app">
      <div className="sidebar">
        {items.map((item) => (
          <SidebarItem key={item.id} item={item} onAddItem={handleAddItem} />
        ))}
      </div>

      <DropZone
        droppedItems={droppedItems}
        setDroppedItems={setDroppedItems}
        onSelectElement={setSelectedElement}
      />

      <PropertiesPanel
        selectedElement={selectedElement}
        onUpdate={handleUpdateElement}
        onDelete={handleDeleteElement}
      />
    </div>
  );
};

export default Drag;
