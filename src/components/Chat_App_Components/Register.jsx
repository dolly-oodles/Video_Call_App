import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../ContextAPIs/AuthContext";
import { RotatingLines } from "react-loader-spinner";

const Register = () => {
  const [inputData, setInputData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();

  const selectGender = (selectedGender) => {
    setInputData((prev) => ({
      ...prev,
      gender: selectedGender === inputData.gender ? "" : selectedGender,
    }));
  };
  const handleInput = (e) => {
    setInputData({
      ...inputData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (inputData.password !== inputData.confirmpassword.toLowerCase()) {
      setLoading(false);
      return toast.error("Password Doesn't Match");
    }
    try {
      const register = await axios.post(
        "https://chat-app-backend-hhmx.onrender.com/api/auth/register",
        inputData
      );
      const data = register.data;
      if (data.success === false) {
        setLoading(false);
        toast.error(data.message);
        console.log(data.message);
      }
      toast.success(data.message);
      localStorage.setItem("chatapp", JSON.stringify(data));
      setAuthUser(data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mix-w-full mx-auto">
      <div
        className="w-full p-10 rounded-lg shadow-lg
          bg-gray-400 bg-clip-padding
           backdrop-filter backdrop-blur-lg bg-opacity-0"
      >
        <h1 className="text-3xl font-bold text-center text-gray-300">
          Register <span className="text-gray-950">ConvoHub</span>
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col text-black">
          <div>
            <label className="label p-2">
              <span className="font-bold text-gray-950 text-xl label-text">
                FullName :
              </span>
            </label>
            <input
              type="text"
              id="fullname"
              placeholder="Enter Full Name"
              required
              className="w-full input input-bordered h-10"
              onChange={handleInput}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="font-bold text-gray-950 text-xl label-text">
                UserName :
              </span>
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter Email"
              required
              className="w-full input input-bordered h-10"
              onChange={handleInput}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="font-bold text-gray-950 text-xl label-text">
                Email :
              </span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
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
              placeholder="Enter Password"
              required
              className="w-full input input-bordered h-10"
              onChange={handleInput}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="font-bold text-gray-950 text-xl label-text">
                Confirm Password :
              </span>
            </label>
            <input
              type="text"
              id="confirmpassword"
              placeholder="Enter Confirm Password"
              required
              className="w-full input input-bordered h-10"
              onChange={handleInput}
            />
          </div>
          <div id="gender" className="flex gap-6">
            <label className="cursor-pointer label flex gap-2">
              <span className="label-text font-semibold text-gray-950">
                Male
              </span>
              <input
                onChange={() => selectGender("male")}
                checked={inputData.gender === "male"}
                type="checkbox"
                className="checkbox checkbox-info"
              />
            </label>
            <label className="cursor-pointer label flex gap-2">
              <span className="label-text font-semibold text-gray-950">
                Female
              </span>
              <input
                onChange={() => selectGender("female")}
                checked={inputData.gender === "female"}
                type="checkbox"
                className="checkbox checkbox-info"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-4 self-center w-auto px-3 py-1 bg-gray-950 text-lg text-white rounded-lg hover:bg-gray-900 hover:scale-105 "
          >
            {loading ? (
              <div className="px-4 py-1">
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
              "Register"
            )}
          </button>
        </form>
        <div className="pt-2">
          <p className="text-sm font-semibold text-gray-500">
            Don't have an account ?{" "}
            <Link to={"/"}>
              <span className="text-blue-300 font-bold underline cursor-pointer hover:text-blue-600">
                Login Now!
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
