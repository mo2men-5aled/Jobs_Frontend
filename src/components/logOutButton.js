const LogOut = () => {
  return (
    <button
      className="ui primary button"
      onClick={() => {
        localStorage.removeItem("token");
        window.location.reload();
      }}
    >
      Log Out
    </button>
  );
};

export default LogOut;
