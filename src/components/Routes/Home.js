import React, { useState } from "react";

import AddJob from "../AddJob";
import ListJob from "../ListJobs";

import { useParams } from "react-router-dom";
import LoginOrSignUp from "../Signup&Login";

const Home = () => {
  const token = localStorage.getItem("token");
  const params = useParams();
  const userID = params.userID;
  const [TriggerCreate, setTriggerCreate] = useState(false); // flag of shoing form
  if (token) {
    //var result = CheckUserID(userID).found;
    return (
      <React.Fragment>
        <AddJob userID={userID} setTriggerCreate={setTriggerCreate} />
        <ListJob
          TriggerCreate={TriggerCreate}
          userID={userID}
          setTriggerCreate={setTriggerCreate}
        />
      </React.Fragment>
    );
  } else {
    return (
      <div>
        <LoginOrSignUp />
      </div>
    );
  }
};

export default Home;
