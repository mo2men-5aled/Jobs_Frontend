import React, { useState, useEffect, useRef } from "react";
import http from "../api/connection";
import { Link } from "react-router-dom";
import { Popup } from "semantic-ui-react";
import DeleteTask from "./DeleteTask";

const mark = (job) => {
  if (job.completed) {
    return <i className="check icon" />;
  }
};
const token = localStorage.getItem("token");

const ListJob = (props) => {
  const [jobs, setJobs] = useState([]);
  const taskNameRef = useRef();

  useEffect(() => {
    if (!props.TriggerCreate)
      http
        .get("/jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setJobs(response.data.jobs);
        });
    if (props.setTriggerCreate !== false) props.setTriggerCreate(false);
  }, [props.TriggerCreate]);

  console.log(jobs);
  return (
    <div style={{ marginTop: "20px" }}>
      {jobs.map((job) => {
        let popupname = <span>{job.name}</span>;
        taskNameRef.current = job.description ? (
          <Popup
            position="right center"
            content={`${job.description}`}
            trigger={popupname}
          />
        ) : (
          popupname
        );
        return (
          <div className="ui segment" key={job._id}>
            <Link to={`/${job._id}`} className="content">
              <div className="header">
                <span>{mark(job)}</span>
                {taskNameRef.current}
              </div>
            </Link>
            <DeleteTask JobId={job._id} {...props} />
          </div>
        );
      })}
    </div>
  );
};

export default ListJob;
