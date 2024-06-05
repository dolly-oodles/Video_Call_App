import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const { authUser } = useAuth();
  const socketconn = io("https://chat-app-backend-hhmx.onrender.com/", {
    query: {
      userId: authUser && authUser?._id,
    },
  });
  useEffect(() => {
    if (authUser) {
      socketconn.on("getOnlineUsers", (users) => {
        setOnlineUser(users);
      });
      setSocket(socketconn);
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser, socketconn]);
  return (
    <SocketContext.Provider value={{ socket, onlineUser }}>
      {children}
    </SocketContext.Provider>
  );
};
