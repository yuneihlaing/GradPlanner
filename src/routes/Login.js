import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFilePen } from "react-icons/fa6";
import "../components/Navbar.css";
import "../App.css";
import Axios from "axios";

function Login(props) {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/edit`;
    navigate(path);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        localStorage.clear();
        // store the user in localStorage
        localStorage.setItem("user", username);
        console.log(response.data);
        routeChange();
      }
    });
  };

  // const handleLogout = () => localStorage.clear();

  return (
    <div className="login">
      <div className="navbar-login">
        <Link to="/" className="navbar-logo">
          <FaFilePen className="navbar-icon" />
          GradPlanner
        </Link>
      </div>
      <div className="login-container">
        <div className="login-border">
          <h1> Welcome back! </h1>
          <div className="login-form">
            <h2> Login </h2>
            <form>
              <label> Username </label>
              <input
                type="text"
                id="username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <label> Password </label>
              <input
                type="text"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </form>
            <p className="login-error"> {loginStatus} </p>
            <p className="login-text">
              Already have an account ?
              <Link to="/signup" className="login-to-signup">
                Sign up
              </Link>
            </p>
            <button className="login-button" onClick={login}>
              Done
            </button>
          </div>
          <img src={"/hacker.png"} alt="hacker" className="hacker" />
        </div>
      </div>
    </div>
  );
}

export default Login;
