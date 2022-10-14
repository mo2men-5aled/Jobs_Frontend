import React, { useState } from "react";

import AddTask from "../AddTask";
import ListTask from "../ListTask";

import { useParams } from "react-router-dom";
import CheckUserID from "../checkUserID";
import LoginOrSignUp from "../Signup&Login";

const Home = () => {
  const params = useParams();
  const userID = params.userID;
  const [TriggerCreate, setTriggerCreate] = useState(false); // flag of shoing form
  var result = CheckUserID(userID).found;
  if (result) {
    return (
      <React.Fragment>
        <AddTask
          parentID={undefined}
          userID={userID}
          setTriggerCreate={setTriggerCreate}
        />
        <ListTask
          parentID={undefined}
          TriggerCreate={TriggerCreate}
          userID={userID}
          setTriggerCreate={setTriggerCreate}
        />
      </React.Fragment>
    );
  } else {
    return <LoginOrSignUp />;
  }
};

export default Home;
