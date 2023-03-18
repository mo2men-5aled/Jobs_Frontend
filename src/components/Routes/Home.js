import React, { useState } from "react";

import AddJob from "../AddJob";
import ListJob from "../ListJobs";
import LoginOrSignUp from "../Signup&Login";

const Home = () => {
  const token = localStorage.getItem("token");
  const [TriggerCreate, setTriggerCreate] = useState(false); // flag of shoing form
  if (token) {
    // var result = CheckUserID(userID).found;
    return (
      <React.Fragment>
        <AddJob setTriggerCreate={setTriggerCreate} />
        <ListJob
          TriggerCreate={TriggerCreate}
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
