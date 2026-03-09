import { useEffect } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getAllChannels } from "./channels/channelSlice";

const Channels = () => {
  const dispatch = useDispatch();

  const { channels } = useSelector((state) => state.channels);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getAllChannels(token));
    }
  }, []);

  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
      <label
        htmlFor="left-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
        <ul className="menu w-full grow">
          <li>
            <button
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Homepage"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="oklch(0.41 0.112 45.904)"
              >
                <path d="M80-200v-80h400v80H80Zm0-200v-80h200v80H80Zm0-200v-80h200v80H80Zm744 400L670-354q-24 17-52.5 25.5T560-320q-83 0-141.5-58.5T360-520q0-83 58.5-141.5T560-720q83 0 141.5 58.5T760-520q0 29-8.5 57.5T726-410l154 154-56 56ZM560-400q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z" />
              </svg>
              <span className="is-drawer-close:hidden">Browse Channels</span>
            </button>
          </li>
          {channels.length > 0 && (
            <>
              {channels.map((channel) => (
                <>
                  {channel.icon.type === "google-icon-svg" && (
                    <Link to={`/admin/messages/{channel.name}`}>
                    <li>
                      <button
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Settings"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#e3e3e3"
                        >
                          <path d={channel.icon.svg} />
                        </svg>
                        <span className="is-drawer-close:hidden">
                          {channel.name}
                        </span>
                      </button>
                    </li>
                    </Link>
                  )}
                 
                
                </>
              ))}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Channels;
