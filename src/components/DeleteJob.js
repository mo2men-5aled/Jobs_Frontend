import http from "../api/connection";
const DeleteJob = (props) => {
  const token = localStorage.getItem("token");
  return (
    <div style={{ textAlign: "end" }}>
      <button
        className="ui basic blue button"
        onClick={() => {
          http
            .delete("/jobs/" + props.JobId, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
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

export default DeleteJob;
