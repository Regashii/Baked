import { useNavigate } from "react-router-dom";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";

const ChangePass = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [correct, setCorrect] = useState(false);

  const token = localStorage.getItem("token");
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
  }, []);

  function checkAdmin() {
    axios
      .post("/api/password", {
        password,
        username,
      })
      .then((res) => {
        if (res.data === "Correct") {
          setCorrect(true);
        } else {
          setCorrect(false);
          toast.error("No user found!!!", {
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

  const changePass = (e: any) => {
    e.preventDefault();
    if (confirmPass === newPass) {
      axios
        .put("https://new-back-rho.vercel.app/password", { password: newPass })
        .then((res) => {
          if (res.data === "sorry") {
            return toast.error("Sorry, try again later", {
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
          toast.success("Congrats", {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          toast.warning("Please wait, don't back or click anything", {
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
            navigate("/login");
            localStorage.clear();
          }, 7000);
        });
    } else {
      toast.error("Do not match", {
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
  };

  return (
    <>
      <ToastContainer />
      <div className="box">
        <div className="form">
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
          {!correct && (
            <>
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
                  readOnly
                  placeholder="disabled for now to avoid changing"
                />
              </div>
              <br />
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
                  Password:
                </span>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  readOnly
                  placeholder="disabled for now to avoid changing"
                />
              </div>
              <br />
              <button
                className="btn btn-outline-warning"
                onClick={checkAdmin}
                disabled
              >
                Confirm
              </button>
            </>
          )}

          {correct && (
            <form className="change" onSubmit={changePass}>
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
                  new Password:
                </span>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setNewPass(e.target.value);
                  }}
                  required
                  readOnly
                  placeholder="disabled for now to avoid changing"
                />
              </div>
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
                  confirm Password:
                </span>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setConfirmPass(e.target.value);
                  }}
                  required
                  readOnly
                  placeholder="disabled for now to avoid changing"
                />
              </div>
              <button className="btn btn-outline-warning" disabled>
                Change
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ChangePass;
