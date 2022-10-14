import React, { useEffect, useState } from "react";
var auth;
const GoogleAuth = () => {
  const [isSignedIn, setIsSignedIn] = useState(null);
  useEffect(() => {
    window.gapi.load("auth2", () => {
      window.gapi.auth2
        .init({
          clientId:
            "590322393008-msj0d9h9f0bn264k59nbeqtlssv9v6iv.apps.googleusercontent.com",
          scope: "email",
          plugin_name: "Task Manager",
        })
        .then(() => {
          auth = window.gapi.auth2.getAuthInstance();
          setIsSignedIn(auth.isSignedIn.get());
          auth.isSignedIn.listen(onAuthChange);
        });
    });

    const onAuthChange = () => {
      setIsSignedIn(auth.isSignedIn.get());
    };
  }, [isSignedIn]);
  if (isSignedIn === null) {
    return null;
  } else if (isSignedIn) {
    return (
      <button
        className="ui google red button"
        onClick={() => {
          auth.signOut();
        }}
      >
        <i className="google icon"></i>
        Sign out
      </button>
    );
  } else {
    return (
      <button
        className="ui google blue button"
        onClick={() => {
          auth.signIn();
        }}
      >
        <i className="google icon"></i>
        Sign in
      </button>
    );
  }
};

export default GoogleAuth;
