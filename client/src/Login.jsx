import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./auth/authSlice";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    ready: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isLoggedIn, user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    dispatch(login(loginForm));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/admin/dashboard");
    }
  }, [isLoggedIn]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 mt-30 mx-auto border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Login</legend>

          <label className="label">Email</label>
          <input
            value={loginForm.email}
            onChange={(e) =>
              setLoginForm({
                ...loginForm,
                email: e.target.value,
                ready: loginForm.email.length >= 3 && e.target.value.length > 3,
              })
            }
            type="email"
            className="input"
            placeholder="Email"
          />

          <label className="label">Password</label>
          <input
            value={loginForm.password}
            onChange={(e) =>
              setLoginForm({
                ...loginForm,
                password: e.target.value,
                ready: loginForm.email.length >= 3 && e.target.value.length > 3,
              })
            }
            type="password"
            className="input"
            placeholder="Password"
          />

          <button
            type="submit"
            disabled={!loginForm.ready}
            className="btn btn-neutral mt-4"
          >
            Login
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
