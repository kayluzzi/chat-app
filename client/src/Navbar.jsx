import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./auth/authSlice"

const Navbar = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch()

  const handleLogout = async () => {
    const token = localStorage.getItem("token")
    dispatch(logout(token))
  }

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Link</a>
            </li>
          </ul>
          {isLoggedIn ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    {user.firstName}'s Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li onClick={handleLogout}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <ul className="menu menu-horizontal px-1">
              <Link to="/login">
              <li>
                <a>Login</a>
              </li>
              </Link>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
