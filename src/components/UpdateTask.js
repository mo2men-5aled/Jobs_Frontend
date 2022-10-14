import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import http from "../api/connection";
// import _ from "lodash";

const TaskUpdate = (props) => {
  const [task, setTask] = useState({});
  const [name, setName] = useState("");
  const [status, setstatus] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    //on page load
    http.get(`/${props.parentID}`).then((response) => {
      setTask(response.data.task);
      setName(response.data.task.name);
      setDescription(response.data.task.description);
      setstatus(response.data.task.completed);
    });
  }, [props.parentID]);

  const handleSubmit = (event) => {
    event.preventDefault();
    http
      .patch(`/${props.parentID}`, {
        ...task,
        name: name,
        description: description,
        completed: status,
      })
      .then((res) => {
        if (res.status === 200) {
          history.goBack();
          props.setTriggerCreate(true);
        }
      });
  };

  return (
    <React.Fragment>
      <div className="ui segment" style={{ marginTop: "20px" }}>
        <div
          className="ui top attached label"
          onClick={() => {
            setShowForm(!showForm); //false - true
          }}
        >
          {showForm ? (
            <i className="caret down icon"></i>
          ) : (
            <i className="caret right icon"></i>
          )}
          <span>Update Task</span>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="ui form">
            <span className="ui transparent fluid input">
              <label className="ui horizontal label">Name</label>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                id="name"
                name="name"
                type="text"
                value={name}
              />
            </span>
            <div
              className="ui transparent fluid input"
              style={{ margin: "5px 0px 5px " }}
            >
              <label className="ui horizontal label">Descriptions</label>

              <input
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                id="name"
                name="name"
                type="text"
                value={description}
              />
            </div>
            <div className="inline field">
              <div className="ui checked checkbox">
                <input
                  onChange={(e) => {
                    setstatus(e.target.checked);
                  }}
                  id="status"
                  name="status"
                  type="checkbox"
                  checked={`${status ? "checked" : ""}`}
                ></input>
                <label>Completed</label>
              </div>
            </div>

            <button className={`ui red button`} type="submit">
              Edit
            </button>
          </form>
        )}
      </div>
    </React.Fragment>
  );
};

export default TaskUpdate;
