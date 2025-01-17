var con = require("../db/dbseed").con;
var courses = require("../db/scripts/data/courses.json");
var prereqs = require("../db//scripts/data/prereq.json");
var bachelor_required = require("../db/scripts/data/bachelor-required.json");
var bachelor_optional = require("../db/scripts/data/bachelor-optional.json");
var options = require("../db/scripts/data/optional.json");

/*
//creating tables
con.connect(function (err) {
  if (err) {
    throw err;
  } else {
    con.query("USE sql3667033;");
    // con.query(
    //   "CREATE TABLE IF NOT EXISTS Courses ( \
    //   courseId varchar(10), \
    //   department varchar(30), \
    //   description varchar(500), \
    //   name varchar(50), \
    //   units int, \
    //   PRIMARY KEY(courseId));"
    // );
    // console.log("Courses table created");

    // con.query(
    //   "CREATE TABLE IF NOT EXISTS Prerequisites ( \
    //   courseId varchar(10), \
    //   prereqId varchar(10), \
    //   FOREIGN KEY (courseId) REFERENCES Courses(courseId), \
    //   FOREIGN KEY (prereqId) REFERENCES Courses(courseId));"
    // );
    // console.log("Prerequisites table created");

    // con.query(
    //   "CREATE TABLE IF NOT EXISTS BachelorRequired ( \
    //     major varchar(30), \
    //     requirement_group varchar(30), \
    //     courseId varchar(10), \
    //     FOREIGN KEY (courseId) REFERENCES Courses(courseId));"
    // );
    // console.log("Bachelor Required table created");

    // con.query(
    //   "CREATE TABLE IF NOT EXISTS BachelorOptional ( \
    //     major varchar(30), \
    //     requirement_group varchar(30), \
    //     course varchar(100), \
    //     PRIMARY KEY(course));"
    // );
    // console.log("Bachelor Required table created");

    // con.query(
    //   "CREATE TABLE IF NOT EXISTS Options ( \
    //     course varchar(100), \
    //     courseId varchar(10), \
    //     FOREIGN KEY (course) REFERENCES BachelorOptional(course), \
    //     FOREIGN KEY (courseId) REFERENCES Courses(courseId));"
    // );

    // console.log("Options table created");

    // con.query(
    //   "CREATE TABLE IF NOT EXISTS GE_Areas ( \
    //     area char, \
    //     name varchar(50), \
    //     PRIMARY KEY(area));"
    // );
    // console.log("GE_Areas table created");

    // con.query(
    //   "CREATE TABLE IF NOT EXISTS GE_Subareas ( \
    //     subarea char(2), \
    //     name varchar(50), \
    //     area char, \
    //     PRIMARY KEY(subarea), \
    //     FOREIGN KEY (area) REFERENCES GE_Areas(area));"
    // );
    // console.log("GE_Subareas table created");

    // con.query(
    //   "CREATE TABLE IF NOT EXISTS GE_Courses ( \
    //     courseId char(10), \
    //     subarea char(2), \
    //     FOREIGN KEY (courseId) REFERENCES Courses(courseId), \
    //     FOREIGN KEY (subarea) REFERENCES GE_Subareas(subarea));"
    // );
    // console.log("GE_Courses table created");

    //     con.query(
    //       "CREATE TABLE IF NOT EXISTS Users (\
    //       username varchar(30), \
    //       password varchar(30), \
    //       major varchar(30), \
    //       minor varchar(30), \
    //       concentration varchar(30), \
    //       PRIMARY KEY(username));"
    //     );
    //     console.log("Users table created");

    //     con.query(
    //       "CREATE TABLE IF NOT EXISTS Quarter( \
    //         username varchar(30), \
    //         quarter varchar(20), \
    //         FOREIGN KEY (username) REFERENCES Users(username));"
    //     );
    //     console.log("Quarter table created");

    //     con.query(
    //       "CREATE TABLE IF NOT EXISTS Taken_Courses (\
    //         username varchar(30) NOT NULL, \
    //         courseId varchar(10), \
    //         quarter varchar(20), \
    //         FOREIGN KEY (username) REFERENCES Users(username));"
    //     );
    //     console.log("Taken_Courses table created");

    //     con.query(
    //       "CREATE TABLE IF NOT EXISTS Planned_Courses (\
    //         username varchar(30) NOT NULL, \
    //         courseId varchar(10), \
    //         quarter varchar(20), \
    //         FOREIGN KEY (username) REFERENCES Users(username));"
    //     );
    //     console.log("Planned_Courses table created");
  }
});

/*
//insert tables
con.connect(function (err) {
  if (err) {
    throw err;
  } else {
    con.query("USE sql3667033;");
    // courses.forEach((course) => {
    //   const sql = `INSERT INTO Courses (courseId, department, description, name, units) VALUES (
    //         "${course.courseId}",
    //         "${course.department}",
    //         "${course.description}",
    //         "${course.name}",
    //         "${course.units}"
    //     );`;
    //   con.query(sql);
    // });

    // prereqs.forEach((prereq) => {
    //   const sql = `INSERT INTO Prerequisites (courseId, prereqId) VALUES (
    //         "${prereq.courseId}",
    //         "${prereq.prereqId}"
    //     );`;
    //   con.query(sql);
    // });

    bachelor_required.forEach((course) => {
      const sql = `INSERT INTO BachelorRequired (major, requirement_group, courseId) VALUES (
            "${course.major}",
            "${course.requirement_group}",
            "${course.course}"
        );`;
      con.query(sql);
    });

    // bachelor_optional.forEach((course) => {
    //   const sql = `INSERT INTO BachelorOptional (major, requirement_group, course) VALUES (
    //         "${course.major}",
    //         "${course.requirement_group}",
    //         "${course.course}"
    //     );`;
    //   con.query(sql);
    // });

    // options.forEach((course) => {
    //   const sql = `INSERT INTO Options (course, courseId) VALUES (
    //         "${course.course}",
    //         "${course.option}"
    //     );`;
    //   con.query(sql);
    // });

    // console.log("Database populated");
  }
});
*/
