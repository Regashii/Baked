import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Request = () => {
  const navigate = useNavigate();
  // order request from customer
  const [orders, setOrders] = useState([]);

  // image pop up when client click the image
  const [pic, setPic] = useState("");
  const [popup, togglePopUp] = useState(false);

  //personal info of customer and pop up animation
  const [personal, setPersonal] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [personalPop, togglePersonalPop] = useState(false);

  // Final decision
  const [final, setFinal] = useState(false);
  const [id, setId] = useState("");
  const [declinePop, toggleDeclinePop] = useState(false);

  // input price
  const [price, setPrice] = useState(Number);

  const status = {
    status: "paying",
    price: price,
  };

  function changeStatus() {
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
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  useEffect(() => {
    axios
      .get("https://baked-goodies-api.vercel.app/api/order?status=processing")
      .then((res) => {
        setOrders(res.data);
      });
  }, []);

  function declineReq() {
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
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

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
                togglePersonalPop(false);
              }}
            >
              Close
            </span>
            <div className="profile">
              <FontAwesomeIcon icon={faUser} className="icon" />
            </div>
            <div className="name">
              {" "}
              <b>Name: {personal.name}</b>
            </div>
            <div className="email">
              {" "}
              <b>Email: {personal.email}</b>
            </div>
            <div className="phone">
              <b>Phone: {personal.phone}</b>{" "}
            </div>
          </div>
        </div>
      )}
      {popup && (
        <div className="pop">
          <b
            onClick={() => {
              togglePopUp(false);
            }}
          >
            Close
          </b>
          <img src={pic} alt="pic" />
        </div>
      )}

      {final && (
        <div className="finalDecision">
          <div>
            <p>Are you sure</p>
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
          </div>
        </div>
      )}

      {declinePop && (
        <div className="declineBox">
          <div className="declineCon">
            <textarea cols={30} rows={10} placeholder="Reason"></textarea>
            <div>
              <button className="btn btn-success" onClick={declineReq}>
                Confirm
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  toggleDeclinePop(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
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
                    togglePopUp(true);
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
                  }}
                />
              </div>

              <div className="settle">
                <div className="payment">
                  <b>Payment:</b>
                  <div className="payType">{order.payment}</div>
                </div>
                <div className="decision">
                  <button
                    className="btn btn-success"
                    onClick={() => {
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
                        setId(order._id);
                        setFinal(true);
                      }
                    }}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      toggleDeclinePop(!declinePop);
                    }}
                  >
                    Decline
                  </button>
                </div>
              </div>
              <div className="personalInfo">
                <FontAwesomeIcon
                  icon={faUser}
                  onClick={() => {
                    togglePersonalPop(true);
                    setPersonal({
                      name: order.customer.name,
                      email: order.customer.email,
                      phone: order.customer.phone,
                    });
                  }}
                  className="icon"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Request;
