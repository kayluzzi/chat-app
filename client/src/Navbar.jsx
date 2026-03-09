import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./auth/authSlice";

const Navbar = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    dispatch(logout(token));
  };

  return (
    <div>
      <nav className="navbar w-full bg-base-300">
        <label
          htmlFor="my-drawer-4"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost"
        >
          {/* Sidebar toggle icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
            className="my-1.5 inline-block size-4"
          >
            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
            <path d="M9 4v16"></path>
            <path d="M14 10l2 2l-2 2"></path>
          </svg>
        </label>
        
          <div className="navbar shadow-sm">
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
                      Login
                    </li>
                  </Link>
                </ul>
              )}
            </div>
          </div>
        
      </nav>
    </div>
  );
};

export default Navbar;
