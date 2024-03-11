import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    fetchNotes();
  }, [userId]);

  const fetchNotes = () => {
    axios
      .get(`http://hyeumine.com/mynotes.php?id=${userId}`)
      .then((response) => {
        console.log(response.data.notes);
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
            id: 34716, 
            note: inputValue,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((response) => {
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

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
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
        setUserId(response.data.id);
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-warning">
        <div className="container">
          <a className="navbar-brand custom-navbar-brand" href="#">
            My Notes
          </a>
          <button
            type="button"
            className="btn btn-primary ms-auto"
            data-bs-toggle="modal"
            data-bs-target="#createUserModal"
          >
            Create New User
          </button>
        </div>
      </nav>

      <div
        className="modal fade"
        id="createUserModal"
        tabIndex="-1"
        aria-labelledby="createUserModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createUserModalLabel">
                Create New User
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={lastName}
                  onChange={handleLastNameChange}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddUser}
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="createNoteModal"
        tabIndex="-1"
        aria-labelledby="createNoteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createNoteModalLabel">
                Create New Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <textarea
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Add a note..."
                  className="form-control"
                  rows="15"
                  style={{ backgroundColor: "#FFF176" }}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddNote}
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div>
          <label htmlFor="userId" className="form-label mt-3">
            User ID:
          </label>
          <input
            type="text"
            id="userId"
            className="form-control mt-2 mb-3"
            placeholder="Enter User ID"
            value={userId}
            onChange={handleUserIdChange}
          />
        </div>
        {notes.length !== 0 && <h1>Hello, {userId}</h1>}
        <button
          type="button"
          className="btn btn-primary mt-3 mb-3"
          data-bs-toggle="modal"
          data-bs-target="#createNoteModal"
        >
          Create New Note
        </button>
        <div className="row">
          <div className="col">
            <div className="bulletin-board">
              {notes.length !== 0 ? (
                <div className="row row-cols-1 row-cols-md-3 g-4">
                  {notes
                    .slice()
                    .reverse()
                    .map((note, index) => (
                      <div className="col" key={index}>
                        <div
                          className="card"
                          style={{ backgroundColor: "#FFF176" }}
                        >
                          <div
                            className="card-body"
                            style={{
                              minHeight: "150px",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>
                              <h5 className="card-title">{note[0]}</h5>
                            </div>
                            <div className="text-end">
                              <p className="card-text">{note[1]}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <h1 style={{ color: "White" }}>No notes found.</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
