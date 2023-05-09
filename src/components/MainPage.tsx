import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>MainPage</div>
      <button
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </button>
      <br />
      <button
        onClick={() => {
          navigate("/dashboard-request");
        }}
      >
        dashboard reqeust
      </button>
      <br />
      <button
        onClick={() => {
          navigate("/dashboard-ongoing");
        }}
      >
        dashboard ongoing
      </button>
      <br />
      <button
        onClick={() => {
          navigate("/dashboard-history");
        }}
      >
        dashboard history
      </button>
      <br />
      <button
        onClick={() => {
          navigate("/dashboard-customer");
        }}
      >
        dashboard cutomer
      </button>
    </>
  );
};

export default MainPage;
