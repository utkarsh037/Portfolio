import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";

function Header({ terminalMode, setTerminalMode }) {
  return (
    <header className="header">
      <h1 className="header-title">UTKARSH BHARTI</h1>
      <nav className="header-nav">
        <ul>
          <li><NavLink to="/Blogs" activeClassName="active-link">Blogs</NavLink></li>
          <li><NavLink to="/About" activeClassName="active-link">About Me</NavLink></li>
          <li><NavLink to="/Project" activeClassName="active-link">Projects</NavLink></li>
          <li><NavLink to="/Contact" activeClassName="active-link">Contact</NavLink></li>
          <li>
            <button
              className="terminal-btn"
              onClick={() => setTerminalMode(!terminalMode)}
            >
              {terminalMode ? "Exit Terminal" : "Terminal Mode"}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
