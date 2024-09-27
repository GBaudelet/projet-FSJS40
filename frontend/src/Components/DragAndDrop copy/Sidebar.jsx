import React from "react";

const SidebarItem = ({ item, onAddItem }) => (
  <div
    className="sidebar-item"
    onClick={() => onAddItem(item)}
    style={{ cursor: "pointer" }}
  >
    {item.name}
  </div>
);

const Sidebar = ({ onAddItem, onSave }) => {
  const items = [
    { id: 1, type: "rectangle", name: "Rectangle" },
    { id: 2, type: "circle", name: "Circle" },
    { id: 3, type: "text", name: "Text" },
    { id: 4, type: "triangle", name: "Triangle" },
    { id: 5, type: "square", name: "Square" },
  ];

  return (
    <div className="sidebar">
      {items.map((item) => (
        <SidebarItem key={item.id} item={item} onAddItem={onAddItem} />
      ))}
      <button onClick={onSave} className="save-button">
        Save Drop Zone
      </button>
    </div>
  );
};

export default Sidebar;
