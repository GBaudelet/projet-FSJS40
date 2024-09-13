import React, { useState, useEffect } from "react";

const PropertiesPanel = ({
  selectedElement,
  onUpdate,
  onDelete,
  onBackgroundColorChange,
  dropZoneBackgroundColor,
}) => {
  const [styles, setStyles] = useState({
    width: 100,
    height: 100,
    backgroundColor: "#D3D3D3",
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
        backgroundColor: selectedElement.backgroundColor || "#D3D3D3",
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
            Drop Zone Background:
            <input
              type="color"
              value={dropZoneBackgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
            />
          </label>

          <details>
            <summary>Size</summary>
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
          </details>

          <details>
            <summary>Background</summary>
            <label>
              Background Color:
              <input
                type="color"
                name="backgroundColor"
                value={styles.backgroundColor}
                onChange={handleStyleChange}
              />
            </label>
          </details>

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

          <button onClick={() => onDelete(selectedElement)}>Delete</button>
        </>
      ) : (
        <p>Select an element to edit</p>
      )}
    </div>
  );
};

export default PropertiesPanel;
