import axios from "axios";

const taskService = {
  getTasksByUser: async (email, token) => {
    console.log("taskService getTasksByUser", email, token);
    return await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/task/user/${email}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  },
  updateTask: async (taskId, task, token) => {
    console.log("taskService updateTask", taskId, task, token);
    return await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/task/${taskId}`,
      task,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  },
};

export default taskService;
