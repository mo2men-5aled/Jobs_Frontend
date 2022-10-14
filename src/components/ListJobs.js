import React, { useState, useEffect } from "react";
import http from "../api/connection";
import { Link } from "react-router-dom";
import DeleteJob from "./DeleteJob";

const ListJob = (props) => {
  const [jobs, setJobs] = useState([]);

  const [token, setToken] = useState(
    localStorage.getItem(localStorage.getItem("token"))
  );
  useEffect(() => {
    if (!props.TriggerCreate) {
      http
        .get("/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setJobs(response.data.jobs);
        });
    }
    setToken(localStorage.getItem("token"));
    if (props.setTriggerCreate !== false) props.setTriggerCreate(false);
  }, [props, token]);

  if (jobs) {
    return (
      <div style={{ marginTop: "20px" }}>
        {jobs.map((job) => {
          return (
            <div className="ui segment" key={job._id}>
              <Link to={`/${job._id}`} className="content">
                <h3>{job.company}</h3>
              </Link>
              <div className="header">
                <h4>{job.position}</h4>
              </div>
              <div className="description">{job.status}</div>
              <DeleteJob JobId={job._id} {...props} />
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div style={{ marginTop: "20px" }}>
        <div className="ui segment">
          <div className="header">
            <span>No Jobs Found</span>
          </div>
        </div>
      </div>
    );
  }
};

export default ListJob;
