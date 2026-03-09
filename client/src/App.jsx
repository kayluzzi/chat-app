import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { me } from "./auth/authSlice";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./Navbar";
import Channels from "./Channels";
import RightNav from "./RightNav";
import Home from "./Home";
import Login from "./Login";
import Dashboard from "./admin/Dashboard";
import Messages from "./admin/Messages";
import NoMatch from "./NoMatch";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  // if (
  //   location.pathname !== "/admin/dashboard" &&
  //   location.pathname !== "/login"
  // ) {
  //   localStorage.setItem("location", location.pathname);
  // }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const checkToken = async () => {
        dispatch(me(token));
      };
      checkToken();
    }
  }, []);

  return (
     <div>
      <div className="drawer xl:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Navbar />
          <div className="flex p-4">
            <div className="w-7/8 flex-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route element={<PrivateRoute />}>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/messages/:channel" element={<Messages />} />
              </Route>
              <Route path="*" element={<NoMatch />} />
            </Routes>
            </div>
            <div className="w-1/8 flex-none">
              <RightNav />
            </div>
          </div>
        </div>
        <Channels />
      </div>
    </div>
  );
}

export default App;
