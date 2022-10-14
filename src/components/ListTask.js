import React, { useState, useEffect, useRef } from "react";
import http from "../api/connection";
import { Link } from "react-router-dom";
import { Popup } from "semantic-ui-react";
import DeleteTask from "./DeleteTask";

const mark = (task) => {
  if (task.completed) {
    return <i className="check icon" />;
  }
};
const ListTask = (props) => {
  const [tasks, setTasks] = useState([]);
  const taskNameRef = useRef();

  useEffect(() => {
    if (!props.TriggerCreate)
      http.get(`?userID=${props.userID}`).then((response) => {
        setTasks(response.data.tasks);
      });
    if (props.setTriggerCreate !== false) props.setTriggerCreate(false);
  }, [props.TriggerCreate]);

  return (
    <div style={{ marginTop: "20px" }}>
      {tasks
        .filter((task) => task.parentID === props.parentID)
        .map((filterdTask) => {
          let popupname = <span>{filterdTask.name}</span>;
          taskNameRef.current = filterdTask.description ? (
            <Popup
              position="right center"
              content={`${filterdTask.description}`}
              trigger={popupname}
            />
          ) : (
            popupname
          );
          return (
            <div className="ui segment" key={filterdTask._id}>
              <Link
                to={`/${props.userID}/${filterdTask._id}`}
                className="content"
              >
                <div className="header">
                  <span>{mark(filterdTask)}</span>
                  {taskNameRef.current}
                </div>
              </Link>
              <DeleteTask TaskId={filterdTask._id} {...props} />
            </div>
          );
        })}
    </div>
  );
};

export default ListTask;
