import React from "react";
// import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <div className="home">
      <div className="homepage">
        <p> A guide to a timely graduation... </p>{" "}
        <button className="home-to-signup"> Start planning </button>{" "}
      </div>{" "}
      <div className="home-icon">
        <img src="/home.png" alt="graduation" />
      </div>{" "}
    </div>
  );
}

export default Home;
