import React, { useState } from "react";
import { useParams } from "react-router-dom";

import AddTask from "../AddTask";
import TaskUpdate from "../UpdateTask";
import ListTask from "../ListTask";

const UpdateRoute = (Task) => {
  const params = useParams();
  const parentID = Task.match.params.id;
  const [TriggerCreate, setTriggerCreate] = useState(false); // flag of shoing form

  const userID = params.userID;
  return (
    <React.Fragment>
      <AddTask
        parentID={parentID}
        userID={userID}
        setTriggerCreate={setTriggerCreate}
      />
      <TaskUpdate parentID={parentID} setTriggerCreate={setTriggerCreate} />
      <ListTask
        parentID={parentID}
        userID={userID}
        TriggerCreate={TriggerCreate}
        setTriggerCreate={setTriggerCreate}
      />
    </React.Fragment>
  );
};

export default UpdateRoute;
