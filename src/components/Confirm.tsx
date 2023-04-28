import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const user = window.localStorage.getItem("isLoggin");
  const refpage = window.localStorage.getItem("token");
  if (user && refpage) {
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
