import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
const Layout = () => {
  return (
    <div className="flex overflow-auto">
      <Sidebar />
      <div className="flex align-center justify-center flex-1 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
