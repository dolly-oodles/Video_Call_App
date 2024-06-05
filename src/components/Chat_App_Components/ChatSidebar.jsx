import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../ContextAPIs/AuthContext";
import { useSocketContext } from "../../ContextAPIs/SocketContext";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import useSession from "../../hooks/useSession";
import userConversation from "../../zustand/userConversation";
import axiosInstance from "../../utils/interceptor";

const ChatSidebar = ({ onSelectUser }) => {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuth();
  const { socket, onlineUser } = useSocketContext();
  const [searchInput, setSearchInput] = useState("");
  const [searchUser, setSearchuser] = useState([]);
  const [chatUser, setChatUser] = useState([]);
  const [setLoading] = useState(false);
  const [selectedUserId, setSetSelectedUserId] = useState(null);
  const { message, selectedConversation, setSelectedConversation } =
    userConversation();
  const [newMessageUsers, setNewMessageUsers] = useState("");
  const { clearLocalStorage } = useSession();
  const talkedwith = chatUser.map((user) => user._id);

  const isOnline = talkedwith.map((userId) => onlineUser.includes(userId));

  useEffect(() => {
    const chatUserHandler = async () => {
      setLoading(true);
      try {
        const chatters = await axiosInstance.get("user/currentChatters");
        const data = chatters.data;
        if (data.success === false) {
          setLoading(false);
        }
        setLoading(false);
        setChatUser(data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    chatUserHandler();
  }, [setLoading]);

  const handelSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const search = await axiosInstance.get(
        `user/searchUser?search=${searchInput}`
      );
      const data = search.data;
      if (data.success === false) {
        setLoading(false);
        console.log(data.message);
      }
      setLoading(false);
      if (data.length === 0) {
        toast.info("User Not Found");
      } else {
        setSearchuser(data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handelUserClick = (user) => {
    onSelectUser(user);
    setSetSelectedUserId(user._id);
    setSelectedConversation(user);
  };

  const handSearchback = () => {
    setSearchuser([]);
    setSearchInput("");
  };

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setNewMessageUsers(newMessage);
    });
    return () => socket?.off("newMessage");
  }, [socket, message]);

  const handelLogOut = async () => {
    const confirmlogout = window.prompt("type 'UserName' To LOGOUT");
    if (confirmlogout === authUser.username) {
      setLoading(true);
      try {
        const logout = await axiosInstance.post("auth/logout");
        const data = logout.data;
        if (data?.success === false) {
          setLoading(false);
          console.log(data?.message);
        }
        toast.info(data?.message);
        localStorage.removeItem("chatapp");
        clearLocalStorage();
        setAuthUser(null);
        setLoading(false);
        navigate("/login");
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      toast.info("LogOut Cancelled");
    }
  };

  return (
    <div className="w-full m-5">
      <div className="flex justify-between gap-2">
        <form
          onSubmit={handelSearchSubmit}
          className="flex flex-1 items-center justify-between bg-white rounded-full "
        >
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            className="px-4 bg-transparent outline-none rounded-full w-full"
            placeholder="search user"
          />
          <button className="btn btn-circle text-gray-100 bg-sky-700 hover:bg-gray-950">
            <FaSearch size={18} />
          </button>
        </form>
        <img
          src={authUser?.profilePic}
          alt={authUser?.username}
          className="self-center h-12 w-12 hover:scale-110 cursor-pointer"
        />
      </div>
      <div className="divider px-3"></div>

      {searchUser?.length > 0 ? (
        <>
          <div className="h-[calc(100%-125px)] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-600 hover:scrollbar-thumb-sky-700">
            <div className="w-auto">
              {searchUser.map((user, index) => (
                <div key={user._id}>
                  <div
                    onClick={() => handelUserClick(user)}
                    className={`flex gap-3 
                                                items-center rounded 
                                                p-2 py-1 cursor-pointer
                                                ${
                                                  selectedUserId === user?._id
                                                    ? "bg-sky-500"
                                                    : ""
                                                } `}
                  >
                    {/*Socket is Online*/}
                    <div
                      className={`avatar ${isOnline[index] ? "online" : ""}`}
                    >
                      <div className="w-12 rounded-full">
                        <img src={user.profilePic} alt="user.img" />
                      </div>
                    </div>
                    <div className="flex flex-col flex-1">
                      <p className="font-bold text-gray-950">{user.username}</p>
                    </div>
                  </div>
                  <div className="divider divide-solid px-3 h-[1px]"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-auto px-1 py-1 flex">
            <button
              onClick={handSearchback}
              className="bg-white rounded-full px-2 py-1 self-center"
            >
              <IoArrowBackSharp size={25} />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="h-[calc(100%-125px)] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-600 hover:scrollbar-thumb-sky-700 ">
            <div className="w-auto">
              {chatUser.length === 0 ? (
                <>
                  <div className="font-bold items-center flex flex-col text-xl text-yellow-500">
                    <h1>Why are you Alone!!🤔</h1>
                    <h1>Search username to chat</h1>
                  </div>
                </>
              ) : (
                <>
                  {chatUser.map((user, index) => (
                    <div key={user._id}>
                      <div
                        onClick={() => handelUserClick(user)}
                        className={`flex gap-3 
                                                items-center rounded 
                                                p-2 py-1 cursor-pointer
                                                ${
                                                  selectedUserId === user?._id
                                                    ? "bg-sky-500"
                                                    : ""
                                                } `}
                      >
                        {/*Socket is Online*/}
                        <div
                          className={`avatar ${
                            isOnline[index] ? "online" : ""
                          }`}
                        >
                          <div className="w-12 rounded-full">
                            <img src={user?.profilePic} alt={user?.username} />
                          </div>
                        </div>
                        <div className="flex flex-col flex-1">
                          <p className="font-bold text-gray-950">
                            {user.username}
                          </p>
                        </div>

                        <div>
                          {selectedConversation === null &&
                          newMessageUsers.reciverId === authUser._id &&
                          newMessageUsers.senderId === user._id ? (
                            <div className="rounded-full bg-green-700 text-sm text-white px-[4px]">
                              +1
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div className="divider divide-solid px-3 h-[1px]"></div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="mt-auto px-1 py-1 flex gap-1">
            <button
              onClick={handelLogOut}
              className="hover:bg-red-600  w-8 cursor-pointer rounded-lg"
            >
              <BiLogOut size={25} color={"white"} />
            </button>
            <p className="text-sm py-1 text-white">Logout</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatSidebar;
