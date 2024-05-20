import React from "react";
import { SiGooglemeet } from "react-icons/si";
import MeetingList from "./MeetingList";

function Sidebar() {
  return (
    <>
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          paddingTop:"10px",
          width: "20vw",
          borderTopLeftRadius: "20px",
          backgroundColor: "black",
          paddingLeft:"5px"
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
        <SiGooglemeet size={"3rem"} />

          <MeetingList/>
         
        
        </div>
      </div>
    </>
  );
}

export default Sidebar;
