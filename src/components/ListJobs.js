import React, { useState, useEffect } from "react";
import http from "../api/connection";
import { Link } from "react-router-dom";
import DeleteJob from "./DeleteJob";
import Spinner from "./Loader";

const ListJob = (props) => {
  const [jobs, setJobs] = useState();
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
          if (response.data.jobs) {
            setJobs(response.data.jobs);
          } else if (response.data.msg == "no jobs found") {
            console.log(response.data.msg);
            setJobs([]);
          }
          console.log(response);
        });
    }
    setToken(localStorage.getItem("token"));
    if (props.setTriggerCreate !== false) props.setTriggerCreate(false);
  }, [props, token]);

  if (jobs) {
    if (jobs.length > 0) {
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
    }
    if (jobs.length === 0) {
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
  } else {
    return <Spinner />;
  }
};

export default ListJob;
