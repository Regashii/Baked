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
  let changeStyle = { width: "3m", height: "2em" };
  const [page, setPage] = useState("request");

  return (
    <>
      <div className="Home">
        {page === "request" && <Request />}

        {page === "onGoing" && <Ongoing />}

        {page === "history" && <History />}

        {page === "date" && <Date />}

        <div className="downBar">
          <div
            className="icon"
            onClick={() => {
              setPage("request");
            }}
          >
            <FontAwesomeIcon icon={faEnvelope} style={changeStyle} />
          </div>

          <div
            className="icon"
            onClick={() => {
              setPage("onGoing");
            }}
          >
            <FontAwesomeIcon icon={faCakeCandles} style={changeStyle} />
          </div>
          <div
            className="icon"
            onClick={() => {
              setPage("history");
            }}
          >
            <FontAwesomeIcon icon={faClockRotateLeft} style={changeStyle} />
          </div>

          <div
            className="icon"
            onClick={() => {
              setPage("date");
            }}
          >
            <FontAwesomeIcon icon={faCalendar} style={changeStyle} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BakedGoodies;
