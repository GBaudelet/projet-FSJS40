import React from "react";
import Draggable from "react-draggable";

const DraggableElement = ({ item, onSelect }) => {
  const isTriangleUp = item.type === "triangle-up";
  const isTriangleDown = item.type === "triangle-down";

  const triangleHeight = item.baseHeight || 100; // Default height if not provided
  const triangleBaseSize = item.baseSize || 100; // Default base size if not provided

  return (
    <Draggable
      bounds=".dropzone"
      defaultPosition={{ x: item.x, y: item.y }}
      onStop={(e, d) => {
        onSelect(item.id, d.x, d.y);
      }}
    >
      <div
        style={{
          width:
            isTriangleUp || isTriangleDown ? "0" : `${item.width || 100}px`,
          height:
            isTriangleUp || isTriangleDown ? "0" : `${item.height || 100}px`,
          borderLeft:
            isTriangleUp || isTriangleDown
              ? `${item.borderWidth}px solid transparent`
              : undefined,
          borderRight:
            isTriangleUp || isTriangleDown
              ? `${item.borderWidth}px solid transparent`
              : undefined,
          borderTop: isTriangleDown
            ? `${triangleHeight}px solid ${item.baseColor || "#000000"}`
            : undefined,
          borderBottom: isTriangleUp
            ? `${triangleHeight}px solid ${item.baseColor || "#000000"}`
            : undefined,
          borderBottomWidth: isTriangleDown
            ? `${triangleBaseSize}px`
            : undefined,
          color: item.color || "#000000",
          borderStyle: item.borderStyle || "solid",
          borderWidth: item.borderWidth || "1px",
          borderColor: item.borderColor || "#000000",
          borderRadius:
            item.type === "circle" ? "50%" : `${item.borderRadius}px`,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "move",
          position: "absolute",
          backgroundColor: item.backgroundColor || "#D3D3D3",
          zIndex: item.zIndex || 1,
        }}
      >
        {item.type === "text" ? (
          <p
            style={{
              margin: 0,
              fontSize: `${item.fontSize || 16}px`,
              minWidth: "100%",
              minHeight: "100%",
            }}
          >
            {item.text || " "}
          </p>
        ) : null}
      </div>
    </Draggable>
  );
};

export default DraggableElement;
