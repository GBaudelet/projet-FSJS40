import React from "react";
import { NavLink } from "react-router-dom";

const LeftBar = () => {
  return (
    <div className="leftbar">
      <NavLink to="/profile/personal-info">Informations personnelles</NavLink>
      <NavLink to="/profile/sheets">Vos fiches</NavLink>
      <NavLink to="/profile/admin" className="admin-only">
        Admin
      </NavLink>
    </div>
  );
};

export default LeftBar;
