import React from "react";
import { Rnd } from "react-rnd";

const DraggableElement = ({ item, onSelect }) => {
  // console.log(item.newHeight, item.newWidth);
  // console.log(item.height, item.width);
  // console.log(item.x, item.y);
  return (
    <Rnd
      bounds=".dropzone"
      default={{
        x: item.x,
        y: item.y,
        width: item.width,
        height: item.height,
      }}
      onDragStop={(e, d) => {
        onSelect(item.id, d.x, d.y, item.width, item.height);
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        const newWidth = ref.offsetWidth;
        const newHeight = ref.offsetHeight;
        // Log the new dimensions to see if they are being captured correctly
        console.log("Resized to:", newWidth, newHeight);
        onSelect(item.id, position.x, position.y, newWidth, newHeight);
      }}
      style={{
        zIndex: item.zIndex || 1,
      }}
    >
      <svg width="100%" height="100%">
        {item.type === "rectangle" && (
          <rect x="0" y="0" width="100%" height="100%" fill={item.color} />
        )}
        {item.type === "circle" && (
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={
                (Math.min(parseFloat(item.width), parseFloat(item.height)) /
                  2) *
                (100 /
                  Math.max(parseFloat(item.width), parseFloat(item.height)))
              }
              fill={item.color || "red"}
            />
          </svg>
        )}
        {item.type === "square" && (
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill={item.color || "green"}
          />
        )}
        {item.type === "triangle" && (
          <polygon
            points={`0,${item.height} ${item.width},${item.height} ${
              parseFloat(item.width) / 2
            },0`}
            fill={item.color || "orange"}
          />
        )}
        {item.type === "diamond" && (
          <polygon
            points={`50,0 ${item.width},${item.height / 2} 50,${
              item.height
            } 0,${item.height / 2}`}
            fill={item.color || "purple"}
          />
        )}
        {item.type === "ellipse" && (
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <ellipse
              cx="50"
              cy="50"
              rx={
                (parseFloat(item.width) / 2) *
                  (100 /
                    Math.max(
                      parseFloat(item.width),
                      parseFloat(item.height)
                    )) || 50
              }
              ry={
                (parseFloat(item.height) / 2) *
                  (100 /
                    Math.max(
                      parseFloat(item.width),
                      parseFloat(item.height)
                    )) || 50
              }
              fill={item.color || "yellow"}
            />
          </svg>
        )}
        {item.type === "text" && (
          <text
            x="50%"
            y="50%"
            fill={item.color || "black"}
            fontSize={item.fontSize || "16"}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {item.text || "Texte"}
          </text>
        )}
      </svg>
    </Rnd>
  );
};

export default DraggableElement;
