import axios from "axios";
import { useEffect, useState } from "react";

const Ongoing = () => {
  const [orders, setOrders] = useState([]);
  const [pic, setPic] = useState("");
  const [popup, setPopUp] = useState(false);

  useEffect(() => {
    axios
      .get("https://baked-goodies-api.vercel.app/order?isProcessed=true")
      .then((res) => {
        setOrders(res.data);
      });
  }, []);
  return (
    <div className="Pages2">
      <h1>Ongoing</h1>
      <div className="process">
        {orders.map((order: any, index) => (
          <div className="num">
            <p>Request number: {index + 1}</p>
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
                <input type="text" placeholder="half price/50%" />
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ongoing;
