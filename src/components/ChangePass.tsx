import { useNavigate } from "react-router-dom";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const ChangePass = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const user = "baked";
  const pass = "admin";

  function checkAdmin() {
    if (user === username && pass === password) {
      console.log("hi");
    } else {
      console.log("nope");
    }
  }

  const token = localStorage.getItem("token");

  return (
    <>
      {token && (
        <div className="container">
          <div className="container">
            <h4
              onClick={() => {
                navigate("/dashboard/setting");
              }}
              style={{ display: "flex", gap: "10px" }}
            >
              <FontAwesomeIcon icon={faArrowAltCircleLeft} />
              Go back
            </h4>
            <h1>Confimation</h1>
            <div className="input-group flex-nowrap">
              <span className="input-group-text" id="addon-wrapping">
                Username:
              </span>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <br />
            <div className="input-group flex-nowrap">
              <span className="input-group-text" id="addon-wrapping">
                Password:
              </span>
              <input
                type="password"
                className="form-control"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <br />
            <button className="btn btn-outline-warning" onClick={checkAdmin}>
              Confirm
            </button>

            <div className="container">
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
                  Old Pass:
                </span>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
                  new Password:
                </span>
                <input
                  type="password"
                  className="form-control"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
                  confirm Password:
                </span>
                <input
                  type="password"
                  className="form-control"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangePass;
