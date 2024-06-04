import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../ContextAPIs/AuthContext";
import axiosInstance from "../../utils/interceptor";
import useSession from "../../hooks/useSession";
import { RotatingLines } from "react-loader-spinner";

const Login = () => {
  const [userInput, setUserInput] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();
  const { setLocalStorageData } = useSession();
  const handleInput = (e) => {
    setUserInput({ ...userInput, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const login = await axiosInstance.post("auth/login", userInput);

      const data = login.data;
      if (data.success === false) {
        setLoading(false);
        toast.error(data.message);
        console.log(data.message);
      }
      toast.success(data.message);
      localStorage.setItem("chatapp", JSON.stringify(data));
      setLocalStorageData({
        key: "jwt",
        value: data.token,
      });
      setAuthUser(data);
      setLoading(false);
      navigate("/chatapp");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center max-w-full mx-auto">
      <div
        className="w-full p-10 rounded-lg shadow-lg
            bg-gray-400 bg-clip-padding
            backdrop-filter backdrop-blur-lg bg-opacity-0"
      >
        <h1 className="text-3xl font-bold text-center text-gray-300">
          Login <span className="text-gray-950">ConvoHub</span>
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col text-black">
          <div>
            <label className="label p-2">
              <span className="font-bold text-gray-950 text-xl label-text">
                Email :
              </span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              required
              className="w-full input input-bordered h-10"
              onChange={handleInput}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="font-bold text-gray-950 text-xl label-text">
                Password :
              </span>
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Your Password"
              required
              className="w-full input input-bordered h-10"
              onChange={handleInput}
            />
          </div>

          <button
            type="submit"
            className="mt-4 self-center w-auto px-3 py-1 bg-gray-950 text-lg text-white rounded-lg hover:bg-gray-900 hover:scale-105 "
          >
            {loading ? (
              <div className="px-3 py-1">
                <RotatingLines
                  visible={true}
                  height="30"
                  width="20"
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div className="pt-2">
          <p className="text-sm font-semibold text-gray-500">
            Don't have an account ?{" "}
            <Link to={"/register"}>
              <span className="text-blue-300 font-bold underline cursor-pointer hover:text-blue-600">
                Register Now!
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
