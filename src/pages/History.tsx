import { useEffect, useState } from "react";

import axios from "axios";

import App from "../App";
import BakedGoodies from "../components/BakedGoodies";

const History = () => {
  useEffect(() => {
    localStorage.setItem("route", "history");
  }, []);

  const [selects, setSelects] = useState("");
  const [pickUp, setPickUP] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://baked-goodies-api.vercel.app/api/order?isDone=true&&status=getCake`
      )
      .then((response) => {
        setPickUP(response.data);
      });
  }, []);

  return (
    <>
      <BakedGoodies />
      <div className="Pages3">
        <header>
          <h1>History</h1>
        </header>
        <div className="table3">
          <table>
            <thead>
              <tr>
                <th className="email">
                  <b>Email</b>
                </th>
                <th className="cake">
                  <b>Cakes</b>
                  <select
                    value={selects}
                    onChange={(e) => {
                      setSelects(e.target.value);
                    }}
                  >
                    <option value="">All</option>
                    <option value="Bento Cake">Bento Cake</option>
                    <option value="Bento Number Cake">Bento Number Cake</option>
                    <option value="Number Cake">Number Cake</option>
                    <option value="Mini Number Cake">Mini Number Cake</option>
                    <option value="Bento Bundle">Bento Bundle</option>
                    <option value="Minimalist Cake">Minimalist Cake</option>
                    <option value="Money Cake">Money Cake</option>
                    <option value="Theme Cake">Theme Cake</option>
                    <option value="Baby Tier Cake">Baby Tier Cake</option>
                    <option value="Mini Tier Cake">Mini Tier Cake</option>
                    <option value="Small Tier Cake">Small Tier Cake</option>
                    <option value="Big Tier Cake">Big Tier Cake</option>
                    <option value="Small 3 Tier Cake">Small 3 Tier Cake</option>
                    <option value="3 Tier Cake">3 Tier Cake</option>
                    <option value="Pullapart Cupcake">Pullapart Cupcake</option>
                    <option value="Cupcake">Cupcake</option>
                  </select>
                </th>
                <th className="date">
                  <b>From</b>
                </th>
                <th className="finish">
                  <b>to</b>
                </th>
              </tr>
            </thead>
            <tbody>
              {pickUp.map((pick: any) => (
                <>
                  {selects === pick.type && (
                    <tr key={pick.type}>
                      <td>{pick.customer.email}</td>
                      <td>{pick.type}</td>
                      <td>{new Date(pick.orderDate).toDateString()}</td>
                      <td>{new Date(pick.endDate).toDateString()}</td>
                    </tr>
                  )}

                  {selects === "" && (
                    <tr key={pick.type}>
                      <td>{pick.customer.email}</td>
                      <td>{pick.type}</td>
                      <td>{new Date(pick.orderDate).toDateString()}</td>
                      <td>{new Date(pick.endDate).toDateString()}</td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default History;
