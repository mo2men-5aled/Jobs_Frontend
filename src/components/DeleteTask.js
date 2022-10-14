import http from "../api/connection";
const DeleteTask = (props) => {
  return (
    <div style={{ textAlign: "end", zIndex: "2" }}>
      <button
        className="ui basic blue button"
        onClick={() => {
          http.delete("/" + props.TaskId).then((res) => {
            if (res.status === 200) {
              props.setTriggerCreate(true);
            }
          });
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteTask;
