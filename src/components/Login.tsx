import { useEffect, useState } from "react";
import axios from "axios";
import { Link, json, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";

function Login(): JSX.Element {
  const navigate = useNavigate();

  const [errUser, seterrUser] = useState(false);
  const [errPass, seterrPass] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, toggleShow] = useState(false);

  const [access, setAccess] = useState(null);

  const tokenRefresh = async () => {
    try {
      const res = await axios.post("https://new-back-rho.vercel.app/token", {
        // @ts-ignore
        token: access.refeshToken,
      });

      setAccess({
        // @ts-ignore
        ...access,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
    } catch (error) {}
  };
  // const axoisJwt = axios.create();

  // if (access) {
  //   console.log(access);
  //   axoisJwt.interceptors.request.use(async (config) => {
  //     let currentDate = new Date();
  //     const decodeToken = jwt_decode(access.accessToken);
  //     if (decodeToken.exp * 1000 < currentDate.getTime()) {
  //       // await tokenRefresh();
  //       console.log("hi");
  //     } else {
  //       console.log("him");
  //     }
  //   });
  // }

  async function loginAuth() {
    if (username === "") {
      seterrUser(true);
    } else {
      seterrUser(false);
    }

    if (password === "") {
      seterrPass(true);
    } else {
      seterrPass(false);
    }

    if (username != "" && password != "") {
      axios
        .post("https://new-back-rho.vercel.app/login", {
          username: username,
          password: password,
        })
        .then((res) => {
          if (res.data.accessToken) {
            localStorage.setItem("token", res.data.accessToken);
            localStorage.setItem("route", "request");
            navigate("/dashboard-request");
          }
        })
        .catch((error) => {
          if (error.response.status === 404 || error.response.status === 400) {
            toast.error("No user found", {
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
  }

  return (
    <>
      <div className="sign-in">
        <div className="card">
          <a className="login">Log in</a>
          <div className="inputBox">
            <input
              type="text"
              required
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <span className="user">Username</span>
            {errUser && <p>Please input your usernames</p>}
          </div>

          <div className="inputBox">
            <input
              type={show ? "type" : "password"}
              required
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div
              className="show"
              onClick={() => {
                toggleShow(!show);
              }}
            >
              {show ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </div>
            <span>Password</span>
            {errPass && <p>Please input your password</p>}
          </div>

          <div className="buttons">
            <button className="enter" onClick={loginAuth}>
              Enter
            </button>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              textDecoration: "underline",
              color: "blue",
            }}
            onClick={() => {
              navigate("/forgotPass");
            }}
          >
            Forgot Password
          </div>

          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default Login;
