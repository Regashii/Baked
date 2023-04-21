import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const [errUser, seterrUser] = useState(false);
  const [errPass, seterrPass] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, toggleShow] = useState(false);

  const [infos, setInfos] = useState([]);

  useEffect(() => {
    axios
      .get("https://baked-goodies-api.vercel.app/api/admin", {})
      .then((res: any) => {
        setInfos(res.data);
      });
  }, []);

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
      infos.map((info: any) => {
        if (info.username === username && info.password === password) {
          localStorage.setItem("user", "test");
          navigate("/dashboard");
        } else {
          toast.error("Wrong password or username", {
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
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Login;
