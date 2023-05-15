import axios from "axios";
import { useEffect, useState } from "react";

const Ongoing = () => {
  localStorage.setItem("route", "onGoing");
  // const endDate = new Date();

  const [personal, setPersonal] = useState({
    email: "",
    payment: "",
    id: "",
  });

  // const [price, setPrice] = useState(0);
  const [img, setImg] = useState("");
  const [gcash, setGcash] = useState("");

  const [reload, toggleReload] = useState(false);
  const [upload, toggleSending] = useState(false);
  const [sending, toggleUpload] = useState(false);

  if (upload && sending) {
    window.location.reload();
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
      .get(
        `https://baked-goodies-api.vercel.app/api/order?status=pickup&&isDone=false`
      )
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

    toggleReload(true);
    const formData = new FormData();
    const formImg = new FormData();

    formData.append("image", img);
    formImg.append("imageUpload", img);

    if (personal.payment === "Gcash") {
      formData.append("image", gcash);
    }
    formData.append("gmail", personal.email);
    formData.append("payment", personal.payment);

    axios
      .post("https://new-back-rho.vercel.app/sender", formData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toggleSending(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post("https://baked-goodies.vercel.app/api/upload", formImg)
      .then((res) => {
        axios
          .put(
            `https://baked-goodies.vercel.app/api/order/server/${personal.id}`,
            { endImage: res.data[0], status: "pickup" }
          )
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              toggleUpload(true);
            }
          });
      });
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

      {personal.payment !== "" && (
        <div className="detalsOrder">
          <form onSubmit={submitInfo}>
            <label>Picture of Cake: </label>
            <div>
              <input
                type="file"
                required
                accept="image/*"
                onChange={(e) => {
                  //@ts-ignore
                  setImg(e.target.files[0]);
                }}
              />

              {img && (
                <img
                  //@ts-ignore
                  src={URL.createObjectURL(img)}
                  alt="cake"
                  className="uploadPic"
                  //@ts-ignore
                  onClick={() => setPic(URL.createObjectURL(img))}
                />
              )}
            </div>
            <br />
            <label>payment: </label>
            {personal.payment.toLocaleLowerCase() === "cash on pickup" && (
              <input type="number" placeholder="Price" />
            )}
            {personal.payment === "Gcash" && (
              <>
                <br />
                <input
                  type="file"
                  required
                  accept="image/*"
                  onChange={(e) => {
                    //@ts-ignore
                    setGcash(e.target.files[0]);
                  }}
                />

                {gcash && (
                  <img
                    //@ts-ignore
                    src={URL.createObjectURL(gcash)}
                    alt="gcash"
                    className="uploadPic"
                    //@ts-ignore
                    onClick={() => setPic(URL.createObjectURL(gcash))}
                  />
                )}
              </>
            )}

            <br />
            <br />

            <button className="btn btn-success">confirm</button>

            <button
              className="btn btn-danger"
              onClick={() => {
                setImg("");
                setGcash("");
                setPersonal({
                  email: "",
                  payment: "",
                  id: "",
                });
                toggleReload(false);
                toggleSending(false);
                toggleUpload(false);
              }}
            >
              cancel
            </button>
            {reload && <span className="spinner"></span>}
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
                <div className="index">
                  <h3>Request </h3>

                  <p>Name: {order.customer.name}</p>
                  <p>Email: {order.customer.email}</p>
                  <p>ID: {order._id}</p>

                  <div className="loader">
                    <span className="hour"></span>
                    <span className="min"></span>
                    <span className="circel"></span>
                  </div>

                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setPersonal({
                        email: order.customer.email,
                        payment: "Gcash",
                        id: order._id,
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
                <div className="index">
                  <h4>Waiting </h4>
                  <p>Name: {pick.customer.name}</p>
                  <p>Email: {pick.customer.email}</p>
                  <p>ID: {pick._id}</p>

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
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Ongoing;
