import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasksByUser, updateTask } from "../tasks/taskSlice";

const ChemistDash = () => {
  const [taskForm, setTaskForm] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const { loading, isLoggedIn, tasks } = useSelector((state) => state.tasks);

  const dispatch = useDispatch();
  console.log("chemist dash");

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

  useEffect(() => {
    setTaskForm(tasks);

  }, [tasks]);

  const calculateComplete = () => {
    const tasksComplete = taskForm.reduce((accumulator, task) => {
      if (task.status === "completed") {
        return accumulator + 1;
      } else {
        return accumulator;
      }
    }, 0);
    console.log("tasksComplete", tasksComplete)
    return (tasksComplete / taskForm.length) * 100
  };

  const handleStatusUpdate = async (taskId, task, e) => {
    const token = localStorage.getItem("token");
    setTaskForm(
      taskForm.map((t) =>
        t.taskId === taskId ? { ...t, status: e.target.value } : t
      )
    );
    dispatch(
      updateTask({ taskId, task: { ...task, status: e.target.value }, token })
    );
  };

  const handlePriorityUpdate = async (taskId, task, e) => {
    const token = localStorage.getItem("token");
    setTaskForm(
      taskForm.map((t) =>
        t.taskId === taskId ? { ...t, priority: e.target.value } : t
      )
    );
    dispatch(
      updateTask({ taskId, task: { ...task, priority: e.target.value }, token })
    );
  };

  return (
    <div>
      {loading && <div>Loading</div>}
      {taskForm.length > 0 && !loading ? (
        <div>
          <h1 className="text-5xl info">Tasks</h1>
          <div className="overflow-x-auto">
            <progress
              className="progress w-56"
              value={calculateComplete()}
              max="100"
            ></progress>
          </div>
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
              <tbody className="info">
                {taskForm.map((task) => (
                  <tr>
                    <th>
                      <select
                        value={task.priority}
                        onChange={(e) =>
                          handlePriorityUpdate(task.taskId, task, e)
                        }
                      >
                        {Array.from(
                          { length: taskForm.length },
                          (_, idx) => ++idx
                        ).map((priority) => (
                          <option key={priority} value={priority}>
                            {priority}
                          </option>
                        ))}
                      </select>
                    </th>
                    <td>{task.taskName}</td>
                    <td>{task.taskType}</td>
                    <td>
                      <select
                        value={task.status}
                        onChange={(e) =>
                          handleStatusUpdate(task.taskId, task, e)
                        }
                      >
                        <option value="not started">Not Started</option>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="delayed">Delayed</option>
                      </select>
                    </td>
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

export default ChemistDash;
