const express = require("express");
const Router = express.Router();
const { rosterDB } = require("../db");
const { validateFields } = require("../middleware");

Router.get("/id/:userId", (req, res) => {
  const { userId } = req.params;
  res.send(rosterDB.getOneStudent(userId));
});

/* 
- READ
    GET /api/students
    GET /api/students?name&location
*/
Router.get("/", (req, res) => {
  res.send(rosterDB.getManyStudents(req.query));
});

/*
  - CREATE
      POST /api/students
      {name, location}
  */
Router.post("/", validateFields, (req, res) => {
  res.send(rosterDB.addStudent(req.body));
});

/*
  - UPDATE
      PUT /api/students/<id>
      {name?, location?}
  */
Router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, location } = req.body;

  if (!name && !location) {
    return res
      .status(400)
      .json({ error: "missing new name or location to update with" });
  }

  const student = rosterDB.findOneAndUpdate(id, req.body);

  if (!student) {
    return res.status(404).json({ error: `no student with id:${id}` });
  }

  return res.send(student);
});

/*
  - DELETE
      DELETE /api/students/<id>
  */
Router.delete("/:id", (req, res) => {
  const { id } = req.params;

  rosterDB.findOneAndDelete(id);

  return res.redirect(req.baseUrl);
});

module.exports = Router;
