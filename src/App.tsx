import "./App.css";
import "./Sign.css";
import { useState } from "react";
import BakedGoodies from "./components/BakedGoodies";

function App() {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);

  const [signin, setSignin] = useState(true);
  const [goodies, setSGoodies] = useState(false);

  const userName = "Bakedgoodies";
  const passWord = "12345";

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLogin((prev) => {
      return { ...prev, [name]: value };
    });
  };

  function signClick() {
    if (login.username === "") {
      setCheck1(true);
      setCheck3(false);
    } else {
      setCheck1(false);
    }

    if (login.password === "") {
      setCheck2(true);
      setCheck3(false);
    } else {
      setCheck2(false);
    }

    if (login.username != "" && login.password != "") {
      if (login.username === userName && login.password === passWord) {
        setSignin(false);
        setSGoodies(true);
      } else {
        setCheck3(true);
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
                onChange={handleChange}
              />
              <span className="user">Username</span>
              {check1 && <p>Please input your usernames</p>}
            </div>

            <div className="inputBox">
              <input
                type="password"
                required
                name="password"
                onChange={handleChange}
              />
              <span>Password</span>
              {check2 && <p>Please input your password</p>}
            </div>
            {check3 && <i>Incorrect username or password</i>}

            <button className="enter" onClick={signClick}>
              Enter
            </button>
          </div>
        </div>
      )}

      {goodies && <BakedGoodies />}
    </>
  );
}

export default App;
