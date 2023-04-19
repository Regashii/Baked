import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";

const ChangePass = () => {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate("/")}>Go back</button>
    </>
  );
};

export default ChangePass;
