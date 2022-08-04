const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const qs = require("qs");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.set("query parser", function (str) {
  return qs.parse(str, {});
});

const myCounter = { counter: 0 };

app.get("/", (req, res) => {
  res.json({ msg: "hello" });
});

app.get("/counter", (req, res) => {
  res.status(200).json(myCounter);
});

app.delete("/counter", (req, res) => {
  res.status(200).json({ counter: 0 });
});

app.post("/counter/increment", (req, res) => {
  myCounter.counter += 1;
  res.status(201).json(myCounter);
});

app.post("/counter/decrement", (req, res) => {
  myCounter.counter -= 1;
  res.status(201).json(myCounter);
});

app.post("/counter/double", (req, res) => {
  myCounter.counter *= 2;
  res.status(201).json(myCounter);
});

app.put("/counter", (req, res) => {
  if (req.query.value) {
    myCounter.counter = req.query.value;
  }
  console.log(myCounter.counter);
  res.status(201).json(myCounter);
});

const port = 3040;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
