import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./Sign.css";
import "./pagescss/Request.css";
import "./pagescss/History.css";
import "./pagescss/Ongoing.css";
import "./pagescss/Date.css";
import Login from "./components/Login";
import "./pagescss/Request.css";
import ChangePass from "./components/ChangePass";
import BakedGoodies from "./components/BakedGoodies";
import Confirm from "./components/Confirm";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/admin/change" element={<ChangePass />}></Route>
          <Route element={<Confirm />}>
            <Route path="/dashboard" element={<BakedGoodies />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
