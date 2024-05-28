import React from "react";
import { SiPlausibleanalytics } from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { BsChatDotsFill } from "react-icons/bs";
import { FaCamera } from "react-icons/fa";
import { Outlet, Link } from 'react-router-dom';


function MainSidebar() {

  return (
    <>
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          width: "15vw",
          borderTopLeftRadius: "20px",
          backgroundColor: "black",
          paddingTop: "15px",
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
          <SiPlausibleanalytics size={"3rem"} />
          <Link to="/createMeeting"><FaCamera size={"1.6rem"}/></Link>
          <Link to="/createChat"><BsChatDotsFill size={"1.6rem"}/></Link>
          <Link to="CreateAPI"><TbApi size={"1.8rem"}/></Link>
        </div>
      </div>
      <Outlet />

    </>
  );
}

export default MainSidebar;
