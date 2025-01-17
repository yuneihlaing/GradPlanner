import React, { useState, useEffect } from "react";
import Axios from "axios";
import EditProfile from "../components/EditProfile";

function Profile() {
  const [username, setUsername] = useState(localStorage.getItem("user"));
  const [user, setUser] = useState("");
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    setUsername(localStorage.getItem("user"));
    Axios.get("http://localHost:3001/get-user?username=".concat(username))
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, []);

  return (
    <div className="profile">
      {!openEdit && (
        <div className="login-container">
          <div className="login-border">
            <h1>
              Profile
              <img
                src={"/edit.png"}
                alt="edit"
                className="profile-edit-icon"
                onClick={() => setOpenEdit(true)}
              />
            </h1>
            <div className="profile-info">
              <p className="profile-label">{user.username}</p>
              <p>---------------------------------------------------</p>
              <p className="profile-label">Major: {user.major}</p>
              <p className="profile-label">
                Minor: {user.minor !== "" ? user.minor : "None"}
              </p>
              <p className="profile-label">
                Concentration:
                {user.concentration !== "" ? user.concentration : "None"}
              </p>
              <p>---------------------------------------------------</p>
            </div>
          </div>
        </div>
      )}
      {openEdit && (
        <EditProfile onClose={() => setOpenEdit(false)} user={user} />
      )}
    </div>
  );
}

export default Profile;
