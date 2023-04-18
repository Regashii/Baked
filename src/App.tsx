import "./App.css";
import "./Sign.css";
import Login from "./components/Login";
import Date from "./pages/Date";
import History from "./pages/History";
import Ongoing from "./pages/Ongoing";
import Request from "./pages/Request";
import "./pagescss/Request.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";

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
