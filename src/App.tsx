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
import Settings from "./components/Settings";
import Request from "./pages/Request";
import Ongoing from "./pages/Ongoing";
import History from "./pages/History";
import Sched from "./pages/Sched";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route element={<Confirm />}>
            <Route
              path="/dashboard-request"
              element={
                <div className="dashboard-main">
                  <ToastContainer />
                  <div className="dashboard-container">
                    <BakedGoodies /> <Request />
                  </div>
                </div>
              }
            />
            <Route
              path="/dashboard-ongoing"
              element={
                <div className="dashboard-main">
                  <div className="dashboard-container">
                    <BakedGoodies /> <Ongoing />
                  </div>
                </div>
              }
            />
            <Route
              path="/dashboard-history"
              element={
                <div className="dashboard-main">
                  <div className="dashboard-container">
                    <BakedGoodies /> <History />
                  </div>
                </div>
              }
            />
            <Route
              path="/dashboard-schedule"
              element={
                <div className="dashboard-main">
                  <div className="dashboard-container">
                    <BakedGoodies /> <Sched />
                  </div>
                </div>
              }
            />
            <Route path="/admin/change" element={<ChangePass />}></Route>
            <Route path="/dashboard/setting" element={<Settings />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
