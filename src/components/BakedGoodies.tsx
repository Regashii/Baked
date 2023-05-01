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
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BakedGoodies = () => {
  const dashRoute = localStorage.getItem("route");
  const token = localStorage.getItem("token");

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

  const logout = async () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    axios
      .get("https://new-back-rho.vercel.app/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (
          response.data === "No token provided" ||
          response.data === "Token is not valid!"
        ) {
          localStorage.clear();
          navigate("/login");
        }
      });
  }, []);

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
                  localStorage.setItem("route", "request");
                  navigate("/dashboard-request");
                }}
                icon={faEnvelope}
                style={{
                  color: dashRoute === "request" ? "#d53f8c" : "",
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
                  localStorage.setItem("route", "onGoing");
                  navigate("/dashboard-ongoing");
                }}
                icon={faCakeCandles}
                style={{
                  color: dashRoute === "onGoing" ? "#d53f8c" : "",
                  width: "3m",
                  height: "2em",
                }}
                className="icon1"
              />
            </div>

            <div className="icon">
              <FontAwesomeIcon
                onClick={() => {
                  localStorage.setItem("route", "history");
                  navigate("/dashboard-history");
                }}
                icon={faClockRotateLeft}
                style={{
                  color: dashRoute === "history" ? "#d53f8c" : "",
                  width: "3m",
                  height: "2em",
                }}
                className="icon1"
              />
            </div>
            <div className="icon">
              <FontAwesomeIcon
                onClick={() => {
                  localStorage.setItem("route", "schedule");
                  navigate("/dashboard-schedule");
                }}
                icon={faCalendar}
                style={{
                  color: dashRoute === "schedule" ? "#d53f8c" : "",
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
                localStorage.setItem("route", "request");
                navigate("/dashboard-request");
              }}
              style={{
                background: dashRoute === "request" ? "#d53f8c" : "",
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
                localStorage.setItem("route", "onGoing");
                navigate("/dashboard-ongoing");
              }}
              style={{
                background: dashRoute === "onGoing" ? "#d53f8c" : "",
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
                localStorage.setItem("route", "history");
                navigate("/dashboard-history");
              }}
              style={{
                background: dashRoute === "history" ? "#d53f8c" : "",
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
                localStorage.setItem("route", "schedule");
                navigate("/dashboard-schedule");
              }}
              style={{
                background: dashRoute === "schedule" ? "#d53f8c" : "",
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
            <div className="icon" onClick={logout}>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </div>
            <h4 onClick={logout}>log out</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default BakedGoodies;
