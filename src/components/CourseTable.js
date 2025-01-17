import React, { useState, useEffect } from "react";
import "./CourseTable.css";
import { IoInformationCircleOutline } from "react-icons/io5";
import Axios from "axios";

function Popup({ data, onClose }) {
  return (
    <div className="table-popup">
      <div className="table-popup-header">
        <a className="closing-tag-popup" href="#popup" onClick={onClose}>
          x
        </a>
        <b className="blue-color">
          {data["courseId"]} : {data["name"]}
        </b>
        <p>{data["department"]}</p>
        <p className="unit">{data["units"]} units</p>
      </div>
      <p>{data["description"]}</p>
    </div>
  );
}

function TableHeader({ title }) {
  return (
    <thead className="course-header">
      <tr>
        <th>{title} </th>
        <th> </th>
      </tr>
    </thead>
  );
}
function TableBody(props) {
  // const [selectedInfo, setSelectedInfo] = useState(null);

  const handleClick = (row) => {
    // setSelectedInfo({ row });

    Axios.get(
      "http://localHost:3001/get-course-info?course=".concat(row["row"])
    )
      .then((response) => {
        props.setShow(true);
        props.setCourse(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };

  var body = props.req.map((row, index) => {
    return (
      <tbody className="course-body" key={index} data-item={row}>
        <tr>
          <td>{row} </td>
          <td
            className="icon-row"
            onClick={() => {
              handleClick({ row });
            }}
          >
            <IoInformationCircleOutline />
            {/* <img src={"/information.png"} alt="info" className="info-icon" /> */}
          </td>
        </tr>
      </tbody>
    );
  });
  return <>{body}</>;
}

function CourseTable({ req }) {
  const [show, setShow] = useState(false);
  const [course, setCourse] = useState({});

  var tables = req.map((table, index) => {
    return (
      <table className="course-table" key={index}>
        <TableHeader title={table.requirement_group} />
        <TableBody
          req={table.courses}
          setShow={setShow}
          setCourse={setCourse}
        />
      </table>
    );
  });
  return (
    <>
      {show && <Popup data={course} onClose={() => setShow(false)} />}
      <>{tables}</>
    </>
  );
}

export default CourseTable;
