import axios from "axios";
import { set } from "mongoose";
import { useEffect, useState } from "react";

const Request = () => {
  const [orders, setOrders] = useState([]);
  const [pic, setPic] = useState("");
  const [popup, setPopUp] = useState(false);

  useEffect(() => {
    axios.get("https://baked-goodies-api.vercel.app/order").then((res) => {
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
          <p
            onClick={() => {
              setPopUp(false);
            }}
          >
            Close
          </p>
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
                  <p>Flavor:</p>
                  <p>{order.flavor}</p>
                </div>
                <div className="shape">
                  <p>Shape: </p>
                  <p>{order.shape}</p>
                </div>
              </div>

              <div className="dates">
                <div className="orderDate">
                  <p>Order Date: {order.orderDate}</p>
                </div>
                <div className="promiseDate">
                  <p>Deadline: {order.promiseDate}</p>
                </div>
              </div>
              <div className="description">
                <p>
                  Description: <i>{order.orderDetails}</i>
                </p>
              </div>
              <div className="comment">
                <textarea placeholder="Comment" cols={50} rows={9}></textarea>
              </div>
              <div className="settle">
                <div className="payment">
                  <p>Payment: {order.payment}</p>
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
