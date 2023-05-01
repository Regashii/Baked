import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Ongoing = () => {
  const res = window.localStorage.getItem("token");

  const [orders, setOrders] = useState([]);
  const [pic, setPic] = useState("");
  const [popup, setPopUp] = useState(false);

  useEffect(() => {
    axios
      .get("https://baked-goodies-api.vercel.app/api/order?status=paid")
      .then((res) => {
        setOrders(res.data);
      });
  }, []);
  return (
    <div className="Pages2">
      <header>
        <h1>Ongoing</h1>
      </header>

      <div className="process">
        {orders.map((order: any, index) => (
          <div className="num">
            <div className="index">
              <p>Request number: {index + 1} </p>
              <p>Name: {order.customer.name}</p>
              <p>Email: {order.customer.email}</p>
              <p>Phone: {order.customer.phone}</p>
              <div className="spinner">
                <span>P</span>
                <span>R</span>
                <span>O</span>
                <span>C</span>
                <span>E</span>
                <span>S</span>
                <span>S</span>
                <span>I</span>
                <span>N</span>
                <span>G</span>
              </div>
              <button className="btn btn-primary">Ready to pickup</button>
              <details>
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

                  <div className="settle">
                    <div className="payment">
                      <b>
                        Payment: <div>{order.payment}</div>
                      </b>
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ongoing;
