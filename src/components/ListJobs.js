import React, { useState, useEffect, useRef } from "react";
import http from "../api/connection";
import { Link } from "react-router-dom";
import DeleteTask from "./DeleteTask";

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

  return (
    <div style={{ marginTop: "20px" }}>
      {jobs.map((job) => {
        return (
          <div className="ui segment" key={job._id}>
            <Link to={`/${job._id}`} className="content">
              <span>{job.company}</span>
              <div className="header">
                <span>{job.position}</span>
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
