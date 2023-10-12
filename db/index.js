const { uid } = require("uid");
const axios = require("axios");
class Roster {
  constructor() {}

  async addStudent({ name, location }) {
    // unique identifier
    const id = uid();
    this[id] = {
      id,
      name,
      location,
      profilePic: await this.#getPhoto(location),
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

  async findOneAndUpdate(id, { name, location }) {
    const student = this.getOneStudent(id);

    if (student) {
      if (name) {
        student.name = name;
      }

      if (location) {
        student.location = location;
        student.profilePic = await this.#getPhoto(location);
      }
    }

    return student;
  }

  findOneAndDelete(id) {
    delete this[id];
  }

  async #getPhoto(location) {
    const unsplashURL = `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_API_KEY}&query=${location}`;

    try {
      const { data } = await axios.get(unsplashURL);

      if (data && data.urls.small) {
        return data.urls.small;
      } else {
        return "https://placehold.jp/50x50.png";
      }
    } catch (error) {
      return "https://placehold.jp/50x50.png";
    }
  }
}

module.exports = {
  rosterDB: new Roster(),
};
