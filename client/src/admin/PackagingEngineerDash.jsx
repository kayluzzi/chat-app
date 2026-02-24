import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasksByUser } from "../tasks/taskSlice";

const PackagingEngineerDash = () => {
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
        <div>{tasks[0].task_id}</div>
      ) : (
        <div>
          No tasks for {user.firstName} {user.lastName}
        </div>
      )}
    </div>
  );
};

export default PackagingEngineerDash;