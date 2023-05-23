import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./Sign.css";
import "./pagescss/Request.css";
import "./pagescss/Ongoing.css";
import "./pagescss/History.css";
import "./pagescss/Customer.css";
import "./pagescss/Cakes.css";
import "./pagescss/Loading.css";
import "./pagescss/ChangePass.css";
import "./pagescss/Reset.css";
import "./pagescss/Forgot.css";
import "./pagescss/MainPage.css";
import Login from "./components/Login";
import "./pagescss/Request.css";
import Confirm from "./components/Confirm";
import Settings from "./components/Settings";
import Request from "./pages/Request";
import Ongoing from "./pages/Ongoing";
import History from "./pages/History";
import Sched from "./pages/Customer";
import { ToastContainer } from "react-toastify";
import MainPage from "./components/MainPage";
import ForgotPass from "./components/ForgotPass";
import Reset from "./components/Reset";
import Cakes from "./pages/Cakes";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgotPass" element={<ForgotPass />}></Route>
          <Route path="/Reset" element={<Reset />}></Route>
          <Route element={<Confirm />}>
            <Route
              path="/dashboard-request"
              element={
                <div className="dashboard-main">
                  <ToastContainer />
                  <div className="dashboard-container">
                    <Request />
                  </div>
                </div>
              }
            />

            <Route
              path="/dashboard-ongoing"
              element={
                <div className="dashboard-main">
                  <div className="dashboard-container">
                    <Ongoing />
                  </div>
                </div>
              }
            />
            <Route
              path="/dashboard-history"
              element={
                <div className="dashboard-main">
                  <div className="dashboard-container">
                    <History />
                  </div>
                </div>
              }
            />
            <Route
              path="/dashboard-customer"
              element={
                <div className="dashboard-main">
                  <div className="dashboard-container">
                    <Sched />
                  </div>
                </div>
              }
            />
            <Route
              path="/dashboard-cakes"
              element={
                <div className="dashboard-main">
                  <ToastContainer />
                  <div className="dashboard-container">
                    <Cakes />
                  </div>
                </div>
              }
            />

            <Route path="/dashboard/setting" element={<Settings />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
