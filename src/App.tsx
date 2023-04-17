import "./App.css";
import "./Sign.css";
import { useState, useEffect } from "react";
import BakedGoodies from "./components/BakedGoodies";
import axios from "axios";

function App() {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);

  const [signin, setSignin] = useState(true);
  const [goodies, setGoodies] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          .post("http://localhost:3000/", {
            username,
            password,
          })
          .then((res) => {
            if (res.data === "exist") {
              console.log("success");
              setSignin(!signin);
              setGoodies(!goodies);
            } else if (res.data === "notexist") {
              setCheck3(true);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
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
                type="password"
                required
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
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

      {goodies && <BakedGoodies />}
    </>
  );
}

export default App;
