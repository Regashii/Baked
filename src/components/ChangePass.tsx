import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";

const ChangePass = () => {
  const navigate = useNavigate();

  const loginAuth = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const dashboard = () => {
    navigate("/dashboard");
  };
  return (
    <>
      <button
        onClick={() => {
          loginAuth();
        }}
      >
        Go back logi in page
      </button>
      <button onClick={dashboard}>Go back to dashboard</button>
    </>
  );
};

export default ChangePass;
