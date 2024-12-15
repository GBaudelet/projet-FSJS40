import React from "react";

const SidebarItem = ({ item, onAddItem }) => (
  <div
    className="sidebar-item"
    onClick={() => onAddItem(item)}
    style={{ cursor: "pointer" }}
  >
    <span className="icon">{item.icon}</span>
    <span className="name">{item.name}</span>{" "}
  </div>
);

const Sidebar = ({ onAddItem, onLoad, onOpen }) => {
  const items = [
    { id: 1, type: "rectangle", name: "Rectangle", icon: "▭" },
    { id: 2, type: "circle", name: "Circle", icon: "●" },
    { id: 3, type: "text", name: "Text", icon: "✎" },
    { id: 4, type: "triangle-up", name: "Triangle-up", icon: "▲" },
    { id: 6, type: "triangle-down", name: "Triangle-down", icon: "▼" },
  ];

  return (
    <div className="sidebar">
      {items.map((item) => (
        <SidebarItem key={item.id} item={item} onAddItem={onAddItem} />
      ))}

      <button onClick={onLoad} className="button">
        <span className="icon">⤵️</span>
        <span className="name">Charger une fiche</span>
      </button>

      <button onClick={onOpen} className="button">
        <span className="icon">💾</span>
        <span className="name">Enregistrer la fiche</span>
      </button>
    </div>
  );
};

export default Sidebar;
