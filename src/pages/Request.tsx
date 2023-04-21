import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Request = () => {
  const [orders, setOrders] = useState([]);
  const [pic, setPic] = useState("");
  const [popup, setPopUp] = useState(false);
  const [personal, setPersonal] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [personalPop, setPersonalPop] = useState(false);
  const [final, setFinal] = useState(false);
  const [id, setId] = useState("");
  const [price, setPrice] = useState(Number);

  const status = {
    status: "paying",
    price: price,
  };

  function changeStatus() {
    if (price <= 0) {
      toast.error("Input price", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      axios
        .put(`https://baked-goodies-api.vercel.app/api/order/${id}`, status)
        .then((res) => {
          console.log(res.data);
        });
      toast.success("Suceess", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  useEffect(() => {
    axios
      .get("https://baked-goodies-api.vercel.app/api/order?status=processing")
      .then((res) => {
        setOrders(res.data);
      });
  }, []);

  return (
    <div className="Pages1">
      <ToastContainer />
      <header>
        <h1>Request</h1>
      </header>
      {personalPop && (
        <div className="personalPop">
          <div className="container">
            <span
              className="close"
              onClick={() => {
                setPersonalPop(false);
              }}
            >
              Close
            </span>
            <div className="profile">
              <FontAwesomeIcon icon={faUser} className="icon" />
            </div>
            <div className="name">
              {" "}
              <p>Name: {personal.name}</p>
            </div>
            <div className="email">
              {" "}
              <p>Email: {personal.email}</p>
            </div>
            <div className="phone">
              <p>Phone: {personal.phone}</p>{" "}
            </div>
          </div>
        </div>
      )}
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
                <input
                  type="number"
                  placeholder="Type 30% of the price"
                  onChange={(e: any) => {
                    setPrice(e.target.value);
                    console.log(e.target.value);
                  }}
                />
              </div>

              <div className="settle">
                <div className="payment">
                  <b>
                    Payment: <div>{order.payment}</div>
                  </b>
                </div>
                <div className="decision">
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      setId(order._id);
                      setFinal(true);
                    }}
                  >
                    Accept
                  </button>
                  <button className="btn btn-danger">Decline</button>
                </div>
              </div>
              <div className="personalInfo">
                <FontAwesomeIcon
                  icon={faUser}
                  onClick={() => {
                    setPersonalPop(true);
                    setPersonal({
                      name: order.customer.name,
                      email: order.customer.email,
                      phone: order.customer.phone,
                    });
                  }}
                  className="icon"
                />
              </div>

              {final && (
                <p>
                  Are you sure
                  <button className="btn btn-success" onClick={changeStatus}>
                    Yes
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setFinal(false);
                    }}
                  >
                    No
                  </button>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Request;
