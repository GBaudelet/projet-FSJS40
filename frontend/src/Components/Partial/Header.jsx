import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../Store/Slices/User";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLogged, role_id } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onClickLogout(e) {
    e.preventDefault();
    async function fetchLogout() {
      const response = await fetch("/api/v1/authentication/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.status === 200) {
        const data = await response.json();
        dispatch(logout());
        navigate("/");
      }
    }
    fetchLogout();
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <h1 className="logo">Reroll</h1>
      <button className="burger-icon" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
      <nav className={menuOpen ? "nav-open" : ""}>
        <Link to="/">Home</Link>
        <Link to="/bible">Bible</Link>
        {isLogged ? (
          <>
            <Link to="/drag">Sheet</Link>
            {(role_id === 1 || role_id === 2) && (
              <Link to="/profil">Profil</Link>
            )}
            {role_id === 1 && <Link to="/admin">Admin</Link>}
            <Link to="/" onClick={onClickLogout}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
