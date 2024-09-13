import React from "react";
import { Link } from "react-router-dom"; // Make sure you have react-router-dom installed

const Header = ({ isAdmin, isLoggedIn }) => {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/bible">Bible</Link>
        <Link to="/drag">Sheet</Link>
        {!isLoggedIn ? (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <Link to="/logout">Logout</Link>
        )}
        {isAdmin && <Link to="/admin">Admin</Link>}
      </nav>
    </header>
  );
};

export default Header;
