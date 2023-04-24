import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const loginAuth = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <>
      <div className="adminAcc">
        <button
          className="enter"
          onClick={() => {
            navigate("/admin/change");
          }}
        >
          Change
        </button>
        <button className="enter" onClick={loginAuth}>
          Log out
        </button>
        <button
          className="enter"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Dashboard
        </button>
      </div>
    </>
  );
};

export default Settings;
