import axios from "axios";
import { useEffect, useState } from "react";
import "../pagescss/Customer.css";

const Customer = () => {
  localStorage.setItem("route", "customer");
  let images = "th.jpg";
  const [buyers, setBuyers] = useState([]);
  const [search, setSearch] = useState("");
  const [allOrders, setAllOrders] = useState([]);
  const [average, setAverage] = useState(0);

  useEffect(() => {
    axios
      .get("https://baked-goodies-api.vercel.app/api/customer/list")
      .then((res) => {
        setBuyers(res.data);
      });
  }, []);
  //@ts-ignore

  const addItem = (datos: any) => {
    //@ts-ignore
    setAllOrders((ordering) => {
      return [...ordering, datos];
    });
  };

  function handleSubmit(data: any) {
    data.map((dat: any) => {
      axios
        .get(`https://baked-goodies-api.vercel.app/api/order?_id=${dat}`)
        .then((res) => {
          addItem(res.data[0]);
        });
    });
  }

  useEffect(() => {
    let sum: any = 0;
    let sumAll = [];
    axios
      .get(`https://baked-goodies-api.vercel.app/api/order?isDone=true`)
      .then((response) => {
        for (let index = 0; index < response.data.length; index++) {
          const element = response.data[index].feedback.rating;

          sum += element;
          sumAll.push(element);
        }
        setAverage(sum / sumAll.length);
      });
  }, []);

  return (
    <div className="Pages4">
      {allOrders.length > 0 && (
        <div className="individual">
          <aside>
            <button
              onClick={() => {
                setAllOrders([]);
              }}
              className="btn btn-danger"
              style={{
                float: "left",
                position: "absolute",
              }}
            >
              X
            </button>
            <img src={images} alt="avatar" />
            <div>
              {/* @ts-ignore */}
              <p className="text-break">{allOrders[0].customer.name}</p>
              {/* @ts-ignore */}
              <p className="text-break">{allOrders[0].customer.email}</p>
            </div>
          </aside>
          <main>
            <h4>Total Rating</h4>
            {average === 5 && <div>⭐⭐⭐⭐⭐</div>}
            {average === 4 && <div>⭐⭐⭐⭐</div>}
            {average === 3 && <div>⭐⭐⭐</div>}
            {average === 2 && <div>⭐⭐</div>}
            {average === 1 && <div>⭐</div>}
          </main>
          <footer>
            <table>
              <thead>
                <tr>
                  <th colSpan={3}></th>
                </tr>
                <tr>
                  <th className="cakeType">Cake type</th>
                  <th className="cakeSize">Size</th>
                  <th className="cakeStatus">Status</th>
                  <th className="cakeRating">Rating</th>
                </tr>
              </thead>
              <tbody>
                {allOrders.map((allOrder: any, index: any) => (
                  <tr key={index}>
                    <td className="cakeType">{allOrder.type}</td>
                    <td className="cakeSize">{allOrder.size}</td>
                    {allOrder.status === "processing" && (
                      <td
                        className="cakeStatus"
                        style={{ background: "lightblue", padding: "2px" }}
                      >
                        Pending
                      </td>
                    )}
                    {allOrder.status === "accepted" && (
                      <td
                        className="cakeStatus"
                        style={{ background: "yellow", padding: "2px" }}
                      >
                        Working
                      </td>
                    )}
                    {allOrder.isDone === false &&
                      allOrder.status === "pickup" && (
                        <td
                          className="cakeStatus"
                          style={{ background: "orange", padding: "2px" }}
                        >
                          Pick up
                        </td>
                      )}
                    {allOrder.status === "decline" && (
                      <td
                        className="cakeStatus"
                        style={{ background: "red", padding: "2px" }}
                      >
                        Declined
                      </td>
                    )}
                    {allOrder.isDone === true &&
                      allOrder.status === "pickup" && (
                        <td
                          className="cakeStatus"
                          style={{ background: "green", padding: "2px" }}
                        >
                          Done
                        </td>
                      )}
                    {!allOrder.feedback && <td className="cakeRating">None</td>}
                    {allOrder.feedback && (
                      <>
                        {allOrder.feedback.rating === 5 && (
                          <td className="cakeRating">⭐⭐⭐⭐⭐</td>
                        )}
                        {allOrder.feedback.rating === 4 && (
                          <td className="cakeRating">⭐⭐⭐⭐</td>
                        )}
                        {allOrder.feedback.rating === 3 && (
                          <td className="cakeRating">⭐⭐⭐</td>
                        )}
                        {allOrder.feedback.rating === 2 && (
                          <td className="cakeRating">⭐⭐</td>
                        )}
                        {allOrder.feedback.rating === 1 && (
                          <td className="cakeRating">⭐</td>
                        )}
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </footer>
        </div>
      )}

      {allOrders.length === 0 && (
        <>
          <div>
            <label>Search name or email: </label>
            <input
              type="text"
              placeholder="small leter only"
              onChange={(e) => {
                setSearch(e.target.value.toLowerCase());
              }}
              value={search}
            />
          </div>
          <div className="customers">
            <table>
              <thead>
                <tr>
                  <th className="index">
                    <b>ID</b>
                  </th>
                  <th className="name">
                    <b>Name</b>
                  </th>
                  <th className="email">
                    <b>Email</b>
                  </th>
                  <th className="pending">
                    <b>Number</b>
                  </th>
                  <th className="action">
                    <b>Action</b>
                  </th>
                </tr>
              </thead>
              <tbody>
                {buyers
                  .filter(
                    (buyer: any) =>
                      buyer.name.toLowerCase().includes(search) ||
                      buyer.email.toLowerCase().includes(search)
                  )
                  .map((buyer: any, index) => (
                    <>
                      <tr key={index} className="trbody">
                        <td className="index">
                          <span>{index}</span>
                        </td>
                        <td className="name">
                          <span>
                            <img src={images} alt="avatar" />{" "}
                            <span
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {buyer.name}
                            </span>
                          </span>
                        </td>
                        <td className="email">
                          <span>{buyer.email}</span>
                        </td>
                        <td className="pending">
                          <span>{buyer.phone}</span>
                        </td>
                        <td className="action">
                          {buyer.orders.length > 0 && (
                            <button
                              className="btn btn-outline-warning"
                              onClick={() => {
                                handleSubmit(buyer.orders);
                              }}
                            >
                              View profile
                            </button>
                          )}
                          {buyer.orders.length === 0 && (
                            <button className="btn btn-warning" disabled>
                              No orders yet
                            </button>
                          )}
                        </td>
                      </tr>
                    </>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Customer;
