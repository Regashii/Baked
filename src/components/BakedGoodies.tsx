import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCakeCandles,
  faEnvelope,
  faClockRotateLeft,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Request from "../pages/Request";
import Ongoing from "../pages/Ongoing";
import History from "../pages/History";
import Date from "../pages/Date";

const BakedGoodies = () => {
  const [page, setPage] = useState("request");

  return (
    <>
      <div className="Home">
        <div className="dashboard">
          <div className="dashCon">
            <div className="dashbox1">
              <p>Acc</p>
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
