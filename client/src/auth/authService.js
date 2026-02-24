import axios from "axios";

const authService = {
  login: async (loginForm) => {
    return await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/auth/login`,
      loginForm
    );
  },
  me: async (token) => {
    return await axios.get(`${import.meta.env.VITE_SERVER_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
    logout: async (token) => {
    return await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/logout`,
      {}, 
     { headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default authService;
