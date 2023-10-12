const { uid } = require("uid");

class Roster {
  constructor() {}

  addStudent({ name, location }) {
    // unique identifier
    const id = uid();
    this[id] = {
      id,
      name,
      location,
    };

    return this[id];
  }

  getOneStudent(id) {
    return this[id];
  }

  getManyStudents({ name, location }) {
    let results = Object.values(this);

    if (name) {
      results = results.filter((stu) => stu.name === name);
    }

    if (location) {
      results = results.filter((stu) => stu.location === location);
    }

    return results;
  }

  findOneAndUpdate(id, { name, location }) {
    const student = this.getOneStudent(id);

    if (student) {
      if (name) {
        student.name = name;
      }

      if (location) {
        student.location = location;
      }
    }

    return student;
  }

  findOneAndDelete(id) {
    delete this[id];
  }
}

module.exports = {
  rosterDB: new Roster(),
};
