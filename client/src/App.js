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
  const [playerList, setPlayerList] = useState([]);
  const [newGrade, setNewGrade] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3004/api/get").then((response) => {
      setPlayerList(response.data);
    });
  }, []);

  const submitPlayer = () => {
    Axios.post("http://localhost:3004/api/insert", {
      playerName: playerName,
      playerAge: playerAge,
      playerCollege: playerCollege,
      playerPosition: playerPosition,
      playerGrade: playerGrade,
      playerNotes: playerNotes,
    });

    setPlayerList([
      ...playerList,
      {
        playerName: playerName,
        playerAge: playerAge,
        playerCollege: playerCollege,
        playerPosition: playerPosition,
        playerGrade: playerGrade,
        playerNotes: playerNotes,
      },
    ]);
  };

  const deletePlayer = (name) => {
    Axios.delete(`http://localhost:3004/api/delete/${name}`).then(
      (response) => {
        setPlayerList(playerList.filter((val) => val.playerName !== name));
      }
    );
  };

  const updatePlayer = (player) => {
    Axios.put("http://localhost:3004/api/update", {
      playerName: player.playerName,
      playerGrade: newGrade,
    })
      .then((response) => {
        setPlayerList(
          playerList.map((val) => {
            return val.playerName === player.playerName
              ? {
                  id: val.id,
                  playerName: val.playerName,
                  playerAge: val.playerAge,
                  playerCollege: val.playerCollege,
                  playerPosition: val.playerPosition,
                  playerGrade: newGrade,
                  playerNotes: val.playerNotes,
                }
              : val;
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
    setNewGrade("");
  };

  /*  const updatePlayer = (player) => {
    Axios.put("http://localhost:3004/api/update", {
      playerName: player.playerName,
      playerGrade: newGrade,
    });

    setNewGrade("");
  };
*/
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

        <button onClick={submitPlayer}>Submit Player</button>
        <br />
        <table border="1">
          <thead>
            <tr>
              <td>Name</td>
              <td>Age</td>
              <td>College</td>
              <td>Position</td>
              <td>Grade</td>
              <td>Notes</td>
              <td>Delete Player</td>
              <td>Edit Grade</td>
            </tr>
          </thead>
          <tbody>
            {playerList.map((val) => {
              return (
                <tr key={val.id}>
                  <td>{val.playerName}</td>
                  <td>{val.playerAge}</td>
                  <td>{val.playerCollege}</td>
                  <td>{val.playerPosition}</td>
                  <td>{val.playerGrade}</td>
                  <td>{val.playerNotes}</td>
                  <td>
                    <button onClick={() => deletePlayer(val.playerName)}>
                      Delete
                    </button>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="updateInput"
                      onChange={(e) => {
                        setNewGrade(e.target.value);
                      }}
                    />
                    <button
                      onClick={() => {
                        updatePlayer(val.playerName);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
