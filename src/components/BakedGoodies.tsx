import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faEnvelope,
  faClockRotateLeft,
  faUserSecret,
  faGear,
  faRightFromBracket,
  faBagShopping,
  faUsers,
  faCakeCandles,
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
    axios.get("/api/logout").then((res) => console.log(res));
  };

  useEffect(() => {
    axios
      .get("/api/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
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
              <h1>BakedGoodies</h1>
            </div>
            <div className="dashbox3">
              <img src="BakedGoodies.png" alt="Logo" />

              <h3>
                <FontAwesomeIcon icon={faBagShopping} />
                BakedGoodies
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
                icon={faClipboardList}
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
                  localStorage.setItem("route", "customer");
                  navigate("/dashboard-customer");
                }}
                icon={faUsers}
                style={{
                  color: dashRoute === "customer" ? "#d53f8c" : "",
                  width: "3m",
                  height: "2em",
                }}
                className="icon1"
              />
            </div>
            <div className="icon">
              <FontAwesomeIcon
                onClick={() => {
                  localStorage.setItem("route", "cakes");
                  navigate("/dashboard-cakes");
                }}
                icon={faCakeCandles}
                style={{
                  color: dashRoute === "cakes" ? "#d53f8c" : "",
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
                <FontAwesomeIcon icon={faClipboardList} />
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
                localStorage.setItem("route", "customer");
                navigate("/dashboard-customer");
              }}
              style={{
                background: dashRoute === "customer" ? "#d53f8c" : "",
              }}
            >
              <div className="icon">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <h4>Customer</h4>
            </div>
            <div
              className="con1"
              onClick={() => {
                localStorage.setItem("route", "cakes");
                navigate("/dashboard-cakes");
              }}
              style={{
                background: dashRoute === "cakes" ? "#d53f8c" : "",
              }}
            >
              <div className="icon">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <h4>Cakes</h4>
            </div>
          </div>

          <div className="userInter">
            <div className="con1" onClick={directSettings}>
              <div className="icon">
                <FontAwesomeIcon icon={faGear} />
              </div>
              <h4>Settings</h4>
            </div>
            <div className="con1">
              <div className="icon" onClick={logout}>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </div>
              <h4 onClick={logout}>log out</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BakedGoodies;
