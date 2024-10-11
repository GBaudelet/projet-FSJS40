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
    backgroundColor: "rgba(211, 211, 211, 1)",
    text: "",
    fontSize: 16,
    color: "#000000",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#000000",
    borderRadius: 0,
    zIndex: 1,
    alpha: 1,
  });

  useEffect(() => {
    if (selectedElement) {
      const rgbaMatch = selectedElement.backgroundColor.match(
        /rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d\.]+)?\)/
      );
      const alphaValue = rgbaMatch ? parseFloat(rgbaMatch[4]) : 1;
      setStyles({
        width: selectedElement.width || 0,
        height: selectedElement.height || 0,
        backgroundColor:
          selectedElement.backgroundColor || "rgba(211, 211, 211, 1)",
        text: selectedElement.text || "",
        fontSize: selectedElement.fontSize || 16,
        color: selectedElement.color || "#000000",
        borderWidth: selectedElement.borderWidth || "1px",
        borderStyle: selectedElement.borderStyle || "solid",
        borderColor: selectedElement.borderColor || "#000000",
        borderRadius: selectedElement.borderRadius || 0,
        zIndex: selectedElement.zIndex || 1,
        alpha: alphaValue,
      });
    }
  }, [selectedElement]);

  const handleStyleChange = (e) => {
    const { name, value } = e.target;
    const updatedStyles = {
      ...styles,
      [name]: value,
    };

    // Handle the update of RGBA
    if (name === "alpha") {
      const rgbaMatch = styles.backgroundColor.match(
        /rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d\.]+)?\)/
      );
      if (rgbaMatch) {
        const r = rgbaMatch[1];
        const g = rgbaMatch[2];
        const b = rgbaMatch[3];
        updatedStyles.backgroundColor = `rgba(${r}, ${g}, ${b}, ${value})`;
      }
    }
    setStyles(updatedStyles);

    const updatedElement = {
      ...selectedElement,
      ...updatedStyles,
    };
    onUpdate(updatedElement);
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
                value={styles.backgroundColor.replace(/, [\d\.]+\)$/, ")")}
                onChange={handleStyleChange}
              />
            </label>
            <label>
              Background Alpha (Transparency):
              <input
                type="range"
                name="alpha"
                min="0"
                max="1"
                step="0.01"
                value={styles.alpha}
                onChange={handleStyleChange}
              />
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
                type="range"
                min="0"
                max="100"
                name="borderRadius"
                value={styles.borderRadius}
                onChange={handleStyleChange}
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

          {/* Width */}
          <details>
            <summary>Width</summary>
            <label>
              <input
                type="number"
                name="width"
                value={styles.width}
                onChange={handleStyleChange}
              />
            </label>
          </details>

          {/* Height */}
          <details>
            <summary>Height</summary>
            <label>
              <input
                type="number"
                name="height"
                value={styles.height}
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
