import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCakeCandles,
  faEnvelope,
  faClockRotateLeft,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

const BakedGoodies = () => {
  let changeStyle = { width: "3m", height: "2em" };
  const [page, setPage] = useState("request");
  const [tab, setTab] = useState("0");

  function sideClick() {
    setTab("0");
  }

  function close() {
    if (tab === "13.3em") {
      setTab("0");
    }
  }

  return (
    <>
      <div className="Home" onClick={close}>
        <div className="dashboard">
          <div
            className="dashbox1"
            onClick={() => {
              setTab("13.3em");
            }}
          >
            <p>Open</p>
          </div>
          <div className="dashbox2">
            <h1>Dashboard</h1>
          </div>
          <div className="dashbox3">
            <img src="BakedGoodies.png" alt="Logo" />
          </div>
        </div>
        <div className="sideBar" style={{ width: tab }}>
          <div
            className="con1"
            onClick={() => {
              setPage("request");
              sideClick();
            }}
          >
            <div className="icon">
              <FontAwesomeIcon icon={faEnvelope} style={changeStyle} />
            </div>
            <h4>
              <Link to="/request">Request</Link>
            </h4>
          </div>
          <div
            className="con1"
            onClick={() => {
              setPage("onGoing");
              sideClick();
            }}
          >
            <div className="icon">
              <FontAwesomeIcon icon={faCakeCandles} style={changeStyle} />
            </div>
            <h4>
              <Link to="/ongoing">Ongoing</Link>
            </h4>
          </div>
          <div
            className="con1"
            onClick={() => {
              setPage("history");
              sideClick();
            }}
          >
            <div className="icon">
              <FontAwesomeIcon icon={faClockRotateLeft} style={changeStyle} />
            </div>
            <h4>
              <Link to="/history">History</Link>
            </h4>
          </div>
          <div
            className="con1"
            onClick={() => {
              setPage("date");
              sideClick();
            }}
          >
            <div className="icon">
              <FontAwesomeIcon icon={faCalendar} style={changeStyle} />
            </div>
            <h4>
              <Link to="/date">Date</Link>
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default BakedGoodies;
