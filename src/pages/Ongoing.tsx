import axios from "axios";
import { useEffect, useState } from "react";

const Ongoing = () => {
  const res = window.localStorage.getItem("token");

  const [orders, setOrders] = useState([]);
  const [pic, setPic] = useState("");
  const [popup, setPopUp] = useState(false);
  const [arrayItem, setArrayItem] = useState(false);

  useEffect(() => {
    axios
      .get("https://baked-goodies-api.vercel.app/api/order?status=paid")
      .then((res) => {
        setOrders(res.data);
      });
  }, []);

  setTimeout(() => {
    if (orders.length === 0) {
      setArrayItem(true);
    }
  }, 5000);
  return (
    <div className="Pages2">
      <header>
        <h1>Ongoing</h1>
      </header>
      {orders.length === 0 && arrayItem === false && (
        <div className="loadingPage">
          <div
            aria-label="Orange and tan hamster running in a metal wheel"
            role="img"
            className="wheel-and-hamster"
          >
            <div className="wheel"></div>
            <div className="hamster">
              <div className="hamster__body">
                <div className="hamster__head">
                  <div className="hamster__ear"></div>
                  <div className="hamster__eye"></div>
                  <div className="hamster__nose"></div>
                </div>
                <div className="hamster__limb hamster__limb--fr"></div>
                <div className="hamster__limb hamster__limb--fl"></div>
                <div className="hamster__limb hamster__limb--br"></div>
                <div className="hamster__limb hamster__limb--bl"></div>
                <div className="hamster__tail"></div>
              </div>
            </div>
            <div className="spoke"></div>
          </div>
          <div>
            <h2>LOADING</h2>
          </div>
        </div>
      )}

      {orders.length === 0 && arrayItem === true && (
        <div className="errorPage">
          <img src="idk.png" alt="idk" width={100} />
          <h2> No data found or low connection</h2>
        </div>
      )}

      <div className="process">
        {orders.map((order: any, index) => (
          <div className="num" key={index}>
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
