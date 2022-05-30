import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Detail from "../screen/home/detail";
import Home from "../screen/home/home";
import LoginScreen from "../screen/login/login";

export default function Navigation() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/home-screen/:id" element={<Home />} />
      <Route path="/detail/:id" element={<Detail />} />
    </Routes>
  );
}
