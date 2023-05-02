import axios from "axios";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("https://new-back-rho.vercel.app/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (
          response.data === "No token provided" ||
          response.data === "Token is not valid!"
        ) {
          localStorage.clear();
          navigate("/login");
        }
      });
  }, []);
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
