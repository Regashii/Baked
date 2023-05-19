import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../pagescss/MainPage.css";

function MainPage() {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">Admin</div>
          <div className="navbar-toggle" onClick={toggleMenu}>
            {showMenu ? <FaTimes /> : <FaBars />}
          </div>
          <ul className={`navbar-menu ${showMenu ? "active" : ""}`}>
            <li
              className="navbar-item"
              onClick={() => {
                navigate("/dashboard-request");
              }}
            >
              Request
            </li>
            <li
              className="navbar-item"
              onClick={() => {
                navigate("/dashboard-ongoing");
              }}
            >
              Ongoing
            </li>
            <li
              className="navbar-item"
              onClick={() => {
                navigate("/dashboard-history");
              }}
            >
              History
            </li>
            <li
              className="navbar-item"
              onClick={() => {
                navigate("/dashboard-customer");
              }}
            >
              Customer
            </li>
            <li
              className="navbar-item"
              onClick={() => {
                navigate("/dashboard-cakes");
              }}
            >
              Cakes
            </li>
          </ul>
        </div>
      </nav>
      <main>
        <div className="main-content">
          <h1>Hello this is the admin side</h1>
          <button
            className="godly-button"
            onClick={() => {
              navigate("/login");
            }}
          >
            Proceed to login
          </button>
        </div>
      </main>
    </>
  );
}

export default MainPage;
