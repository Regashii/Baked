import axios from "axios";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  let token = true;
  if (token) {
    return true;
  } else {
    return false;
  }
};

const Confirm = (prop: any) => {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default Confirm;
