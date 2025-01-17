import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaFilePen } from "react-icons/fa6";
import "../components/Navbar.css";
import "../App.css";
import JSON from "../degrees.json";
import Axios from "axios";

// to do: set up localStorage for sign up

function Setup() {
  const { state } = useLocation();
  const { username, password } = state;

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/plan`;
    navigate(path);
  };

  const [major, setMajor] = useState("");
  const [minor, setMinor] = useState("");
  const [concentration, setConcentration] = useState("");

  const register = () => {
    Axios.post("http://localhost:3001/setup", {
      username: username,
      password: password,
      major: major,
      minor: minor,
      concentration: concentration,
    });
    routeChange();
  };

  const bachelorList = JSON["bachelor"].map((key) => ({
    name: key["name"],
  }));
  const minorList = JSON["minor"].map((key) => ({
    name: key["name"],
  }));
  const concentrationList = JSON["concentration"].map((key) => ({
    name: key["name"],
  }));

  return (
    <div className="signup">
      {" "}
      <div className="navbar-signup">
        <Link to="/" className="navbar-logo">
          <FaFilePen className="navbar-icon" />
          GradPlanner{" "}
        </Link>{" "}
      </div>{" "}
      <div className="signup-container">
        <div className="signup-border">
          <h1> Please fill out the following details. </h1>{" "}
          <div className="signup-form">
            {" "}
            <form>
              <label> Major </label>{" "}
              <select
                name="major"
                id="major"
                required
                onChange={(e) => setMajor(e.target.value)}
              >
                <option value=""> </option>{" "}
                {bachelorList.map((degree, key) => (
                  <option key={key} value={degree.name}>
                    {" "}
                    {degree.name}{" "}
                  </option>
                ))}{" "}
              </select>{" "}
              <label> Minor </label>{" "}
              <select
                name="minor"
                id="minor"
                onChange={(e) => setMinor(e.target.value)}
              >
                <option value=""> </option>{" "}
                {minorList.map((degree, key) => (
                  <option key={key} value={degree.name}>
                    {" "}
                    {degree.name}{" "}
                  </option>
                ))}{" "}
              </select>{" "}
              <label> Concentration </label>{" "}
              <select
                name="concentration"
                id="concentration"
                onChange={(e) => setConcentration(e.target.value)}
              >
                <option value=""> </option>{" "}
                {concentrationList.map((degree, key) => (
                  <option key={key} value={degree.name}>
                    {" "}
                    {degree.name}{" "}
                  </option>
                ))}{" "}
              </select>{" "}
            </form>{" "}
            <button className="setup-button" onClick={register}>
              {" "}
              Done{" "}
            </button>{" "}
          </div>{" "}
          <img src={"/hacker.png"} alt="hacker" className="hacker" />
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default Setup;
