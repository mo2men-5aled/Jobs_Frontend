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
  const [Company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("pending");

  const [showForm, setShowForm] = useState(false);
  const [showButton, setShowButton] = useState(true);

  //object sent to the database
  const fromValues = {
    company: Company,
    position: position,
    status: status,
  };

  //on form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    NewTask(fromValues, props);
    setCompany("");
    setPosition("");
  };

  const isValed = Company === "";
  const [touched, setTouched] = useState(false);

  console.log(status);
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
                  placeholder="Company Name"
                  id="name"
                  name="name"
                  type="text"
                  value={Company}
                  onChange={(event) => setCompany(event.target.value)}
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
                  placeholder="What was your position there ?"
                  id="name"
                  name="name"
                  type="text"
                  value={position}
                  onChange={(event) => setPosition(event.target.value)}
                />
              </div>
              <div className="field">
                <select
                  class="ui search dropdown"
                  onChange={(event) => {
                    setStatus(event.target.value);
                  }}
                >
                  <option value="pending">pending</option>
                  <option value="interview">interview</option>
                  <option value="declined">declined</option>
                </select>
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
