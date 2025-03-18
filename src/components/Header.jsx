import React, { useState } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Header({ terminalMode, setTerminalMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <h1 className="header-title">UTKARSH BHARTI</h1>
      <nav className={`header-nav ${menuOpen ? "open" : ""}`}>
        <ul>
          <li><NavLink to="/Blogs" activeClassName="active-link" onClick={closeMenu}>Blogs</NavLink></li>
          <li><NavLink to="/About" activeClassName="active-link" onClick={closeMenu}>About Me</NavLink></li>
          <li><NavLink to="/Project" activeClassName="active-link" onClick={closeMenu}>Projects</NavLink></li>
          <li><NavLink to="/Contact" activeClassName="active-link" onClick={closeMenu}>Contact</NavLink></li>
          <li>
            <button
              className="terminal-btn"
              onClick={() => {
                setTerminalMode(!terminalMode);
                closeMenu();
              }}
            >
              {terminalMode ? "Exit Terminal" : "Terminal Mode"}
            </button>
          </li>
        </ul>
      </nav>
      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </header>
  );
}

export default Header;
