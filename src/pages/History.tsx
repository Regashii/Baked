import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const History = () => {
  const res = window.localStorage.getItem("token");
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .get("https://new-back-rho.vercel.app/admin", {
  //       headers: {
  //         Authorization: `Bearer ${res}`,
  //       },
  //     })
  //     .then((response) => {
  //       if (response.data !== "Congrats") {
  //         window.localStorage.removeItem("isLoggin");
  //         window.localStorage.removeItem("token");
  //         navigate("/");
  //       }
  //     });
  // }, []);
  return (
    <div className="Pages3">
      <header>
        <h1>History</h1>
      </header>
    </div>
  );
};

export default History;
