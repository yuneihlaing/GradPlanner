import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaFilePen } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { BsPersonCircle } from "react-icons/bs";
import { NavLink } from "react-router-dom";

export function HomeNavbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              <FaFilePen className="navbar-icon" />
              GradPlanner{" "}
            </Link>{" "}
            <div className="menu-icon" onClick={handleClick}>
              {" "}
              {click ? <FaTimes /> : <FaBars />}{" "}
            </div>{" "}
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Home{" "}
                </NavLink>{" "}
              </li>{" "}
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Login{" "}
                </NavLink>{" "}
              </li>{" "}
              <li className="nav-item">
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Sign Up{" "}
                </NavLink>{" "}
              </li>{" "}
            </ul>{" "}
          </div>{" "}
        </nav>{" "}
      </IconContext.Provider>{" "}
    </>
  );
}

export function ProfileNavbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleLogout = () => {
    closeMobileMenu();
    localStorage.clear();
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              <FaFilePen className="navbar-icon" />
              GradPlanner{" "}
            </Link>{" "}
            <div className="menu-icon" onClick={handleClick}>
              {" "}
              {click ? <FaTimes /> : <FaBars />}{" "}
            </div>{" "}
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <NavLink
                  to="/plan"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Plan{" "}
                </NavLink>{" "}
              </li>{" "}
              <li className="nav-item">
                <NavLink
                  to="/edit"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Edit{" "}
                </NavLink>{" "}
              </li>{" "}
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={handleLogout}
                >
                  Logout{" "}
                </NavLink>{" "}
              </li>{" "}
              <li className="nav-item profile-icon">
                <NavLink to="/profile">
                  <BsPersonCircle
                    className={({ isActive }) =>
                      "nav-links" + (isActive ? " activated" : "")
                    }
                    onClick={closeMobileMenu}
                  />{" "}
                </NavLink>{" "}
              </li>{" "}
            </ul>{" "}
          </div>{" "}
        </nav>{" "}
      </IconContext.Provider>{" "}
    </>
  );
}
