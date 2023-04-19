import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [playerName, setPlayerName] = useState("");
  const [playerAge, setPlayerAge] = useState("");
  const [playerCollege, setPlayerCollege] = useState("");
  const [playerPosition, setPlayerPosition] = useState("");
  const [playerGrade, setPlayerGrade] = useState("");
  const [playerNotes, setPlayerNotes] = useState("");

  const submitPlayer = () => {
    Axios.post("http://localhost:3004/api/insert", {
      playerName: playerName,
      playerAge: playerAge,
      playerCollege: playerCollege,
      playerPosition: playerPosition,
      playerGrade: playerGrade,
      playerNotes: playerNotes,
    }).then(() => {
      alert("succesfully inserted");
    });
  };

  return (
    <div className="App">
      <h1>Dynasty Rookie Rankings</h1>
      <div className="form">
        <label>Name:</label>
        <input
          type="text"
          name="playerName"
          onChange={(e) => {
            setPlayerName(e.target.value);
          }}
        />
        <label>Age:</label>
        <input
          type="text"
          name="playerAge"
          onChange={(e) => {
            setPlayerAge(e.target.value);
          }}
        />
        <label>College:</label>
        <input
          type="text"
          name="playerCollege"
          onChange={(e) => {
            setPlayerCollege(e.target.value);
          }}
        />
        <label>Position:</label>
        <input
          type="text"
          name="playerPosition"
          onChange={(e) => {
            setPlayerPosition(e.target.value);
          }}
        />
        <label>Grade:</label>
        <input
          type="text"
          name="playerGrade"
          onChange={(e) => {
            setPlayerGrade(e.target.value);
          }}
        />
        <label>Notes:</label>
        <input
          type="text"
          name="playerNotes"
          onChange={(e) => {
            setPlayerNotes(e.target.value);
          }}
        />

        <button onClick={submitPlayer}>Submit</button>
      </div>
    </div>
  );
}

export default App;
