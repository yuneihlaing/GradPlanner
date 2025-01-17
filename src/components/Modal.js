import React, { useState, useEffect } from "react";
import Axios from "axios";

//display prerequisites as lists

export const Modal = ({ onClose }) => {
  const [course, setCourse] = useState("");
  const [status, setStatus] = useState("");
  const [prereqs, setPrereqs] = useState([]);
  // const [dataReceived, setDataReceived] = useState(false);

  //   const [data, setData] = useState("");

  const search = () => {
    Axios.get(
      "http://localhost:3001/search-prereq?course=".concat(course)
    ).then((response) => {
      if (response.data.message) {
        setStatus(response.data.message);
      } else {
        setPrereqs([...response.data]);
      }
    });
  };

  function TableHeader() {
    return (
      <thead className="course-header">
        <tr>
          <td>Prereq</td>
          <td>Name</td>
          <td>Units</td>
        </tr>
      </thead>
    );
  }

  var prereqList = prereqs.map((row, index) => {
    return (
      <table key={index} className="prereq-table">
        <TableHeader />
        <tbody>
          <tr>
            <td>{row.prereqId}</td>
            <td>{row.name}</td>
            <td>{row.units} units</td>
          </tr>
        </tbody>
      </table>
    );
  });

  return (
    <div className="popup">
      <div className="popup-top">
        <a className="closing-tag" href="#popup" onClick={onClose}>
          x
        </a>
        <h3> Search Prerequisites </h3>
      </div>
      <div className="search-preq">
        <input
          type="text"
          id="prerequisite"
          placeholder="Enter Course number / Name (eg. CSC 491 / Senior Project I )"
          onChange={(e) =>
            setCourse(e.target.value.replace(/\s+/g, "-").toUpperCase())
          }
        />
        <button className="prereq-button" onClick={search}>
          Submit
        </button>
        <p className="signup-error"> {status} </p>
        {/* {data && data.map((prereq) => <li> {prereq} </li>)} */}
        <>{prereqList}</>
      </div>
    </div>
  );
};

export const TableModal = ({ onClose, username }) => {
  const [quarter, setQuarter] = useState("");
  const [status, setStatus] = useState("");

  const add = () => {
    Axios.post("http://localhost:3001/addquarter", {
      quarter: quarter,
      username: username,
    }).then((response) => {
      if (response.err) {
        console.log(response.err);
      } else {
        localStorage.setItem("quarters", JSON.stringify(response.data));
        onClose();
      }
    });
  };

  return (
    <div className="popup">
      <div className="popup-top">
        <a className="closing-tag" href="#popup" onClick={onClose}>
          x
        </a>
        <h3>Please enter the quarter you wish to add</h3>
      </div>
      <div className="search-preq">
        <input
          type="text"
          id="quarter"
          placeholder="Enter Quarter (eg. Fall 2023)"
          onChange={(e) => setQuarter(e.target.value)}
        />
        <button className="prereq-button" onClick={add}>
          Submit
        </button>
        {/* {data && data.map((prereq) => <li> {prereq} </li>)} */}
      </div>
    </div>
  );
};

export const CourseModal = ({ onClose, username }) => {
  const [quarters, setQuarters] = useState([]);
  const [quarter, setQuarter] = useState("");
  const [course, setCourse] = useState("");
  const [department, setDepartment] = useState("");

  const [departmentList, setDepartmentList] = useState([]);
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    setQuarters([...JSON.parse(localStorage.getItem("quarters"))]);
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/get-departments").then((response) => {
      setDepartmentList([...response.data]);
    });
  }, []);

  const departmentChange = (e) => {
    setDepartment(e);
    Axios.get(
      "http://localhost:3001/get-department-courses?department=".concat(e)
    ).then((response) => {
      setCourseList([...response.data]);
    });
  };

  const add = () => {
    Axios.post("http://localhost:3001/addCourse", {
      quarter: quarter,
      course: course,
      username: username,
    }).then((response) => {
      if (response.err) {
        console.log(response.err);
      } else {
        onClose();
      }
    });
  };

  return (
    <div className="popup">
      <div className="popup-top">
        <a className="closing-tag" href="#popup" onClick={onClose}>
          x
        </a>
        <h3>Please enter the course to add</h3>
      </div>
      <div className="select-form">
        <form>
          <label htmlFor="quarter"> Quarter </label>
          <select
            name="quarter"
            id="quarter"
            required
            onChange={(e) => setQuarter(e.target.value)}
          >
            <option value="">(select one)</option>
            {quarters.map((quarter, key) => (
              <option key={key} value={quarter.quarter}>
                {quarter.quarter}
              </option>
            ))}
          </select>

          <label htmlFor="department"> Department </label>
          <select
            name="department"
            id="department"
            required
            onChange={(e) => departmentChange(e.target.value)}
          >
            <option value="">(select one)</option>
            {departmentList.map((department, key) => (
              <option key={key} value={department.department}>
                {department.department}
              </option>
            ))}
          </select>

          <label htmlFor="course"> Course </label>
          <select
            name="course"
            id="course"
            required
            onChange={(e) => setCourse(e.target.value)}
          >
            <option value="">(select one)</option>
            {courseList.map((course, key) => (
              <option key={key} value={course.courseId}>
                {course.courseId} - {course.name}
              </option>
            ))}
          </select>
        </form>
        <button className="submit-button" onClick={add}>
          Submit
        </button>
      </div>

      {/* {data && data.map((prereq) => <li> {prereq} </li>)} */}
    </div>
  );
};
