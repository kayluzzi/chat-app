import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import { useDispatch } from "react-redux";
import { me } from "./auth/authSlice";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Dashboard from "./admin/Dashboard";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("app token", token);
    if (token) {
      const checkToken = async () => {
        dispatch(me(token));
      };
      checkToken();
    }
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
