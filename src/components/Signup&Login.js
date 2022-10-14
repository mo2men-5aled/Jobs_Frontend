import React from "react";
import { Link } from "react-router-dom";
const LoginOrSignUp = () => {
  return (
    <div style={{ marginTop: "20px" }}>
      <h2 className="ui center aligned icon header">
        <i className="blind icon" />
        <div className="header">
          Please Log in first or if you don't have an account click on sign up
        </div>
        <Link to={"/signup"} className="ui primary button">
          Sign up
        </Link>
        <Link to={"/login"} className="ui primary button">
          Log in
        </Link>
      </h2>
    </div>
  );
};

export default LoginOrSignUp;
