import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const navigate = useNavigate();

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

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
      setCheck1(true);
      setCheck3(false);
    } else {
      setCheck1(false);
    }

    if (password === "") {
      setCheck2(true);
      setCheck3(false);
    } else {
      setCheck2(false);
    }

    if (username != "" && password != "") {
      infos.map((info: any) => {
        if (info.username === username && info.password === password) {
          localStorage.setItem("user", "test");
          navigate("/dashboard");
        } else {
          setCheck3(true);
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
            {check1 && <p>Please input your usernames</p>}
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
                setShow(!show);
              }}
            >
              {show ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </div>
            <span>Password</span>
            {check2 && <p>Please input your password</p>}
          </div>
          {check3 && <i>Incorrect username or password</i>}

          <div className="buttons">
            <button className="enter" onClick={loginAuth}>
              Enter
            </button>
            <button
              className="enter"
              onClick={() => {
                navigate("/admin/change");
              }}
            >
              Change
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
