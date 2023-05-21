import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
  const navigate = useNavigate();
  const Router = localStorage.getItem("route");
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setAccount((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const [newAccount, setNewAccount] = useState({
    newUsername: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [disabled, setDisabled] = useState(false);

  const handleNewChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewAccount((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const token = localStorage.getItem("token");

  const [user, changeUser] = useState(false);

  useEffect(() => {
    axios
      .get("/api/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          localStorage.clear();
          navigate("/login");
        }
      });

    axios
      .get("/api/change")
      .catch((err) => {
        if (err.response.status === 401 || err.response.status === 403) {
          changeUser(false);
        }
      })
      .then((res: any) => {
        if (res.status === 200) {
          changeUser(true);
        }
      });
  }, []);

  const logout = async () => {
    localStorage.clear();
    navigate("/login");
    axios.get("/api/logout");
  };

  const verifyAcc = (e: any) => {
    e.preventDefault();

    axios
      .post("/api/change", {
        username: account.username,
        password: account.password,
      })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => {
        if (err.response.status === 400 || err.response.status === 400) {
          toast.error("Wrong", {
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
  };

  const changeAcc = (e: any) => {
    e.preventDefault();
    if (newAccount.newPassword !== newAccount.confirmPassword) {
      toast.error("new and confirm pass not match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      setDisabled(true);
      axios
        .put("/api/change", {
          username: newAccount.newUsername,
          password: newAccount.newPassword,
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success("Change success", {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setTimeout(() => {
              localStorage.clear();
              navigate("/login");
            }, 5000);
          }
        })
        .catch((err) => {
          if (err.response.status === 500) {
            setDisabled(false);
          }
        });
    }
  };

  return (
    <>
      <div
        className="container-fluid"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "30em",
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

          {!user && (
            <form onSubmit={verifyAcc}>
              <h1
                className="container"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "3em",
                }}
              >
                Verify account
              </h1>
              <div className="input-group mb-3">
                <span className="input-group-text">Username:</span>
                <input
                  name="username"
                  type="text"
                  className="form-control"
                  required
                  placeholder="Verify"
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Password:</span>
                <input
                  name="password"
                  type="text"
                  className="form-control"
                  required
                  placeholder="First"
                  onChange={handleChange}
                  disabled
                />
              </div>
              <button className="btn btn-warning" disabled>
                Verify account
              </button>
            </form>
          )}

          {user && (
            <form onSubmit={changeAcc}>
              <h1
                className="container"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "3em",
                }}
              >
                Change account
              </h1>
              <div className="input-group mb-3">
                <span className="input-group-text">New username:</span>
                <input
                  name="newUsername"
                  type="text"
                  className="form-control"
                  required
                  onChange={handleNewChange}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">New password:</span>
                <input
                  name="newPassword"
                  type="text"
                  className="form-control"
                  required
                  onChange={handleNewChange}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Confirm password:</span>
                <input
                  name="confirmPassword"
                  type="text"
                  className="form-control"
                  required
                  onChange={handleNewChange}
                />
              </div>
              <button className="btn btn-warning" disabled={disabled}>
                Change account
              </button>
            </form>
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
