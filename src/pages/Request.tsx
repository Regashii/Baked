import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Request = () => {
  // order request from customer
  const [orders, setOrders] = useState([]);
  const [arrayItem, setArrayItem] = useState(false);

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

  const status = {
    status: "paid",
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

  setTimeout(() => {
    if (orders.length === 0) {
      setArrayItem(true);
    }
  }, 5000);

  return (
    <div className="Pages1">
      <header>
        <h1>Request</h1>
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

      {personalPop && (
        <div className="personalPop">
          <div className="container">
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => {
                togglePersonalPop(false);
              }}
            />
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
          <button
            type="button"
            className="btn-close bg-danger"
            aria-label="Close"
            onClick={() => {
              togglePopUp(false);
            }}
          ></button>
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

              <div className="settle">
                <div className="payment">
                  <b>Payment:</b>
                  <div className="payType">{order.payment}</div>
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
