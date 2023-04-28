import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  let user = false;
  if (user) {
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
