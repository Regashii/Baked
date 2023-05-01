import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Sched = () => {
  const res = window.localStorage.getItem("token");
  const navigate = useNavigate();
  const now = new Date();

  return (
    <div className="Pages4">
      <header>
        <div className="navCal">
          <div className="dropCal">
            <p>
              {now.getUTCMonth() + 1}//{now.getDate()}//{now.getFullYear()}
            </p>
          </div>
        </div>
        <div className="bodyCal"></div>
      </header>
      <div className="body">
        <div className="eventCal">
          <aside className="taskDate">
            <p>Fri 21</p>
          </aside>
          <main className="taskEvent">
            <p>Request Number 1</p>
            <p>Request Number 2</p>
            <p>Request Number 3</p>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Sched;
