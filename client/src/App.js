import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [college, setCollege] = useState("");
  const [position, setPosition] = useState("");
  const [grade, setGrade] = useState("");
  const [notes, setNotes] = useState("");
  const [playerList, setPlayerList] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    Axios.get("http://localhost:3004/api/get").then((response) => {
      setPlayerList(response.data);
    });
  }, []);

  const submitPlayer = () => {
    Axios.post("http://localhost:3004/api/insert", {
      name: name,
      age: age,
      college: college,
      position: position,
      grade: grade,
      notes: notes,
    }).then(() => {
      setPlayerList([
        ...playerList,
        {
          playerName: name,
          playerAge: age,
          playerCollege: college,
          playerPosition: position,
          playerGrade: grade,
          playerNotes: notes,
        },
      ]);
      setName("");
      setAge("");
      setCollege("");
      setPosition("");
      setGrade("");
      setNotes("");
    });
  };

  const handleUpdate = (id) => {
    setEditing(true);
    setEditId(id);
    const playerToUpdate = playerList.find((val) => val.id === id);
    setName(playerToUpdate.playerName);
    setAge(playerToUpdate.playerAge);
    setCollege(playerToUpdate.playerCollege);
    setPosition(playerToUpdate.playerPosition);
    setGrade(playerToUpdate.playerGrade);
    setNotes(playerToUpdate.playerNotes);
  };

  const handleUpdateSubmit = () => {
    Axios.put(`http://localhost:3004/api/update/${editId}`, {
      name: name,
      age: age,
      college: college,
      position: position,
      grade: grade,
      notes: notes,
    }).then(() => {
      setName("");
      setAge("");
      setCollege("");
      setPosition("");
      setGrade("");
      setNotes("");
      setEditId(null);
      setEditing(false);
      Axios.get("http://localhost:3004/api/get").then((response) => {
        setPlayerList(response.data);
      });
    });
  };

  const handleDelete = (id) => {
    Axios.delete(`http://localhost:3004/api/delete/${id}`).then(() => {
      Axios.get("http://localhost:3004/api/get").then((response) => {
        setPlayerList(response.data);
      });
    });
  };

  const handleClick = (event) => {
    const id = event.target.id;
    if (id === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (id === "next" && currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    } else if (!isNaN(id)) {
      setCurrentPage(Number(id));
    }
  };

  const handleNext = () => {
    setCurrentPage((page) => page + 1);
  };

  const handlePrev = () => {
    setCurrentPage((page) => page - 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = playerList.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];

  for (
    let i = Math.max(1, currentPage - 2);
    i <= Math.min(currentPage + 2, Math.ceil(playerList.length / itemsPerPage));
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className="App">
      <h1>Dynasty Rookie Rankings</h1>
      <div className="form">
        <label>Name:</label>
        <input
          type="text"
          name="playerName"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label>Age:</label>
        <input
          type="text"
          name="playerAge"
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <label>College:</label>
        <input
          type="text"
          name="playerCollege"
          value={college}
          onChange={(e) => {
            setCollege(e.target.value);
          }}
        />
        <label>Position:</label>
        <input
          type="text"
          name="playerPosition"
          value={position}
          onChange={(e) => {
            setPosition(e.target.value);
          }}
        />
        <label>Grade:</label>
        <input
          type="text"
          name="playerGrade"
          value={grade}
          onChange={(e) => {
            setGrade(e.target.value);
          }}
        />
        <label>Notes:</label>
        <input
          type="text"
          name="playerNotes"
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
          }}
        />
        {editing ? (
          <button onClick={handleUpdateSubmit}>Update Player</button>
        ) : (
          <button onClick={submitPlayer}>Submit</button>
        )}
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
              <td>Update Player</td>
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
                    <button onClick={() => handleDelete(val.id)}>Delete</button>
                  </td>
                  <td>
                    <button onClick={() => handleUpdate(val.id)}>Edit</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <nav>
          <ul className="pagination">
            <li
              className={currentPage === 1 ? "page-item disabled" : "page-item"}
            >
              <button className="page-link" onClick={handlePrev}>
                Previous
              </button>
            </li>
            {pageNumbers.map((number) => {
              if (number < currentPage - 1 || number > currentPage + 1) {
                return null;
              }
              return (
                <li
                  key={number}
                  className={
                    currentPage === number ? "page-item active" : "page-item"
                  }
                >
                  <button
                    className="page-link"
                    id={number}
                    onClick={handleClick}
                  >
                    {number}
                  </button>
                </li>
              );
            })}
            <li
              className={
                currentPage === pageNumbers.length
                  ? "page-item disabled"
                  : "page-item"
              }
            >
              <button className="page-link" onClick={handleNext}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default App;
