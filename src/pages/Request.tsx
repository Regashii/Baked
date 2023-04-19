import axios from "axios";
import { set } from "mongoose";
import { useEffect, useState } from "react";

const Request = () => {
  const [orders, setOrders] = useState([]);
  const [pic, setPic] = useState("");
  const [popup, setPopUp] = useState(false);

  useEffect(() => {
    axios
      .get("https://baked-goodies-api.vercel.app/api/order?status=processing")
      .then((res) => {
        setOrders(res.data);
      });
  }, []);

  return (
    <div className="Pages1">
      <header>
        <h1>Request</h1>
      </header>
      {popup && (
        <div className="pop">
          <b
            onClick={() => {
              setPopUp(false);
            }}
          >
            Close
          </b>
          <img src={pic} alt="pic" />
        </div>
      )}

      <div className="body">
        {orders.map((order: any, index) => {
          return (
            <div className="order" key={index}>
              <div className="png">
                <img
                  src={order.images}
                  alt="Cake"
                  onClick={() => {
                    setPic(order.images);
                    setPopUp(true);
                  }}
                />
              </div>
              <div className="details">
                <div className="flavor">
                  <b>Flavor: {order.flavor}</b>
                </div>
                <div className="shape">
                  <b>Shape: {order.shape}</b>
                </div>
              </div>

              <div className="dates">
                <div className="orderDate">
                  <b>Order Date: {order.orderDate}</b>
                </div>
                <div className="promiseDate">
                  <b>Deadline: {order.promiseDate}</b>
                </div>
              </div>
              <div className="description">
                <b>
                  Description: <i>{order.orderDetails}</i>
                </b>
              </div>
              <div className="price">
                <b>Price: </b>
                <input type="text" placeholder="Type 30% of the price" />
              </div>

              <div className="settle">
                <div className="payment">
                  <b>
                    Payment: <div>{order.payment}</div>
                  </b>
                </div>
                <div className="decision">
                  <button className="btn btn-success">Accept</button>
                  <button className="btn btn-danger">Decline</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Request;
