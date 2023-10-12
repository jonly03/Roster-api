// load up the env file
// process the contents of the file
// KEY=VALUE
// split each line's string
// add the KEY to process.env => process.env.KEY = VALUE
require("dotenv").config();
const express = require("express");
const studentsRouter = require("./routes/students");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/students", studentsRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("server listening");
});

console.log(process);
