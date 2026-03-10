import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getChannelMessages } from "../messages/messageSlice";

const Messages = () => {
  const [ messageText, setMessageText ] = useState("")
  const params = useParams();
  const dispatch = useDispatch();
  console.log(params.channel);

  const { messages } = useSelector((state) => state.messages);

  useEffect(() => {
    const getMessages = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(getChannelMessages({ channelName: params.channel, token }));
      }
    };
    getMessages();
  }, []);
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm test-xl">
        {params.channel}
      </div>
      <ul className="list bg-base-100 rounded-box shadow-md">
        {messages.length > 0 ? (
          <>
            {messages.map((message) => (
              <li className="list-row">
                <div>
                  <img
                    className="size-10 rounded-box"
                    src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                  />
                </div>
                <div>
                  <div>{message.user.username} timestamp</div>
                </div>
                <p className="list-col-wrap text-xs">{message.message}</p>
                <button className="btn btn-square btn-ghost">
                  <svg
                    className="size-[1.2em]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M6 3L20 12 6 21 6 3z"></path>
                    </g>
                  </svg>
                </button>
                <button className="btn btn-square btn-ghost">
                  <svg
                    className="size-[1.2em]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </g>
                  </svg>
                </button>
              </li>
            ))}
          </>
        ) : (
          <div>There are no messages in this channel yet.</div>
        )}
      </ul>
      <div>
        <input
        value={messageText}
        onChange={(e) => handleMessage(e.target.value)}
          type="text"
          placeholder={`Message #${params.channel}`}
          className="input"
        />
      </div>
    </div>
  );
};

export default Messages;
