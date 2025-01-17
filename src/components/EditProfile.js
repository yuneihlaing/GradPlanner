import React, { useState, useEffect } from "react";
import Axios from "axios";
import JSON from "../degrees.json";

const EditProfile = ({ onClose, user }) => {
  const [major, setMajor] = useState(user.major);
  const [minor, setMinor] = useState(user.minor);
  const [concentration, setConcentration] = useState(user.concentration);
  const [status, setStatus] = useState("");

  const bachelorList = JSON["bachelor"].map((key) => ({
    name: key["name"],
  }));
  const minorList = JSON["minor"].map((key) => ({
    name: key["name"],
  }));
  const concentrationList = JSON["concentration"].map((key) => ({
    name: key["name"],
  }));

  const change = () => {
    Axios.post("http://localhost:3001/editUser", {
      username: user.username,
      major: major,
      minor: minor,
      concentration: concentration,
    }).then((response) => {
      if (response.err) {
        setStatus(response.err);
      } else {
        console.log(response.data.message);
        setStatus(response.data.message);
      }
    });
  };

  return (
    <div className="login-container">
      <div className="login-border">
        <a className="close-edit" onClick={onClose}>
          x
        </a>
        <h1>Profile</h1>
        <div className="profile-info">
          <p className="profile-label">{user.username}</p>
          <p>---------------------------------------------------</p>
          <p className="profile-label">
            Major:
            <select
              name="major"
              id="major"
              required
              onChange={(e) => setMajor(e.target.value)}
            >
              <option value={user.major}>{user.major}</option>
              {bachelorList.map((degree, key) => (
                <option key={key} value={degree.name}>
                  {degree.name}
                </option>
              ))}
            </select>
          </p>
          <p className="profile-label">
            Minor:
            <select
              name="minor"
              id="minor"
              onChange={(e) => setMinor(e.target.value)}
            >
              <option value={user.minor}>{user.minor}</option>
              {minorList.map((degree, key) => (
                <option key={key} value={degree.name}>
                  {degree.name}
                </option>
              ))}
            </select>
          </p>
          <p className="profile-label">
            Concentration:
            <select
              name="concentration"
              id="concentration"
              onChange={(e) => setConcentration(e.target.value)}
            >
              <option value={user.concentration}>{user.concentration}</option>
              {concentrationList.map((degree, key) => (
                <option key={key} value={degree.name}>
                  {degree.name}
                </option>
              ))}
            </select>
          </p>
          <p>---------------------------------------------------</p>
          {status !== "" ? <p className="profile-success">{status}</p> : ""}
          <button className="profile-button" onClick={change}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
