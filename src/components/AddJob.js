import React, { useState } from "react";
import http from "../api/connection";

const NewTask = (data, props) => {
  http.post("/jobs", data).then((res) => {
    if (res.status === 201) {
      props.setTriggerCreate(true);
    }
  });
};

const AddJob = (props) => {
  const [Name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [status, setStatus] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [showButton, setShowButton] = useState(true);

  //object sent to the database
  const fromValues = {
    name: Name,
    completed: status,
    description: description,
    createdBy: props.userID,
  };

  //on form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    NewTask(fromValues, props);
    setName("");
    setStatus(false);
    setDesc("");
  };

  const isValed = Name === "";
  const [touched, setTouched] = useState(false);

  return (
    <div>
      {showButton && (
        <button
          style={{ marginTop: "20px" }}
          className="fluid ui primary button"
          onClick={() => {
            setShowForm(!showForm); //false - true
            setShowButton(!showButton); //true - false
          }}
        >
          Create Task
        </button>
      )}
      {showForm && (
        <div className="ui segment" style={{ marginTop: "20px" }}>
          <div>
            <div
              className="ui top attached label"
              onClick={() => {
                setShowForm(!showForm); //false - true
                setShowButton(!showButton); //true - false
              }}
            >
              Create New Task
            </div>
            <form className="ui form" onSubmit={handleSubmit}>
              <div className="field">
                <input
                  placeholder="Type Task Name"
                  id="name"
                  name="name"
                  type="text"
                  value={Name}
                  onChange={(event) => setName(event.target.value)}
                  onBlur={() => {
                    if (isValed) {
                    } else {
                      setTouched(true);
                    }
                  }}
                />
              </div>
              <div className="field">
                <input
                  placeholder="Type Task description"
                  id="name"
                  name="name"
                  type="text"
                  value={description}
                  onChange={(event) => setDesc(event.target.value)}
                />
              </div>
              <div className="inline field">
                <input
                  className="ui checked checkbox"
                  id="status"
                  name="status"
                  type="checkbox"
                  checked={status ? "checked" : ""}
                  value={status}
                  onChange={(event) => {
                    setStatus(event.target.checked);
                  }}
                />
                <label>Completed</label>
              </div>

              <button
                className={`ui basic red ${touched ? "" : "disabled"} button`}
                type="submit"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddJob;
