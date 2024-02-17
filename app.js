var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.json());

let data = [];

app.get("/", function (req, res) {
  res.render("index");
});

app.post("/data", function (req, res) {
  var newData = req.body;
  data.push(newData);
  res.send({ success: true });
});

app.get("/data", function (req, res) {
  res.json(data);
});

app.listen(8000);
console.log("Server is listening on port 8000");
