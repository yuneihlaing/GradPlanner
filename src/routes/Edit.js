import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { Modal, TableModal, CourseModal } from "../components/Modal";
import Axios from "axios";
import Table from "../components/Table";
import CourseTable from "../components/CourseTable";
import GWR from "../gwr.json";
import USCP from "../uscp.json";

function Edit() {
  const [openModal, setOpenModal] = useState(false);
  const [openTableModal, setOpenTableModal] = useState(false);
  const [openCourseModal, setOpenCourseModal] = useState(false);

  const [username, setUsername] = useState(localStorage.getItem("user"));

  const [sideMenu, setSideMenu] = useState("main");

  const [quarters, setQuarters] = useState(() => {
    return JSON.parse(localStorage.getItem("quarters")) || [];
  });

  const [req, setReq] = useState(() => {
    return JSON.parse(localStorage.getItem("req")) || [];
  });

  const other = [
    {
      requirement_group: "Graduation Writing Requirement",
      courses: GWR,
    },
    { requirement_group: "United States Cultural Pluralism", courses: USCP },
  ];

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/login`;
    navigate(path);
  };

  //get username
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUsername(loggedInUser);
    } else {
      routeChange();
    }
  }, []);

  const closeModal = () => {
    setOpenTableModal(false);
    setQuarters([...JSON.parse(localStorage.getItem("quarters"))]);
  };

  useEffect(() => {
    Axios.get("http://localHost:3001/get-table?username=".concat(username))
      .then((response) => {
        setQuarters([...response.data]);
        localStorage.setItem("quarters", JSON.stringify(response.data));
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, []);

  function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }

  useEffect(() => {
    Axios.get("http://localHost:3001/get-courses?username=".concat(username))
      .then((response) => {
        var course = response.data.map((course, index) => {
          return {
            requirement_group: course["requirement_group"],
            courses: course["courses"].split(", "),
          };
        });
        course = removeDuplicates(course);
        setReq(course);
        localStorage.setItem("req", JSON.stringify(course));
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, []);

  return (
    <div className="edit">
      <div className="edit-workspace">
        <div className="edit-buttons">
          <button
            className="add-button prereq"
            onClick={() => setOpenModal(true)}
          >
            Search prerequisite
          </button>
          <button
            className="add-button table"
            onClick={() => setOpenTableModal(true)}
          >
            Add quarter
          </button>
          {openModal && <Modal onClose={() => setOpenModal(false)} />}

          <button
            className="add-button course"
            onClick={() => setOpenCourseModal(true)}
          >
            Add course
          </button>
          {openCourseModal && (
            <CourseModal
              onClose={() => setOpenCourseModal(false)}
              username={username}
            />
          )}
        </div>

        <div className="tables">
          <Table quarters={quarters} username={username} />
          {openTableModal && (
            <TableModal onClose={closeModal} username={username} />
          )}
        </div>
      </div>
      <div className="edit-display">
        <div className="side-menu">
          <button
            className={
              sideMenu == "main" ? "side-button-active" : "side-button"
            }
            onClick={() => setSideMenu("main")}
          >
            Main
          </button>
          <button
            className={
              sideMenu == "option" ? "side-button-active" : "side-button"
            }
            onClick={() => setSideMenu("option")}
          >
            Option
          </button>
          <button
            className={sideMenu == "ge" ? "side-button-active" : "side-button"}
            onClick={() => setSideMenu("ge")}
          >
            GE
          </button>
          <button
            className={
              sideMenu == "other" ? "side-button-active" : "side-button"
            }
            onClick={() => setSideMenu("other")}
          >
            Other
          </button>
        </div>
        {sideMenu == "main" && <CourseTable req={req} />}
        {sideMenu == "other" && <CourseTable req={other} />}
      </div>
    </div>
  );
}

//={() => setOpenTableModal(false)}
export default Edit;
