const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA_FOOTBALL || "FantasyRookies",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM football_rookies";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const college = req.body.college;
  const position = req.body.position;
  const grade = req.body.grade;
  const notes = req.body.notes;

  const sqlInsert =
    "INSERT INTO football_rookies (playerName, playerAge, playerCollege, playerPosition, playerGrade, playerNotes) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sqlInsert,
    [name, age, college, position, grade, notes],
    (err, result) => {
      console.log(err);
      res.send("Player added successfully");
    }
  );
});

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM football_rookies WHERE id = ?";

  db.query(sqlDelete, id, (err, result) => {
    console.log(result);
    res.send("player successfully deleted");
  });
});

app.put("/api/update/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const age = req.body.age;
  const college = req.body.college;
  const position = req.body.position;
  const grade = req.body.grade;
  const notes = req.body.notes;
  const sqlUpdate =
    "UPDATE football_rookies SET playerName=?, playerAge=?, playerCollege=?, playerPosition=?, playerGrade=?, playerNotes=? WHERE id = ?";

  db.query(
    sqlUpdate,
    [name, age, college, position, grade, notes, id],
    (err, result) => {
      if (err) console.log(err);
      res.send("player successfully updated");
    }
  );
});

app.listen(3004, () => {
  console.log("running on port 3004");
});
