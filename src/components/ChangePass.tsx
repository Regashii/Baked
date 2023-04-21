import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";

const ChangePass = () => {
  const navigate = useNavigate();

  const loginAuth = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <>
      <button
        onClick={() => {
          loginAuth();
        }}
      >
        Go back
      </button>
    </>
  );
};

export default ChangePass;
