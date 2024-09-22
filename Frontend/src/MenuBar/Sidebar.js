import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ menuItems, onLogout }) => {
  return (
    <div className="sidebar">
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            {item.path === "/" ? (
              <Link onClick={onLogout}>{item.label}</Link>
            ) : (
              <Link to={item.path}>{item.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
