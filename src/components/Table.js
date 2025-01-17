import { useState, useEffect } from "react";
import "./Table.css";
import { IoTrashOutline } from "react-icons/io5";
import Axios from "axios";

function TableHeader({ quarter }) {
  return (
    <thead>
      <tr>
        <th>{quarter}</th>
        <th>
          <img src={"/edit.png"} alt="edit" className="edit-icon" />
        </th>
      </tr>
    </thead>
  );
}
function TableBody({ quarter, planned, username, setPlanned }) {
  console.log(planned);
  const deleteCourse = (course) => {
    console.log(course);
    Axios.delete(
      "http://localhost:3001/deleteCourse?username="
        .concat(username)
        .concat("&quarter=")
        .concat(quarter)
        .concat("&course=")
        .concat(course["course"])
    ).then((response) => {
      if (response.err) {
        console.log(response.err);
      } else {
        setPlanned([...response.data]);
      }
    });
  };

  var body = planned.map((course, index) => {
    return (
      <tbody key={index}>
        <tr>
          <td> {course} </td>
          <td className="icon-row" onClick={() => deleteCourse({ course })}>
            <IoTrashOutline />
          </td>
        </tr>
      </tbody>
    );
  });
  return <>{body}</>;
}

function Table({ quarters, username }) {
  const [planned, setPlanned] = useState([]);

  useEffect(() => {
    Axios.get("http://localHost:3001/get-planned?username=".concat(username))
      .then((response) => {
        console.log(response.data);
        var course = response.data.map((course, index) => {
          return {
            quarter: course["quarter"],
            courses:
              course["courses"] != "" ? course["courses"].split(", ") : [],
          };
        });
        console.log(course);
        setPlanned(course);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, []);

  var tables = planned.map((table, index) => {
    return (
      <table key={index}>
        <TableHeader quarter={table.quarter} />
        <TableBody
          quarter={table.quarter}
          planned={table.courses}
          username={username}
          setPlanned={(item) => setPlanned(item)}
        />
      </table>
    );
  });
  return <>{tables}</>;
}

export default Table;
