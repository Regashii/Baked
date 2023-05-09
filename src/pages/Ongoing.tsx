import axios from "axios";
import { useEffect, useState } from "react";
import "../pagescss/Ongoing.css";
import { useNavigate } from "react-router-dom";

const Ongoing = () => {
  localStorage.setItem("route", "onGoing");
  const endDate = new Date();
  const navigate = useNavigate();
  const [personal, setPersonal] = useState({
    name: "",
    email: "",
    flavor: "",
    shape: "",
    type: "",
    size: "",
    orderDate: "",
    id: "",
    finish: "",
  });

  const [price, setPrice] = useState(0);
  const [img, setImg] = useState("");

  function handleImage(e: any) {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      // @ts-ignore
      setImg(reader.result);
    };

    reader.onerror = (error) => {
      console.log("error: ", error);
    };
  }
  //@ts-ignore
  const detailsOrder = JSON.parse(localStorage.getItem("items"));
  if (personal.name !== "") {
    localStorage.setItem("items", JSON.stringify(personal));
  }

  const [orders, setOrders] = useState([]);
  const [pickUp, setPickUP] = useState([]);
  const [pic, setPic] = useState("");
  const [arrayItem, setArrayItem] = useState(false);

  useEffect(() => {
    axios
      .get(`https://baked-goodies-api.vercel.app/api/order?status=accepted`)
      .then((res) => {
        setOrders(res.data);
      });

    axios
      .get(`https://baked-goodies-api.vercel.app/api/order?status=pickup`)
      .then((response) => {
        setPickUP(response.data);
      });
  }, []);

  setTimeout(() => {
    if (orders.length === 0 && pickUp.length === 0) {
      setArrayItem(true);
    }
  }, 10000);
  const submitInfo = (e: any) => {
    e.preventDefault();
    let information = {
      price: price,
      img: img,
    };

    localStorage.setItem("info", JSON.stringify(information));
    navigate("/finish-product");
  };

  return (
    <div className="Pages2">
      <header>
        <h1>Ongoing</h1>
      </header>

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

      {detailsOrder && (
        <div className="detalsOrder">
          <form onSubmit={submitInfo}>
            <label>Email: {detailsOrder.email} </label>
            <br />
            <br />
            <label>Picture of Cake: </label>
            <div>
              <input
                type="file"
                required
                accept="image/*"
                onChange={handleImage}
              />

              <img
                src={img}
                alt="cake"
                className="uploadPic"
                onClick={() => setPic(img)}
              />
            </div>
            <br />
            <label>Price: </label>
            <input
              type="number"
              placeholder="Price for Cake"
              required
              onChange={(e) => {
                setPrice(e.target.valueAsNumber);
              }}
            />
            <br />
            <br />

            <button className="btn btn-success">confirm</button>

            <button
              className="btn btn-danger"
              onClick={() => {
                localStorage.removeItem("items");
                localStorage.removeItem("info");
                setPersonal({
                  name: "",
                  email: "",
                  flavor: "",
                  shape: "",
                  type: "",
                  size: "",
                  orderDate: "",
                  id: "",
                  finish: "",
                });
                setImg("");
              }}
            >
              cancel
            </button>
          </form>
        </div>
      )}

      {orders.length === 0 && pickUp.length === 0 && arrayItem === false && (
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

      {orders.length === 0 && pickUp.length === 0 && arrayItem === true && (
        <div className="errorPage">
          <img src="idk.png" alt="idk" width={100} />
          <h2> No data found or low connection</h2>
        </div>
      )}

      {orders.length > 0 && (
        <>
          <h1>Cake still Processing</h1>
          <div className="process">
            {orders.map((order: any, index) => (
              <div className="num" key={index}>
                {order.customer !== null && (
                  <div className="index">
                    <h3>Request </h3>

                    <p>Name: {order.customer.name}</p>
                    <p>Email: {order.customer.email}</p>

                    <div className="loader">
                      <span className="hour"></span>
                      <span className="min"></span>
                      <span className="circel"></span>
                    </div>

                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setPersonal({
                          name: order.customer.name,
                          email: order.customer.email,
                          flavor: order.flavor,
                          shape: order.shape,
                          type: order.type,
                          size: order.size,
                          orderDate: order.orderDate,
                          id: order._id,
                          finish: `${endDate.getDate()}/${
                            endDate.getMonth() + 1
                          }/${endDate.getFullYear()}`,
                        });
                      }}
                    >
                      Ready to pickup
                    </button>
                    <details>
                      <div className="order" key={index}>
                        <div className="png">
                          <img
                            src={order.images}
                            alt="Cake"
                            onClick={() => {
                              setPic(order.images);
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
                      </div>
                    </details>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {pickUp.length > 0 && (
        <>
          <h1>Waiting for cake to pick up</h1>
          <div className="process">
            {pickUp.map((pick: any, index) => (
              <div className="num" key={index}>
                {pick.status === "pickup" && pick.isDone === false && (
                  <div className="index">
                    <h4>Waiting </h4>
                    <p>Name: {pick.customer.name}</p>
                    <p>Email: {pick.customer.email}</p>

                    <button className="btn btn-primary">
                      Customer get the cake
                    </button>
                    <details>
                      <div className="order" key={index}>
                        <div className="png">
                          <img
                            src={pick.images}
                            alt="Cake"
                            onClick={() => {
                              setPic(pick.images);
                            }}
                          />
                        </div>
                        <div className="details">
                          <div className="flavor">
                            <b>Flavor: {pick.flavor}</b>
                          </div>
                          <div className="shape">
                            <b>Shape: {pick.shape}</b>
                          </div>
                        </div>

                        <div className="dates">
                          <div className="orderDate">
                            <b>Order Date: {pick.orderDate}</b>
                          </div>
                        </div>
                      </div>
                    </details>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Ongoing;
