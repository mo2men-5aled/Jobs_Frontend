import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import http from "../api/connection";
import LoginOrSignUp from "./Signup&Login";

const JobUpdate = () => {
  const params = useParams();

  const [job, setJob] = useState([]);
  const [company, setCompany] = useState("");
  const [status, setstatus] = useState("");
  const [position, setPosition] = useState("");
  const history = useHistory();

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    //on page load
    http
      .get(`/jobs/${params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data.job) {
          setJob(response.data.job);
          setCompany(response.data.job.company);
          setPosition(response.data.job.position);
          setstatus(response.data.job.status);
        } else {
          setErrors(response.data.msg);
        }
      });
  }, [params]);

  const token = localStorage.getItem("token");
  if (token) {
    const handleSubmit = (event) => {
      event.preventDefault();
      http
        .patch(
          `/jobs/${params.id}`,
          { ...job, company: company, position: position, status: status },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          if (!res.data.msg) {
            history.push("/");
          } else {
            setErrors(res.data.msg);
          }
        });
    };

    return (
      <React.Fragment>
        <div className="ui segment" style={{ marginTop: "20px" }}>
          <div className="ui top attached label">Update task</div>
          <form onSubmit={handleSubmit} className="ui form">
            <span className="ui transparent fluid input">
              <label className="ui horizontal label">Company</label>
              <input
                onChange={(e) => {
                  setCompany(e.target.value);
                }}
                id="name"
                name="name"
                type="text"
                value={company}
              />
            </span>
            <div
              className="ui transparent fluid input"
              style={{ margin: "5px 0px 5px " }}
            >
              <label className="ui horizontal label">Position</label>

              <input
                onChange={(e) => {
                  setPosition(e.target.value);
                }}
                id="name"
                name="name"
                type="text"
                value={position}
              />
            </div>
            <div className="field">
              <select
                className="ui search dropdown"
                onChange={(event) => {
                  setstatus(event.target.value);
                }}
              >
                <option value="pending">pending</option>
                <option value="interview">interview</option>
                <option value="declined">declined</option>
              </select>
            </div>
            {errors.length > 0 && (
              <div className="ui red message">
                {errors.map((error) => {
                  return <div key={error}>{error}</div>;
                })}
              </div>
            )}

            <button className={`ui red button`} type="submit">
              Edit
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  } else {
    <LoginOrSignUp />;
  }
};

export default JobUpdate;
