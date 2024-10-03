import React, { useState, useEffect } from "react";

const PropertiesPanel = ({
  selectedElement,
  onUpdate,
  onDelete,
  onBackgroundColorChange,
  dropZoneBackgroundColor,
}) => {
  const [styles, setStyles] = useState({
    width: 0,
    height: 0,
    backgroundColor: "#D3D3D3",
    text: "",
    fontSize: 16,
    fontFamily: "Arial",
    color: "#000000",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#000000",
    borderRadius: 0,
    zIndex: 1,
    rotation: "0",
    isTransparent: false,
  });

  useEffect(() => {
    if (selectedElement) {
      console.log("width", selectedElement.width);
      setStyles({
        width: selectedElement.width,
        height: selectedElement.height,
        backgroundColor: selectedElement.backgroundColor || "#D3D3D3",
        text: selectedElement.text || "",
        fontSize: selectedElement.fontSize || 16,
        fontFamily: selectedElement.fontFamily || "Arial",
        color: selectedElement.color || "#000000",
        borderWidth: selectedElement.borderWidth || "1px",
        borderStyle: selectedElement.borderStyle || "solid",
        borderColor: selectedElement.borderColor || "#000000",
        borderRadius: selectedElement.borderRadius || 0,
        zIndex: selectedElement.zIndex || 1,
        rotation: selectedElement.rotation || "0",
        isTransparent: selectedElement.backgroundColor === "transparent",
      });
      // console.log("rotation", selectedElement.rotation);
      console.log("width", selectedElement);
    }
  }, [selectedElement]);

  const handleStyleChange = (e) => {
    const { name, value } = e.target;
    setStyles((prevStyles) => ({ ...prevStyles, [name]: value }));

    onUpdate({ ...selectedElement, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setStyles((prevStyles) => ({ ...prevStyles, [name]: checked }));

    if (name === "isTransparent" && checked) {
      onUpdate({
        ...selectedElement,
        backgroundColor: "transparent",
        backgroundImage: "",
      });
    } else if (name === "isTransparent" && !checked) {
      onUpdate({ ...selectedElement, backgroundColor: styles.backgroundColor });
    }
  };

  return (
    <div className="properties-panel">
      {selectedElement ? (
        <>
          {/* BACKGROUND DROP ZONE */}
          <label>
            Drop Zone Background:
            <input
              type="color"
              value={dropZoneBackgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
            />
          </label>
          {/* BACKGROUND ELEMENT */}
          <details>
            <summary>Background</summary>
            <label>
              Background Color:
              <input
                type="color"
                name="backgroundColor"
                value={styles.backgroundColor}
                onChange={(e) =>
                  onUpdate({
                    ...selectedElement,
                    backgroundColor: e.target.value,
                  })
                }
              />
            </label>
            <label>
              <input
                type="checkbox"
                name="isTransparent"
                checked={styles.isTransparent}
                onChange={handleCheckboxChange}
              />
              Transparent
            </label>
          </details>

          {/* ZINDEX */}
          <details>
            <summary>Z-Index</summary>
            <label>
              Z-Index:
              <input
                type="number"
                name="zIndex"
                value={styles.zIndex}
                onChange={handleStyleChange}
              />
            </label>
          </details>

          {/* BORDER */}
          <details>
            <summary>Border</summary>
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
          </details>

          {/* TEXT */}
          {selectedElement.type === "text" && (
            <details>
              <summary>Text</summary>
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
            </details>
          )}

          {/* ROTATION */}
          <details>
            <summary>Rotation</summary>
            <label>
              Rotation (degrees):
              <input
                type="range"
                name="rotation"
                value={styles.rotation}
                min="0"
                max="360"
                placeholder="0"
                onChange={handleStyleChange}
              />
            </label>
          </details>
          {/* width */}
          <details>
            <summary>width</summary>
            <label>
              <input
                type="range"
                name="width"
                value={styles.width}
                min="0"
                max="1000"
                onChange={handleStyleChange}
              />
            </label>
          </details>
          {/* height */}
          <details>
            <summary>height</summary>
            <label>
              <input
                type="range"
                name="height"
                value={styles.height}
                min="0"
                max="1000"
                onChange={handleStyleChange}
              />
            </label>
          </details>

          <button onClick={() => onDelete(selectedElement)}>Delete</button>
        </>
      ) : (
        <p>Select an element to edit</p>
      )}
    </div>
  );
};

export default PropertiesPanel;
