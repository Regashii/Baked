import "./App.css";
import { useState } from "react";
import BakedGoodies from "./components/BakedGoodies";

function App() {
  const [wrong, setWrong] = useState("");
  const [signin, setSignin] = useState(true);
  const [goodies, setSGoodies] = useState(false);

  const userName = "Bakedgoodies";
  const passWord = "12345";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function signClick() {
    if (username === userName && password === passWord) {
      setSignin(false);
      setSGoodies(true);
    } else {
      console.log("Incorrect");
      setWrong("Incorrect");
    }
  }

  return (
    <>
      {signin && (
        <div className="sign-in">
          <div className="box">
            <h2>Sign in</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <span>{wrong}</span>
            <br />

            <button onClick={signClick}>Bake</button>
          </div>
        </div>
      )}

      {goodies && <BakedGoodies />}
    </>
  );
}

export default App;
