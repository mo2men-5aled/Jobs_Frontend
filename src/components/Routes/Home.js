import React, { useState } from "react";

import AddJob from "../AddJob";
import ListJob from "../ListJobs";

import { useParams } from "react-router-dom";
import CheckUserID from "../checkUserID";
import LoginOrSignUp from "../Signup&Login";

const Home = () => {
  const params = useParams();
  const userID = params.userID;
  const [TriggerCreate, setTriggerCreate] = useState(false); // flag of shoing form
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
};

export default Home;
