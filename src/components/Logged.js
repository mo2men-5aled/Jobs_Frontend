import { useHistory } from "react-router-dom";
const LoggedIn = () => {
  const history = useHistory();
  return (
    <div>
      <h1 className="ui center aligned header">You are already logged in</h1>
      <div className="ui center aligned header">
        <button
          className="ui primary button"
          onClick={() => {
            history.push("/");
          }}
        >
          {" "}
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default LoggedIn;
