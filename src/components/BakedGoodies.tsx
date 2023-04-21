import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCakeCandles,
  faEnvelope,
  faClockRotateLeft,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Request from "../pages/Request";
import Ongoing from "../pages/Ongoing";
import History from "../pages/History";
import Date from "../pages/Date";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BakedGoodies = () => {
  const [page, setPage] = useState("request");
  const navigate = useNavigate();
  const [admin, toggleAdmin] = useState(false);

  const loginAuth = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <div className="Home">
        {admin && (
          <div className="adminAcc">
            <button
              className="enter"
              onClick={() => {
                navigate("/admin/change");
              }}
            >
              Change
            </button>
            <button className="enter" onClick={loginAuth}>
              Log out
            </button>
          </div>
        )}
        <div className="dashboard">
          <div className="dashCon">
            <div className="dashbox1">
              <p onClick={() => toggleAdmin(!admin)}>Acc</p>
            </div>
            <div className="dashbox2">
              <h1>Dashboard</h1>
            </div>
            <div className="dashbox3">
              <img src="BakedGoodies.png" alt="Logo" />
            </div>
          </div>

          <div className="sideBar1">
            <div className="icon">
              <FontAwesomeIcon
                onClick={() => {
                  setPage("request");
                }}
                icon={faEnvelope}
                style={{
                  color: page === "request" ? "#d53f8c" : "black",
                  width: "3m",
                  height: "2em",
                }}
              />
            </div>

            <div className="icon">
              <FontAwesomeIcon
                onClick={() => {
                  setPage("onGoing");
                }}
                icon={faCakeCandles}
                style={{
                  color: page === "onGoing" ? "#d53f8c" : "black",
                  width: "3m",
                  height: "2em",
                }}
              />
            </div>

            <div className="icon">
              <FontAwesomeIcon
                onClick={() => {
                  setPage("history");
                }}
                icon={faClockRotateLeft}
                style={{
                  color: page === "history" ? "#d53f8c" : "black",
                  width: "3m",
                  height: "2em",
                }}
              />
            </div>
            <div className="icon">
              <FontAwesomeIcon
                onClick={() => {
                  setPage("date");
                }}
                icon={faCalendar}
                style={{
                  color: page === "date" ? "#d53f8c" : "black",
                  width: "3m",
                  height: "2em",
                }}
              />
            </div>
          </div>
        </div>
        <div className="reqBody">
          {page === "request" && <Request />}
          {page === "onGoing" && <Ongoing />}
          {page === "history" && <History />}
          {page === "date" && <Date />}
        </div>
        {/* <div className="sideBar2">
          <div
            className="con1"
            onClick={() => {
              setPage("request");
            }}
          >
            <div className="icon">
              <FontAwesomeIcon icon={faEnvelope} style={changeStyle} />
            </div>
            <h4>Request</h4>
          </div>
          <div
            className="con1"
            onClick={() => {
              setPage("onGoing");
            }}
          >
            <div className="icon">
              <FontAwesomeIcon icon={faCakeCandles} style={changeStyle} />
            </div>
            <h4>Ongoing</h4>
          </div>
          <div
            className="con1"
            onClick={() => {
              setPage("history");
            }}
          >
            <div className="icon">
              <FontAwesomeIcon icon={faClockRotateLeft} style={changeStyle} />
            </div>
            <h4>History</h4>
          </div>
          <div
            className="con1"
            onClick={() => {
              setPage("date");
            }}
          >
            <div className="icon">
              <FontAwesomeIcon icon={faCalendar} style={changeStyle} />
            </div>
            <h4>Date</h4>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default BakedGoodies;
