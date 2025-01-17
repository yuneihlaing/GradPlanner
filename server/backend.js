const express = require("express");
const app = express();
const port = 3001;
var con = require("../db/dbseed").con;
// const session = require("express-session");
// const cookieParser = require("cookie-parser");
const cors = require("cors");

//parses every json object from frontend
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(cookieParser());

// const oneDay = 1000 * 60 * 60 * 24;
// app.use(
//   session({
//     secret: "mysecretkey",
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: oneDay },
//   })
// );

// app.get("/edit", (req, res) => {
//   if (req.session.userid) {
//     return res.send({ valid: true, username: req.session.userid });
//   } else {
//     return res.send({ valid: false });
//   }
// });

app.post("/addquarter", (req, res) => {
  const quarter = req.body.quarter;
  const username = req.body.username;

  con.query(
    "USE sql3667033; INSERT INTO Quarter (username, quarter) VALUES (?, ?)",
    [username, quarter],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        con.query(
          "USE sql3667033; SELECT quarter FROM Quarter WHERE username = ?",
          [username],
          (err, result) => {
            if (err) {
              res.send({ err: err });
            } else {
              res.send(result[1]);
            }
          }
        );
      }
    }
  );
});

app.get("/get-table", (req, res) => {
  const username = req.query["username"];
  con.query(
    "USE sql3667033; SELECT quarter FROM Quarter WHERE username = ?",
    [username],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        // list = Object.values(result[1]);
        // var quarters = list.map((q) => q.quarter);
        // console.log(quarters);
        res.send(result[1]);
      }
    }
  );
});

app.get("/get-courses", (req, res) => {
  const username = req.query["username"];
  con.query(
    "USE sql3667033; SELECT requirement_group, GROUP_CONCAT(courseId SEPARATOR ', ' ) AS courses FROM `BachelorRequired` WHERE major = ( SELECT major FROM `Users` WHERE `username` = ? ) GROUP BY requirement_group",
    [username],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result[1]);
      }
    }
  );
});

app.get("/get-course-info", (req, res) => {
  const course = req.query["course"];
  con.query(
    "USE sql3667033; SELECT courseId, name, department, description, units FROM `Courses` WHERE courseId = ?",
    [course],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        // console.log(result[1][0]);
        res.send(result[1][0]);
      }
    }
  );
});

app.get("/get-quarters", (req, res) => {
  const username = req.query["username"];
  con.query(
    "USE sql3667033; SELECT quarter FROM `Quarter` WHERE username = ?",
    [username],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result[1][0]);
      }
    }
  );
});

app.get("/get-departments", (req, res) => {
  con.query(
    "USE sql3667033; SELECT DISTINCT department FROM `Courses`",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        // console.log(result[1]);
        res.send(result[1]);
      }
    }
  );
});

app.get("/get-department-courses", (req, res) => {
  const department = req.query["department"];
  con.query(
    "USE sql3667033; SELECT courseId, name FROM `Courses` where department = ? ",
    [department],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        // console.log(result[1]);
        res.send(result[1]);
      }
    }
  );
});

app.get("/get-planned", (req, res) => {
  const username = req.query["username"];
  con.query(
    "USE sql3667033; SELECT quarter, GROUP_CONCAT(courseId SEPARATOR ', ' ) AS courses FROM `Planned_Courses` where username = ? GROUP BY quarter",
    [username],
    (err, result1) => {
      if (err) {
        res.send({ err: err });
      } else {
        console.log("here1");
        con.query(
          "USE sql3667033; SELECT t1.quarter FROM Quarter t1 LEFT JOIN Planned_Courses t2 ON t1.quarter = t2.quarter WHERE t1.username = ? AND t2.quarter IS NULL",
          [username],
          (err, result) => {
            if (err) {
              res.send({ err: err });
            } else {
              console.log("here");
              console.log(result);
              if (result[1].length > 0) {
                console.log(result[1]);
                var new_data = [];
                var data = result[1].map((course, index) => {
                  new_data.push({ quarter: course.quarter, courses: "" });
                });
                console.log(result1[1].concat(new_data));
                res.send(result1[1].concat(new_data));
              } else {
                res.send(result1[1]);
              }
            }
          }
        );
      }
    }
  );
});

