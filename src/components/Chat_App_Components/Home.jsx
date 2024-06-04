import React, { useEffect, useState } from "react";
import ChatSidebar from "./ChatSidebar";
import MessageContainer from "./MessageContainer";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setIsSidebarVisible(false);
  };

  const handleShowSidebar = () => {
    setIsSidebarVisible(true);
    setSelectedUser(null);
  };

  useEffect(() => {
    setIsSidebarVisible(!selectedUser);
  }, [selectedUser]);

  return (
    <div
      className="flex justify-between w-full 
      h-full rounded-xl shadow-lg
       bg-gray-400 bg-clip-padding
        backdrop-filter backdrop-blur-lg 
        bg-opacity-0"
    >
      <div className={`w-[40%] md:flex ${isSidebarVisible ? "" : "hidden"}`}>
        <ChatSidebar onSelectUser={handleUserSelect} />
      </div>
      <div
        className={`divider divider-horizontal md:flex ${
          isSidebarVisible ? "" : "hidden"
        } 
      ${selectedUser ? "block" : "hidden"}`}
      ></div>
      <div
        className={` flex-1 ${
          selectedUser ? "" : "hidden md:flex"
        } bg-gray-200}`}
      >
        <MessageContainer onBackUser={handleShowSidebar} />
      </div>
    </div>
  );
};

export default Home;
