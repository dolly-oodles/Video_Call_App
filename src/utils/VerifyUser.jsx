import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../ContextAPIs/AuthContext";

export const VerifyUser = () => {
  const { authUser } = useAuth();
  return authUser ? <Outlet /> : <Navigate to={"/"} />;
};
