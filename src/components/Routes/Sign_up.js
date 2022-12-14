import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import LoggedIn from "../Logged";

import http from "../../api/connection";

const SignUp = () => {
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [PasswordConfirm, setPasswordConfirm] = useState("");

  const history = useHistory();

  //error state
  const [errors, setErrors] = useState([]);

  //show/hide password
  const [showPassword, setshowPassword] = useState(false);
  //confermatry password
  const [showConfPassword, setshowConfPassword] = useState(false);

  //object sent to the database
  const fromValues = {
    name: Name,
    email: email,
    password: password,
  };
  const token = localStorage.getItem("token");

  var CheckPasswordFields = password !== PasswordConfirm;

  if (token) {
    return <LoggedIn />;
  } else {
    const handleSubmit = async (event) => {
      event.preventDefault();
      const response = await http.post("/auth/register", fromValues); //send the data to the server

      if (response.data.user) {
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
            Sign up
          </h1>
          <form
            className="ui form"
            onSubmit={handleSubmit}
            style={{ padding: "0px 40px 20px 40px " }}
          >
            <div className="field">
              <label>Name</label>
              <div className="field">
                <input
                  type="text"
                  name="first-name"
                  placeholder="Name"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="field">
              <label>E-mail</label>
              <input
                type="email"
                name="email"
                placeholder="email"
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
            <div className="field">
              <label>Confirm password</label>
              <div className="ui right icon input">
                <input
                  type={showConfPassword ? "text" : "password"}
                  name="Password"
                  placeholder="Type your password again"
                  onChange={(event) => {
                    setPasswordConfirm(event.target.value);
                  }}
                />
                <i
                  className="eye icon"
                  onClick={() => setshowConfPassword(!showConfPassword)}
                  style={{ pointerEvents: "initial" }}
                ></i>
              </div>
              {CheckPasswordFields && (
                <div style={{ color: "red" }}>Password Not Match</div>
              )}
            </div>
            {errors.length > 0 && (
              <div className="ui red message">
                {errors.map((error) => {
                  return <div key={error}>{error}</div>;
                })}
              </div>
            )}
            <button
              className={`ui ${CheckPasswordFields ? "disabled" : ""} button`}
              type="submit"
              style={{ display: "block" }}
            >
              Sign up
            </button>
            <p style={{ display: "inline-block" }}>
              If you already have an account Click
            </p>
            <Link to="/login"> Log in</Link>
          </form>
        </div>
      </div>
    );
  }
};
export default SignUp;
