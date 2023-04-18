import axios from "axios";
import { useEffect, useState } from "react";

const Request = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("https://baked-goodies-api.vercel.app/order").then((res) => {
      for (const order of res.data) {
        if (order.isProcessed === false) {
          orders.push(order);
        }
        console.log("heloo");
      }
    });
  }, []);

  function click() {
    console.log(orders);
  }

  return (
    <div className="Pages1">
      <header>
        <button onClick={click}>Refresh</button>
        <h1>Request</h1>
      </header>
      <div className="body">
        {orders.map((order: any, index) => {
          return (
            <div className="order" key={index}>
              <div className="png">
                <img src={order.images} alt="Cake" />
              </div>
              <div className="details">
                <div className="flavor">
                  <p>Flavor: {order.flavor}</p>
                </div>
                <div className="shape">
                  <p>Shape: {order.shape}</p>
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
                <p>Description: {order.orderDetails}</p>
              </div>
              <div className="comment">
                <textarea placeholder="Comment" cols={65} rows={2}></textarea>
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
