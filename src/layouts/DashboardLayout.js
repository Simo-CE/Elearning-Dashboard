import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./dashboard.css";
import Navbar from "../components/navbar/Navbar";
import { sideBarStatus } from "./../redux/uiSlice";
import Sidebar from "../components/sidebar/Sidebar.js";

function DashbaordLayout() {
  const sideBarOpenStatus = useSelector((state) => state.ui.sideBarIsOpen);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);

  const handleSideBar = () => {
    dispatch(sideBarStatus(!sideBarOpenStatus));
  };

  return (
    <>
      <Sidebar
        sideBarIsOpen={sideBarOpenStatus}
        handleSideBar={handleSideBar}
      />
      <div className={`p-0 ${theme} ${sideBarOpenStatus}MainVariates`}>
        <Navbar
          sideBarIsOpen={sideBarOpenStatus}
          handleSideBar={handleSideBar}
        />
        <Outlet />
      </div>
    </>
  );
}

export default DashbaordLayout;