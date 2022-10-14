import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./components/Routes/Home";
import JobUpdate from "./components/UpdateJob";
import SignUp from "./components/Routes/Sign_up";
import LogIn from "./components/Routes/Login";
import LoginOrSignUp from "./components/Signup&Login";
function App() {
  return (
    <div className="ui container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/" component={Home} />
          <Route exact path="/jobs/:id" component={JobUpdate} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
