const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "AsDfGh12!",
  database: "FantasyRookies",
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
  const playerName = req.body.playerName;
  const playerAge = req.body.playerAge;
  const playerCollege = req.body.playerCollege;
  const playerPosition = req.body.playerPosition;
  const playerGrade = req.body.playerGrade;
  const playerNotes = req.body.playerNotes;

  const sqlInsert =
    "INSERT INTO football_rookies (playerName, playerAge, playerCollege, playerPosition, playerGrade, playerNotes) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sqlInsert,
    [
      playerName,
      playerAge,
      playerCollege,
      playerPosition,
      playerGrade,
      playerNotes,
    ],
    (err, result) => {
      console.log(err);
    }
  );
});

app.delete("/api/delete/:playerName", (req, res) => {
  const name = req.params.playerName;
  const sqlDelete = "DELETE FROM football_rookies WHERE playerName = ?";

  db.query(sqlDelete, name, (err, result) => {
    if (err) console.log(err);
    res.send("player successfully deleted");
  });
});

app.listen(3004, () => {
  console.log("running on port 3004");
});
