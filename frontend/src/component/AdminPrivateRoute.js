import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = (props) => {
  const { user } = useSelector((state) => state.userCredentials);
  return user && user.isAdmin ? <Outlet /> : <Navigate to="/signIn" />;
};

export default AdminPrivateRoute;
