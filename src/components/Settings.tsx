import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faArrowLeftLong,
  faArrowAltCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
  const navigate = useNavigate();
  const Router = localStorage.getItem("route");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [info, setInfo] = useState("");
  const [user, changeUser] = useState(false);
  const token = localStorage.getItem("token");

  const [disabled1, setDisabled1] = useState(false);
  const [disabled2, setDisabled2] = useState(false);

  useEffect(() => {
    axios
      .get("https://new-back-rho.vercel.app/api/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          localStorage.clear();
          navigate("/login");
        }
      })
      .then((response: any) => {
        if (response.status === 200) {
          setInfo(response.data.username);
        }
      });
  }, []);

  const logout = async () => {
    localStorage.clear();
    navigate("/login");
    axios.get("/api/logout").then((res) => console.log(res));
  };

  async function checkPass() {
    await axios.post("/api/username", { password }).then((res) => {
      if (res.data === "Correct") {
        changeUser(true);
        setDisabled1(true);
      } else {
        toast.error("Wrong password", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    });
  }

  async function changeUsername() {
    const success = await axios.put(
      "https://new-back-rho.vercel.app/api/username",
      { username }
    );
    if (success) {
      toast.success("Success!", {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      toast.warn(
        "Log in again, in any minute this account will be signing out",
        {
          position: "top-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );

      setDisabled2(true);
    }
    setTimeout(() => {
      changeUser(false);
      localStorage.clear();
      navigate("/login");
    }, 10000);
  }

  return (
    <>
      <div
        className="container-fluid"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="container bg-info" style={{ padding: "20px" }}>
          <h4
            onClick={() => {
              navigate(`/dashboard-${Router}`);
            }}
          >
            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
            Dashboard
          </h4>
          <h1
            className="container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "3em",
            }}
          >
            Admin Side
          </h1>
          <div className="input-group mb-3">
            <span className="input-group-text">Username:</span>
            <input type="text" className="form-control" value={info} readOnly />
            <button
              className="btn btn-danger"
              type="button"
              id="button-addon2"
              onClick={checkPass}
              disabled={disabled1}
            >
              Edit
            </button>
            <input
              type="text"
              placeholder="enter password to edit"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          {user && (
            <div className="input-group mb-3">
              <span className="input-group-text">New username:</span>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <button
                className="btn btn-danger"
                type="button"
                id="button-addon2"
                onClick={changeUsername}
                disabled={disabled2}
              >
                Change
              </button>
            </div>
          )}

          <div
            className="container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "7em",
              gap: "20px ",
            }}
          >
            <button
              className="btn btn-warning"
              onClick={() => {
                navigate("/admin/change");
              }}
            >
              Change password
            </button>
            <button className="btn btn-success" onClick={logout}>
              Log out
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Settings;
