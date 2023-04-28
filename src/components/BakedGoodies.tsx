import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCakeCandles,
  faEnvelope,
  faClockRotateLeft,
  faCalendar,
  faUserSecret,
  faCircleInfo,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Request from "../pages/Request";
import Ongoing from "../pages/Ongoing";
import History from "../pages/History";
import Sched from "../pages/Sched";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BakedGoodies = () => {
  const [page, setPage] = useState("request");
  const navigate = useNavigate();
  const [notif, setNotif] = useState([]);
  const res = window.localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://baked-goodies-api.vercel.app/api/order?status=processing")
      .then((res) => {
        setNotif(res.data);
      });
  }, []);

  function directSettings() {
    navigate("/dashboard/setting");
  }

  const loginAuth = async () => {
    // await axios.get("https://new-back-rho.vercel.app/logout");
    navigate("/");
  };

  // useEffect(() => {
  //   axios
  //     .get("https://new-back-rho.vercel.app/admin", {
  //       headers: {
  //         Authorization: `Bearer ${res}`,
  //       },
  //     })
  //     .then((response) => {
  //       if (response.data !== "Congrats") {
  //         window.localStorage.removeItem("isLoggin");
  //         window.localStorage.removeItem("token");
  //         navigate("/");
  //       }
  //     });
  // }, []);

  return (
    <>
      <div className="Home">
        <div className="dashboard">
          <div className="dashCon">
            <div className="dashbox1">
              <p onClick={directSettings}>
                <FontAwesomeIcon icon={faUserSecret} className="userSecret" />
              </p>
            </div>
            <div className="dashbox2">
              <h1>Dashboard</h1>
            </div>
            <div className="dashbox3">
              <img src="BakedGoodies.png" alt="Logo" />

              <h3>
                <FontAwesomeIcon icon={faCircleInfo} />
                Dashboard
              </h3>
            </div>
          </div>

          <div className="iconBar">
            <div className="icon">
              <FontAwesomeIcon
                onClick={() => {
                  setPage("request");
                }}
                icon={faEnvelope}
                style={{
                  color: page === "request" ? "#d53f8c" : "",
                  width: "3m",
                  height: "2em",
                }}
                className="icon1"
              />

              <span className="position-absolute translate-middle badge rounded-pill bg-warning">
                {notif.length}
              </span>
            </div>

            <div className="icon">
              <FontAwesomeIcon
                onClick={() => {
                  setPage("onGoing");
                }}
                icon={faCakeCandles}
                style={{
                  color: page === "onGoing" ? "#d53f8c" : "",
                  width: "3m",
                  height: "2em",
                }}
                className="icon1"
              />
            </div>

            <div className="icon">
              <FontAwesomeIcon
                onClick={() => {
                  setPage("history");
                }}
                icon={faClockRotateLeft}
                style={{
                  color: page === "history" ? "#d53f8c" : "",
                  width: "3m",
                  height: "2em",
                }}
                className="icon1"
              />
            </div>
            <div className="icon">
              <FontAwesomeIcon
                onClick={() => {
                  setPage("date");
                }}
                icon={faCalendar}
                style={{
                  color: page === "date" ? "#d53f8c" : "",
                  width: "3m",
                  height: "2em",
                }}
                className="icon1"
              />
            </div>
          </div>

          <div className="iconBar2">
            <div
              className="con1"
              onClick={() => {
                setPage("request");
              }}
              style={{
                background: page === "request" ? "#d53f8c" : "",
              }}
            >
              <div className="icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <h4>Request</h4>
            </div>
            <div
              className="con1"
              onClick={() => {
                setPage("onGoing");
              }}
              style={{
                background: page === "onGoing" ? "#d53f8c" : "",
              }}
            >
              <div className="icon">
                <FontAwesomeIcon icon={faCakeCandles} />
              </div>
              <h4>Ongoing</h4>
            </div>
            <div
              className="con1"
              onClick={() => {
                setPage("history");
              }}
              style={{
                background: page === "history" ? "#d53f8c" : "",
              }}
            >
              <div className="icon">
                <FontAwesomeIcon icon={faClockRotateLeft} />
              </div>
              <h4>History</h4>
            </div>
            <div
              className="con1"
              onClick={() => {
                setPage("date");
              }}
              style={{
                background: page === "date" ? "#d53f8c" : "",
              }}
            >
              <div className="icon">
                <FontAwesomeIcon icon={faCalendar} />
              </div>
              <h4>Date</h4>
            </div>
            <div className="con1" onClick={directSettings}>
              <div className="icon">
                <FontAwesomeIcon icon={faGear} />
              </div>
              <h4>Settings</h4>
            </div>
          </div>
          <div className="logout">
            <div className="icon" onClick={loginAuth}>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </div>
            <h4 onClick={loginAuth}>log out</h4>
          </div>
        </div>
        <div className="reqBody">
          {page === "request" && <Request />}
          {page === "onGoing" && <Ongoing />}
          {page === "history" && <History />}
          {page === "date" && <Sched />}
        </div>
      </div>
    </>
  );
};

export default BakedGoodies;
