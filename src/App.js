import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    // Fetch existing notes when the component mounts
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    axios
      .get("http://hyeumine.com/mynotes.php?id=34716")
      .then((response) => {
        setNotes(response.data.notes);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddNote = () => {
    if (inputValue.trim() !== "") {
      axios
        .post(
          "http://hyeumine.com/newnote.php",
          {
            id: 34716, // Replace with the actual user ID
            note: inputValue,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((response) => {
          // Update notes state with the newly added note
          setNotes([...notes, [inputValue, new Date().toLocaleString()]]);
          setInputValue("");
        })
        .catch((error) => {
          console.error("Error adding note:", error);
        });
    }
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleAddUser = () => {
    axios
      .post(
        "http://hyeumine.com/newuser.php",
        {
          firstname: firstName,
          lastname: lastName,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        console.log("User created:", response.data);
        // Optionally, you can update the UI or perform other actions upon successful user creation
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  return (
    <div className="container">
      <h1 className="title">Add User</h1>
      <div className="input-container">
        <input
          type="text"
          value={firstName}
          onChange={handleFirstNameChange}
          placeholder="First Name"
          className="input-field"
        />
        <input
          type="text"
          value={lastName}
          onChange={handleLastNameChange}
          placeholder="Last Name"
          className="input-field"
        />
        <button onClick={handleAddUser} className="add-button">
          Add User
        </button>
      </div>

      <h1 className="title">My Notes</h1>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add a note..."
          className="input-field"
        />
        <button onClick={handleAddNote} className="add-button">
          +
        </button>
      </div>
      <ul className="notes-list">
        {notes.map((note, index) => (
          <li key={index} className="note">
            {note[0]} - {note[1]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
