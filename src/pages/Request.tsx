import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BakedGoodies from "../components/BakedGoodies";
import Modal from "react-bootstrap/Modal";

const Request = () => {
  localStorage.setItem("route", "request");
  // order request from customer
  const [orders, setOrders] = useState([]);
  const [arrayItem, setArrayItem] = useState(false);

  // image pop up when client click the image
  const [pic, setPic] = useState("");

  //personal info of customer and pop up animation
  const [personal, setPersonal] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Final decision
  const [id, setId] = useState("");
  const [acceptPop, toggleAcceptPop] = useState(false);
  const [declinePop, toggleDeclinePop] = useState(false);
  const [comment, setComment] = useState("");

  const [pleaseWait, togglePleaseWait] = useState(false);

  const changeStatus = () => {
    togglePleaseWait(true);
    const newStatus = { status: "accepted" };
    axios.put(
      `https://baked-goodies.vercel.app/api/order/server/${id}`,
      newStatus
    );

    toast.success("Suceess", {
      position: "top-right",
      autoClose: false,
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
  };

  useEffect(() => {
    axios
      .get("https://baked-goodies.vercel.app/api/order?status=processing")
      .then((res) => {
        setOrders(res.data);
      });
  }, []);

  const declineReq = (e: any) => {
    e.preventDefault();
    togglePleaseWait(true);
    const newStatus = {
      status: "decline",
      comment: comment,
    };
    axios.put(
      `https://baked-goodies.vercel.app/api/order/server/${id}`,
      newStatus
    );

    toast.success("Suceess", {
      position: "top-right",
      autoClose: false,
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
  };

  setTimeout(() => {
    if (orders.length === 0) {
      setArrayItem(true);
    }
  }, 10000);

  return (
    <>
      <BakedGoodies />
      <div className="Pages1">
        <header>
          <h1>Request</h1>
        </header>
        <Modal show={pleaseWait}>
          <Modal.Body>Please wait processing...</Modal.Body>
        </Modal>
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
            <h2> No data found or low connection, try to again later</h2>
          </div>
        )}

        {personal.name !== "" && (
          <div className="personalPop">
            <div className="container">
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => {
                  setPersonal({
                    name: "",
                    email: "",
                    phone: "",
                  });
                  window.history.back();
                  console.log("nc");
                }}
              />
              <div className="profile">
                <FontAwesomeIcon icon={faUser} className="icon" />
              </div>
              <div className="name">
                <b>Name: {personal.name}</b>
              </div>
              <div className="email">
                <b>Email: {personal.email}</b>
              </div>
            </div>
          </div>
        )}
        {pic !== "" && (
          <div className="pop">
            <button
              type="button"
              className="btn-close bg-danger"
              aria-label="Close"
              onClick={() => {
                setPic("");
              }}
            ></button>
            <img src={pic} alt="pic" />
          </div>
        )}

        {acceptPop && (
          <div className="finalDecision">
            <div>
              <p>Are you sure</p>
              <button className="btn btn-success" onClick={changeStatus}>
                Yes
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setId("");
                  toggleAcceptPop(false);
                  window.history.back();
                }}
              >
                No
              </button>
            </div>
          </div>
        )}

        {declinePop && (
          <form className="declineBox" onSubmit={declineReq}>
            <div className="declineCon">
              <textarea
                cols={30}
                rows={10}
                placeholder="Reason"
                required
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              ></textarea>
              <div>
                <button className="btn btn-success">Confirm</button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    setId("");
                    toggleDeclinePop(false);
                    setComment("");
                    window.history.back();
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}

        {orders.length > 0 && (
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
                      }}
                    />
                    <h2>{order.type}</h2>
                  </div>
                  <div className="details">
                    <div className="flavor">
                      <b>Flavor: {order.flavor}</b>
                    </div>
                    <div className="shape">
                      <b>Shape: {order.shape}</b>
                    </div>
                    <div>
                      <b>Size: {order.size.replace(/^(.*)₱(.).*/, "$1")}</b>
                    </div>
                  </div>
                  <div className="details">
                    <div className="flavor">
                      {order.upgrades.length > 0 && (
                        <b>
                          Upgrades:{" "}
                          {order.upgrades.map((upgrade: any) => (
                            <>{upgrade.replace(/^(.*)₱(.).*/, "$1")}</>
                          ))}
                        </b>
                      )}
                    </div>
                    <div className="shape">
                      {order.addons.length > 0 && (
                        <b>
                          Addons:{" "}
                          {order.addons.map((addon: any) => (
                            <>{addon.replace(/^(.*)₱(.).*/, "$1")}</>
                          ))}
                        </b>
                      )}
                    </div>
                  </div>

                  <div className="dates">
                    <div className="orderDate">
                      <b>
                        Order Date:{" "}
                        {new Date(order.orderDate).toLocaleDateString()}
                      </b>
                    </div>
                    <div className="promiseDate">
                      <b>
                        Deadline:{" "}
                        {new Date(order.promiseDate).toLocaleDateString()}
                      </b>
                    </div>
                  </div>

                  <div className="settle">
                    <div className="decision">
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          setId(order._id);
                          toggleAcceptPop(true);
                          window.history.pushState(null, "", "?q=Accept");
                        }}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          setId(order._id);
                          toggleDeclinePop(!declinePop);
                          window.history.pushState(null, "", "?q=Decline");
                        }}
                      >
                        Decline
                      </button>
                    </div>
                    <div className="personalInfo">
                      <FontAwesomeIcon
                        icon={faUser}
                        onClick={() => {
                          setPersonal({
                            name: order.customer.name,
                            email: order.customer.email,
                            phone: order.customer.phone,
                          });
                          window.history.pushState(
                            null,
                            "",
                            "?q=Personal Info"
                          );
                        }}
                        className="icon"
                      />
                    </div>
                  </div>
                  <details className="styled">
                    <summary>
                      <b>More info</b>{" "}
                    </summary>
                    <div className="description">
                      <p>
                        <b>Dedication:</b> {order.dedication}
                      </p>

                      <p>
                        <b>Description:</b> {order.orderDetails}
                      </p>

                      <p>
                        <b>Payment:</b> {order.payment}
                      </p>

                      {order.isRush === false && (
                        <p>
                          <b>Rush: </b>No
                        </p>
                      )}
                      {order.isRush === true && (
                        <p>
                          <b>Rush: </b>Yes
                        </p>
                      )}
                    </div>
                  </details>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Request;
