//initialising
const express = require("express");

const app = express();
app.use(express.static("website"));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());
const { RSA_NO_PADDING } = require("constants");

// setup callback and server
const port = 8000;
const server = app.listen(port, listening);
//callback to make sure it works

function listening() {
  console.log(`Server is running on port ${port}`);
}

//stores data

const projectData = [];

// POST method route
app.post("/create", (req, res) => {
  projectData.push(req.body);
  console.log(projectData);
});

app.get("/all", (req, res) => {
  res.send(projectData);
});
