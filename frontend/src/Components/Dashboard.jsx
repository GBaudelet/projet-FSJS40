import React, { useState } from "react";
import UsersPage from "./Dashboard/User.jsx";
import TagsPage from "./Dashboard/Tags.jsx";
import SheetsPage from "./Dashboard/Sheet.jsx";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("users");

  const handleNavigation = (page) => {
    setActivePage(page);
  };

  return (
    <div id="dashboard">
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
          </ul>
        </aside>

        <main className="dashboard-main">
          {activePage === "users" && <UsersPage />}
          {activePage === "tags" && <TagsPage />}
          {activePage === "sheets" && <SheetsPage />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
