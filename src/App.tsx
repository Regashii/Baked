import "./App.css";
import "./Sign.css";
import Login from "./components/Login";
import "./pagescss/Request.css";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Login />
      </Router>
      ;
    </>
  );
}

export default App;
