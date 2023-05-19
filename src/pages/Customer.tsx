import axios from "axios";
import { useEffect, useState } from "react";

import { faStar as thinStar } from "@fortawesome/free-regular-svg-icons";
import {
  faStarHalfStroke,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Customer = () => {
  localStorage.setItem("route", "customer");
  let images = "th.jpg";
  const [buyers, setBuyers] = useState([]);
  const [search, setSearch] = useState("");
  const [allOrders, setAllOrders] = useState([]);
  const [average, setAverage] = useState(0);
  const [total, setTotal] = useState([]);

  useEffect(() => {
    axios
      .get("https://baked-goodies-api.vercel.app/api/customer/list")
      .then((res) => {
        setBuyers(res.data);
      });
  }, []);

  const allSum = (add: any) => {
    setAverage((old) => old + add);
    //@ts-ignore
    setTotal((prev) => {
      return [...prev, add];
    });
  };

  const handleSubmit = (data: any) => {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      axios
        .get(`https://baked-goodies-api.vercel.app/api/order?_id=${element}`)
        .then((res) => {
          //@ts-ignore
          setAllOrders((ordering) => {
            return [...ordering, res.data[0]];
          });

          if (res.data[0].isDone === true) {
            allSum(res.data[0].feedback.rating);
          }
        });
    }
  };

  return (
    <div className="Pages4">
      {allOrders.length > 0 && (
        <div className="individual">
          <aside>
            <button
              onClick={() => {
                setAllOrders([]);
                setTotal([]);
                setAverage(0);
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
            {average === 0 && <h4>Total Rating - 0 star</h4>}
            {average !== 0 && (
              <h4>Total Rating - {average / total.length} star</h4>
            )}

            <div>
              {average / total.length <= 5 && average / total.length > 4 && (
                <>
                  <FontAwesomeIcon icon={solidStar} className="star" />
                  <FontAwesomeIcon icon={solidStar} className="star" />
                  <FontAwesomeIcon icon={solidStar} className="star" />
                  <FontAwesomeIcon icon={solidStar} className="star" />
                  {average / total.length === 5 && (
                    <FontAwesomeIcon icon={solidStar} className="star" />
                  )}
                  {average / total.length <= 4.99 &&
                    average / total.length >= 4.5 && (
                      <FontAwesomeIcon
                        icon={faStarHalfStroke}
                        className="star"
                      />
                    )}
                  {average / total.length <= 4.49 &&
                    average / total.length >= 4 && (
                      <FontAwesomeIcon icon={thinStar} className="star" />
                    )}
                </>
              )}
              {average / total.length <= 4 && average / total.length > 3 && (
                <>
                  <FontAwesomeIcon icon={solidStar} className="star" />
                  <FontAwesomeIcon icon={solidStar} className="star" />
                  <FontAwesomeIcon icon={solidStar} className="star" />
                  {average / total.length === 4 && (
                    <FontAwesomeIcon icon={solidStar} className="star" />
                  )}
                  {average / total.length <= 3.99 &&
                    average / total.length >= 3.5 && (
                      <FontAwesomeIcon
                        icon={faStarHalfStroke}
                        className="star"
                      />
                    )}
                  {average / total.length <= 3.49 &&
                    average / total.length >= 3 && (
                      <FontAwesomeIcon icon={thinStar} className="star" />
                    )}
                  <FontAwesomeIcon icon={thinStar} className="star" />
                </>
              )}
              {average / total.length <= 3 && average / total.length > 2 && (
                <>
                  <FontAwesomeIcon icon={solidStar} className="star" />
                  <FontAwesomeIcon icon={solidStar} className="star" />
                  {average / total.length === 3 && (
                    <FontAwesomeIcon icon={solidStar} className="star" />
                  )}
                  {average / total.length <= 2.99 &&
                    average / total.length >= 2.5 && (
                      <FontAwesomeIcon
                        icon={faStarHalfStroke}
                        className="star"
                      />
                    )}
                  {average / total.length <= 2.49 &&
                    average / total.length >= 2 && (
                      <FontAwesomeIcon icon={thinStar} className="star" />
                    )}

                  <FontAwesomeIcon icon={thinStar} className="star" />
                  <FontAwesomeIcon icon={thinStar} className="star" />
                </>
              )}
              {average / total.length <= 2 && average / total.length > 1.1 && (
                <>
                  <FontAwesomeIcon icon={solidStar} className="star" />
                  {average / total.length === 2 && (
                    <FontAwesomeIcon icon={solidStar} className="star" />
                  )}
                  {average / total.length <= 1.99 &&
                    average / total.length >= 1.5 && (
                      <FontAwesomeIcon
                        icon={faStarHalfStroke}
                        className="star"
                      />
                    )}
                  {average / total.length <= 1.49 &&
                    average / total.length >= 1 && (
                      <FontAwesomeIcon icon={thinStar} className="star" />
                    )}
                  <FontAwesomeIcon icon={thinStar} className="star" />
                  <FontAwesomeIcon icon={thinStar} className="star" />
                  <FontAwesomeIcon icon={thinStar} className="star" />
                </>
              )}
              {average / total.length <= 1 && average / total.length > 0 && (
                <>
                  {average / total.length === 1 && (
                    <FontAwesomeIcon icon={solidStar} className="star" />
                  )}
                  {average / total.length <= 0.99 &&
                    average / total.length >= 0.5 && (
                      <FontAwesomeIcon
                        icon={faStarHalfStroke}
                        className="star"
                      />
                    )}
                  <FontAwesomeIcon icon={thinStar} className="star" />
                  <FontAwesomeIcon icon={thinStar} className="star" />
                  <FontAwesomeIcon icon={thinStar} className="star" />
                  <FontAwesomeIcon icon={thinStar} className="star" />
                </>
              )}
              {average === 0 && (
                <>
                  <FontAwesomeIcon icon={thinStar} className="star" />
                  <FontAwesomeIcon icon={thinStar} className="star" />
                  <FontAwesomeIcon icon={thinStar} className="star" />
                  <FontAwesomeIcon icon={thinStar} className="star" />
                  <FontAwesomeIcon icon={thinStar} className="star" />
                </>
              )}
            </div>
          </main>
          <footer>
            <table>
              <thead>
                <tr>
                  <th colSpan={3}></th>
                </tr>
                <tr>
                  <th className="orderID">Id</th>
                  <th className="cakeType">Cake type</th>
                  <th className="cakeSize">Size</th>
                  <th className="cakeStatus">Status</th>
                  <th className="cakeRating">Rating</th>
                </tr>
              </thead>
              <tbody>
                {allOrders.map((allOrder: any, index: any) => (
                  <tr key={index}>
                    <td className="orderID">{allOrder._id}</td>
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
                      allOrder.status === "getCake" && (
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
