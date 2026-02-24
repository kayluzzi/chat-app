import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasksByUser } from "../tasks/taskSlice";

const ConvertingSpecialistDash = () => {
  const { user } = useSelector((state) => state.auth);
  const { loading, isLoggedIn, tasks } = useSelector((state) => state.tasks);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Dashboard useEffect");
    const getTasks = async () => {
      const token = localStorage.getItem("token");
      if (user.email) {
        dispatch(getTasksByUser({ email: user.email, token: token }));
      }
    };
    getTasks();
  }, [user]);

  return (
    <div>
      {loading && <div>Loading</div>}
      {tasks.length > 0 && !loading ? (
        <div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Priority</th>
                  <th>Task Name</th>
                  <th>Task Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                <tr>
                  <th>{task.priority}</th>
                  <td>{task.taskName}</td>
                  <td>{task.taskType}</td>
                  <td>{task.status}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          No tasks for {user.firstName} {user.lastName}
        </div>
      )}
    </div>
  );
};

export default ConvertingSpecialistDash;
