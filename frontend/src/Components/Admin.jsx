import React, { useState } from "react";
import "../assets/scss/admin.scss";
import UsersPage from "./Admin/User.jsx";
import TagsPage from "./Admin/Tags.jsx";
import SheetsPage from "./Admin/Sheet.jsx";
import BlocksPage from "./Admin/Bloc.jsx";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("users");

  const handleNavigation = (page) => {
    setActivePage(page);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-body">
        <aside className="dashboard-sidebar">
          <ul>
            <li
              onClick={() => handleNavigation("users")}
              className={activePage === "users" ? "active" : ""}
            >
              Users
            </li>
            <li
              onClick={() => handleNavigation("tags")}
              className={activePage === "tags" ? "active" : ""}
            >
              Tags
            </li>
            <li
              onClick={() => handleNavigation("sheets")}
              className={activePage === "sheets" ? "active" : ""}
            >
              Sheets
            </li>
            <li
              onClick={() => handleNavigation("blocks")}
              className={activePage === "blocks" ? "active" : ""}
            >
              Blocks
            </li>
          </ul>
        </aside>

        <main className="dashboard-main">
          {activePage === "users" && <UsersPage />}
          {activePage === "tags" && <TagsPage />}
          {activePage === "sheets" && <SheetsPage />}
          {activePage === "blocks" && <BlocksPage />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
