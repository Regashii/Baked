import { useState } from "react";
import BakedGoodies from "./BakedGoodies";
import axios from "axios";

const Login = () => {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);

  const [signin, setSignin] = useState(true);
  const [goodies, setGoodies] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const [infos, setInfos] = useState([]);

  async function signClick() {
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
      try {
        await axios
          .get("https://baked-goodies-api.vercel.app/admin", {})
          .then((res: any) => {
            setInfos(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    }

    infos.map((info: any) => {
      if (info.username === username && info.password === password) {
        setSignin(!signin);
        setGoodies(!goodies);
      } else {
        setCheck3(true);
      }
    });
  }
  return (
    <>
      {signin && (
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
                Show
              </div>
              <span>Password</span>
              {check2 && <p>Please input your password</p>}
            </div>
            {check3 && <i>Incorrect username or password</i>}

            <div className="buttons">
              <button className="enter" onClick={signClick}>
                Enter
              </button>
              <button className="enter">Change</button>
            </div>
          </div>
        </div>
      )}

      {goodies && (
        <>
          <BakedGoodies />
        </>
      )}
    </>
  );
};

export default Login;
