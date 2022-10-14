import { set } from "lodash";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import http from "../api/connection";

const JobUpdate = () => {
  const params = useParams();

  const [job, setJob] = useState([]);
  const [company, setCompany] = useState("");
  const [status, setstatus] = useState("");
  const [position, setPosition] = useState("");
  const history = useHistory();

  const [showForm, setShowForm] = useState(false);

  const [errors, setErrors] = useState("");

  useEffect(() => {
    //on page load
    http
      .get(`/jobs/${params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data.msg) {
          setErrors(response.data.msg);
        } else {
          setJob(response.data.job);
          setCompany(response.data.job.company);
          setPosition(response.data.job.position);
          setstatus(response.data.job.status);
        }
      });
  }, []);

  console.log(errors);
  const handleSubmit = (event) => {
    event.preventDefault();
    http
      .patch(
        `/jobs/${params.id}`,
        { ...job, company: company, position: position, status: status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          history.push("/");
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
          <span>Update Job</span>
        </div>

        {showForm && (
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

            <button className={`ui red button`} type="submit">
              Edit
            </button>
          </form>
        )}
      </div>
    </React.Fragment>
  );
};

export default JobUpdate;
