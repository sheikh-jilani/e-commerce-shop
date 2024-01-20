import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { user } = useSelector((state) => state.userCredentials);
  return user ? <Outlet /> : <Navigate to="/signIn" />;
};

export default PrivateRoute;
