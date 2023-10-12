const express = require("express");
const studentsRouter = require("./routes/students");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/students", studentsRouter);

app.listen(3000, () => {
  console.log("server listening");
});
