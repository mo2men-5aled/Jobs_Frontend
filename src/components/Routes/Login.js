import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import http from "../../api/connection";
import LoggedIn from "../Logged";
const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  //show/hide password
  const [showPassword, setshowPassword] = useState(false);

  //errors state
  const [errors, setErrors] = useState([]);

  //form Data
  const formValues = {
    email: email,
    password: password,
  };

  const token = localStorage.getItem("token");
  if (token) {
    return <LoggedIn />;
  } else {
    //On Submit the form
    const handleSubmit = async (event) => {
      event.preventDefault();
      const response = await http.post("/auth/login", formValues);

      if (response.data.user) {
        localStorage.removeItem("token");
        localStorage.setItem("token", response.data.token);
        history.push("/");
      } else {
        setErrors(response.data.msg);
      }
    };

    return (
      <div>
        <div className="ui segment" style={{ marginTop: "20px" }}>
          <h1
            className="ui center aligned header"
            style={{ marginTop: "20px" }}
          >
            Log in
          </h1>
          <form
            className="ui form"
            onSubmit={handleSubmit}
            style={{ padding: "0px 40px 20px 40px " }}
          >
            <div className="field">
              <label>Email</label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
            <div className="field">
              <label>Password</label>
              <div className="ui right icon input">
                <input
                  type={showPassword ? "text" : "password"}
                  name="Password"
                  placeholder="Password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
                <i
                  className="eye icon"
                  onClick={() => setshowPassword(!showPassword)}
                  style={{ pointerEvents: "initial" }}
                ></i>
              </div>
            </div>
            {errors.length > 0 && (
              <div className="ui red message">
                {errors.map((error) => {
                  return <div key={error}>{error}</div>;
                })}
              </div>
            )}
            <button
              className={`ui button`}
              type="submit"
              style={{ display: "block" }}
            >
              Log in
            </button>
            <p style={{ display: "inline-block" }}>
              If it is your first time Click
            </p>
            <Link to="/signup"> Sign Up</Link>
          </form>
        </div>
      </div>
    );
  }
};

export default LogIn;
