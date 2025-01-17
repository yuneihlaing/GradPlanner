import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFilePen } from "react-icons/fa6";
import "../components/Navbar.css";
import "../App.css";
import Axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signupStatus, setSignupStatus] = useState("");

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/setup`;
    navigate(path, { state: { username: username, password: password } });
  };

  const checkUsername = () => {
    Axios.post("http://localhost:3001/signup", {
      username: username,
    }).then((response) => {
      if (response.data.message) {
        setSignupStatus(response.data.message);
      } else {
        localStorage.setItem("user", username);
        routeChange();
      }
    });
  };

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
          <h1> Welcome! </h1>{" "}
          <div className="signup-form">
            {" "}
            <h2> Create an account </h2>{" "}
            <form>
              <label> Username </label>{" "}
              <input
                type="text"
                id="username"
                required
                onChange={(e) => setUsername(e.target.value)}
              />{" "}
              <label> Password </label>{" "}
              <input
                type="text"
                id="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />{" "}
            </form>{" "}
            <p className="signup-error"> {signupStatus} </p>{" "}
            <p className="signup-text">
              {" "}
              Don 't have an account?{" "}
              <Link to="/login" className="signup-to-login">
                {" "}
                Login{" "}
              </Link>{" "}
              instead{" "}
            </p>{" "}
            <button className="signup-button" onClick={checkUsername}>
              {" "}
              Next{" "}
            </button>{" "}
          </div>{" "}
          <img src={"/hacker.png"} alt="hacker" className="hacker" />
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default Signup;
