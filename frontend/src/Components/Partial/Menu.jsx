import React, { useState } from "react";
import "../../assets/scss/DropdownMenu.css";

const DropdownMenu = () => {
  const [isOpenMenu1, setIsOpenMenu1] = useState(false);
  const [isOpenMenu2, setIsOpenMenu2] = useState(false);
  const [isOpenMenu3, setIsOpenMenu3] = useState(false);

  const toggleMenu1 = () => {
    setIsOpenMenu1(!isOpenMenu1);
  };

  const toggleMenu2 = () => {
    setIsOpenMenu2(!isOpenMenu2);
  };

  const toggleMenu3 = () => {
    setIsOpenMenu3(!isOpenMenu3);
  };

  return (
    <>
      <div className="dropdown">
        <div className="dropdown-header" onClick={toggleMenu1}>
          <span>Title 1</span>
          <span className={`arrow ${isOpenMenu1 ? "open" : ""}`}>▶</span>
        </div>
        {isOpenMenu1 && (
          <div className="dropdown-menu">
            <a href="#item1">Item 1</a>
            <a href="#item2">Item 2</a>
            <a href="#item3">Item 3</a>
          </div>
        )}
      </div>

      <div className="dropdown">
        <div className="dropdown-header" onClick={toggleMenu2}>
          <span>Title 2</span>
          <span className={`arrow ${isOpenMenu2 ? "open" : ""}`}>▶</span>
        </div>
        {isOpenMenu2 && (
          <div className="dropdown-menu">
            <a href="#item1">Item 1</a>
            <a href="#item2">Item 2</a>
            <a href="#item3">Item 3</a>
          </div>
        )}
      </div>

      <div className="dropdown">
        <div className="dropdown-header" onClick={toggleMenu3}>
          <span>Title 3</span>
          <span className={`arrow ${isOpenMenu3 ? "open" : ""}`}>▶</span>
        </div>
        {isOpenMenu3 && (
          <div className="dropdown-menu">
            <a href="#item1">Item 1</a>
            <a href="#item2">Item 2</a>
            <a href="#item3">Item 3</a>
          </div>
        )}
      </div>
    </>
  );
};

export default DropdownMenu;
