import React from "react";
import { SiPlausibleanalytics } from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { BsChatDotsFill } from "react-icons/bs";
import { FaCamera } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          width: "10vw",
          maxWidth: "300px",
          backgroundColor: "black",
          paddingTop: "15px",
          position: "sticky",
        }}
      >
        <div
          className="main-icons"
          style={{
            cursor: "pointer",
            color: "white",
            display: "flex",
            flexDirection: "column",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          <Link to="/">
            {" "}
            <SiPlausibleanalytics size={"3rem"} />
          </Link>
          <Link to="/createMeeting">
            <FaCamera size={"1.6rem"} />
          </Link>
          <Link to="/chatapp">
            <BsChatDotsFill size={"1.6rem"} />
          </Link>
          <Link to="CreateAPI">
            <TbApi size={"1.8rem"} />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