app.post("/addCourse", (req, res) => {
  const quarter = req.body.quarter;
  const username = req.body.username;
  const course = req.body.course;

  con.query(
    "USE sql3667033; INSERT INTO Planned_Courses (username, courseId, quarter) VALUES (?, ?, ?)",
    [username, course, quarter],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        // con.query(
        //   "USE sql3667033; SELECT quarter FROM Quarter WHERE username = ?",
        //   [username],
        //   (err, result) => {
        //     if (err) {
        //       res.send({ err: err });
        //     } else {
        //       res.send(result[1]);
        //     }
        //   }
        // );
      }
    }
  );
});

app.post("/editUser", (req, res) => {
  const username = req.body.username;
  const major = req.body.major;
  const minor = req.body.minor;
  const concentration = req.body.concentration;

  con.query(
    "USE sql3667033; UPDATE Users SET major = ?, minor = ?, concentration = ? WHERE username = ?",
    [major, minor, concentration, username],
    (err, result) => {
      if (err) {
        res.send({ err: "Error occured. Please refresh and try again." });
      } else {
        res.send({ message: "Your profile has been updated" });
      }
    }
  );
});

app.delete("/deleteCourse", (req, res) => {
  const username = req.query["username"];
  const quarter = req.query["quarter"];
  const course = req.query["course"];

  con.query(
    "USE sql3667033; DELETE FROM Planned_Courses WHERE username = ? AND courseId = ? AND quarter = ?",
    [username, course, quarter],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        con.query(
          "USE sql3667033; SELECT quarter, courseId FROM `Planned_Courses` where username = ? ",
          [username],
          (err, result) => {
            if (err) {
              res.send({ err: err });
            } else {
              // console.log(result[1]);
              res.send(result[1]);
            }
          }
        );
      }
    }
  );
});

app.post("/signup", (req, res) => {
  const username = req.body.username;
  con.query(
    "USE sql3667033; SELECT * FROM Users WHERE username = ?",
    [username],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result[1].length > 0) {
        res.send({
          message: "Username already exists. Please choose a different one.",
        });
        // console.log(result);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/setup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const major = req.body.major;
  const minor = req.body.minor;
  const concentration = req.body.concentration;
  con.query(
    "USE sql3667033; INSERT INTO Users (username, password, major, minor, concentration) VALUES (?, ?, ?, ?, ?)",
    [username, password, major, minor, concentration],
    (err, result) => {
      console.log(err);
    }
  );
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  con.query(
    "USE sql3667033; SELECT * FROM Users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result[1].length > 0) {
        res.send(result);
      } else {
        res.send({
          message: "Incorrect username or password. Please try again.",
        });
      }
    }
  );
});

app.get("/search-prereq", (req, res) => {
  const course = req.query["course"].replace(/-/g, " ");
  con.query(
    "USE sql3667033; SELECT prereqId, name, description, units FROM Prerequisites INNER JOIN Courses ON Prerequisites.prereqId = Courses.courseId WHERE (Prerequisites.courseId = ? OR Courses.name = ?);",
    [course, course],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        if (result[1].length >= 1) {
          res.send(result[1]);
        } else {
          res.send({
            message:
              "Prerequisites does not exist for this course. Please check the input carefully",
          });
        }
      }
    }
  );
});

app.get("/get-user", (req, res) => {
  const username = req.query["username"];
  con.query(
    "USE sql3667033; SELECT username, major, minor, concentration FROM Users where username = ?;",
    [username],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result[1][0]);
      }
    }
  );
});

// app.get("logout", (req, res) => {
//   req.session.destroy();
//   res.redirect("/");
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
