import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import BakedGoodies from "../components/BakedGoodies";
import Modal from "react-bootstrap/Modal";

const Ongoing = () => {
  localStorage.setItem("route", "onGoing");
  const endDate = new Date();

  const [personal, setPersonal] = useState({
    email: "",
    payment: "",
    id: "",
  });

  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [gcash, setGcash] = useState("");

  const [reload, toggleReload] = useState(false);
  const [countReload, addCountReload] = useState(0);

  if (countReload === 2) {
    window.location.reload();
  }

  const [rush, setRush] = useState([]);
  const [notRush, setNotRush] = useState([]);

  const [pickUp, setPickUP] = useState([]);

  const [pic, setPic] = useState("");
  const [arrayItem, setArrayItem] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://baked-goodies-api.vercel.app/api/order?status=accepted&&isRush=true`
      )
      .then((res) => {
        setRush(res.data);
      });
    axios
      .get(
        `https://baked-goodies-api.vercel.app/api/order?status=accepted&&isRush=false`
      )
      .then((res) => {
        setNotRush(res.data);
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
    if (rush.length === 0 && notRush.length === 0 && pickUp.length === 0) {
      setArrayItem(true);
    }
  }, 10000);
  const submitInfo = (e: any) => {
    e.preventDefault();

    toggleReload(true);

    const formImg = new FormData();
    formImg.append("imageUpload", img);

    const formData = new FormData();
    formData.append("image", img);
    if (personal.payment.toLowerCase() === "gcash") {
      formData.append("image", gcash);
      formImg.append("imageUpload", gcash);
      axios
        .post("https://baked-goodies.vercel.app/api/upload", formImg)
        .then((res) => {
          axios
            .put(
              `https://baked-goodies.vercel.app/api/order/server/${personal.id}`,
              {
                endImage: res.data[0],
                finalPrice: res.data[1],
                status: "pickup",
                endDate: `${endDate.getFullYear()}-${
                  endDate.getMonth() + 1
                }-${endDate.getDate()}`,
              }
            )
            .then((response) => {
              if (response.status === 200) {
                addCountReload((prev) => prev + 1);
              }
            });
        });
    } else if (
      personal.payment.toLowerCase() === "cash on pickup" ||
      personal.payment.toLowerCase() === "bdo"
    ) {
      formData.append("price", price);
      axios
        .post("https://baked-goodies.vercel.app/api/upload", formImg)
        .then((res) => {
          axios
            .put(
              `https://baked-goodies.vercel.app/api/order/server/${personal.id}`,
              {
                endImage: res.data[0],
                finalPrice: price,
                status: "pickup",
                endDate: `${endDate.getFullYear()}-${
                  endDate.getMonth() + 1
                }-${endDate.getDate()}`,
              }
            )
            .then((response) => {
              if (response.status === 200) {
                addCountReload((prev) => prev + 1);
              }
            });
        });
    }
    formData.append("gmail", personal.email);
    formData.append("payment", personal.payment);

    axios
      .post("/api/sender", formData)
      .then((res) => {
        if (res.status === 200) {
          addCountReload((prev) => prev + 1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [pleaseWait, togglePleaseWait] = useState(false);

  const [orderId, setOrderId] = useState(null);

  const pikcUpCake = () => {
    togglePleaseWait(true);
    axios
      .put(`https://baked-goodies.vercel.app/api/order/server/${orderId}`, {
        status: "getCake",
      })
      .then((response) => {
        toast;
        if (response.status === 200) {
          toast.success("Please wait", {
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
          }, 2000);
        }
      });
  };

  const cancelCake = () => {
    togglePleaseWait(true);
    axios
      .put(`https://baked-goodies.vercel.app/api/order/server/${orderId}`, {
        status: "canceled",
      })
      .then((response) => {
        toast;
        if (response.status === 200) {
          toast.success("Please wait", {
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
          }, 2000);
        }
      });
  };

  const [display, setDisplay] = useState({
    img: "",
    type: "",
    flavor: "",
    shape: "",
    size: "",
    upgrades: [],
    addons: [],
    dedication: "",
    orderDetails: "",
    orderDate: new Date(),
    promiseDate: new Date(),
    payment: "",
  });

  const [getModal, toggleGetModal] = useState(false);
  const [cancelModal, toggleCancelModal] = useState(false);

  return (
    <>
      <BakedGoodies />
      <div className="Pages2">
        <header>
          <h1>Ongoing</h1>
        </header>

        <Modal show={pleaseWait}>
          <Modal.Body>Please wait processing...</Modal.Body>
        </Modal>
        <Modal show={getModal}>
          <Modal.Body>
            Are you sure the customer get the cake?
            <div>
              <button className="btn btn-success" onClick={pikcUpCake}>
                Yes
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setOrderId(null);
                  toggleGetModal(false);
                }}
              >
                No
              </button>
            </div>
          </Modal.Body>
        </Modal>
        <Modal show={cancelModal}>
          <Modal.Body>
            Are you sure you want to cancel?
            <div>
              <button className="btn btn-success" onClick={cancelCake}>
                Yes
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setOrderId(null);
                  toggleCancelModal(false);
                }}
              >
                No
              </button>
            </div>
          </Modal.Body>
        </Modal>

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

              {personal.payment.toLocaleLowerCase() === "cash on pickup" && (
                <>
                  <label>Payment: {personal.payment} </label>
                  <br />
                  <input
                    type="text"
                    placeholder="Price"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                    required
                  />
                </>
              )}
              {personal.payment.toLocaleLowerCase() === "bdo" && (
                <>
                  <label>Payment: {personal.payment} </label>
                  <br />
                  <input
                    type="text"
                    placeholder="example: https://checkout.bdo.com.ph/"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                    required
                    size={35}
                  />
                </>
              )}
              {personal.payment.toLowerCase() === "gcash" && (
                <>
                  <label>Payment: {personal.payment} </label>
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

              <button className="btn btn-success" disabled={reload}>
                confirm
              </button>

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
                  addCountReload(0);
                  setPrice("");
                }}
                disabled={reload}
              >
                cancel
              </button>
              {reload && <span className="spinner"></span>}
            </form>
          </div>
        )}

        {rush.length === 0 &&
          notRush.length === 0 &&
          pickUp.length === 0 &&
          arrayItem === false && (
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

        {rush.length === 0 &&
          notRush.length === 0 &&
          pickUp.length === 0 &&
          arrayItem === true && (
            <div className="errorPage">
              <img src="idk.png" alt="idk" width={100} />
              <h2> No data found or low connection</h2>
            </div>
          )}

        {rush.length > 0 && (
          <>
            <h1>Cake still Processing - Rush</h1>
            <div className="process">
              {rush.map((rushing: any, index) => (
                <div className="num" key={index}>
                  <div className="index">
                    <h3>Request </h3>

                    <p>Name: {rushing.customer.name}</p>
                    <p>Email: {rushing.customer.email}</p>
                    <p>ID: {rushing._id}</p>

                    <div className="loader">
                      <span className="hour"></span>
                      <span className="min"></span>
                      <span className="circel"></span>
                    </div>
                    <div>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          if (rushing.payment) {
                            setPersonal({
                              email: rushing.customer.email,
                              payment: rushing.payment,
                              id: rushing._id,
                            });
                          } else {
                            toast.error("No payment method", {
                              position: "top-right",
                              autoClose: 3000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                            });
                          }
                        }}
                      >
                        Ready to pickup
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          setOrderId(rushing._id);
                          toggleCancelModal(true);
                        }}
                      >
                        Remove
                      </button>
                    </div>

                    <div
                      className="openDetail"
                      onClick={() => {
                        setDisplay({
                          img: rushing.images,
                          type: rushing.type,
                          flavor: rushing.flavor,
                          shape: rushing.shape,
                          size: rushing.size,
                          upgrades: rushing.upgrades,
                          addons: rushing.addons,
                          dedication: rushing.dedication,
                          orderDetails: rushing.orderDetails,
                          orderDate: rushing.orderDate,
                          promiseDate: rushing.promiseDate,
                          payment: rushing.payment,
                        });
                      }}
                    >
                      See details
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {display.type !== "" && (
          <div className="orderInfo">
            <div className="orderCon">
              <button
                className="btn btn-danger"
                onClick={() => {
                  setDisplay({
                    img: "",
                    type: "",
                    flavor: "",
                    shape: "",
                    size: "",
                    upgrades: [],
                    addons: [],
                    dedication: "",
                    orderDetails: "",
                    orderDate: new Date(),
                    promiseDate: new Date(),
                    payment: "",
                  });
                }}
              >
                Close
              </button>
              <div>
                <img src={display.img} alt="" />
              </div>
              <div>
                <b>Type: {display.type}</b>
              </div>
              <div>
                <b>Flavor: {display.flavor}</b>
              </div>
              <div>
                <b>Shape: {display.shape}</b>
              </div>
              <div>
                <b>Size: {display.size.replace(/^(.*)₱(.).*/, "$1")}</b>
              </div>
              {display.upgrades.length > 0 && (
                <div>
                  <b>
                    Upgrades:{" "}
                    {display.upgrades.map((upgrade: any) => (
                      <>{upgrade.replace(/^(.*)₱(.).*/, "$1")}</>
                    ))}
                  </b>
                </div>
              )}
              {display.addons.length > 0 && (
                <div>
                  <b>
                    Addons:{" "}
                    {display.addons.map((addon: any) => (
                      <>{addon.replace(/^(.*)₱(.).*/, "$1")}</>
                    ))}
                  </b>
                </div>
              )}
              <div>
                <b>Dedication: {display.dedication}</b>
              </div>
              <div>
                <b>Description: {display.orderDetails}</b>
              </div>
              <div>
                <b>
                  Order Date: {new Date(display.orderDate).toLocaleDateString()}
                </b>
              </div>
              <div>
                <b>
                  Deadline: {new Date(display.promiseDate).toLocaleDateString()}
                </b>
              </div>
              <div>
                <b>Payment: {display.payment}</b>
              </div>
            </div>
          </div>
        )}
        {notRush.length > 0 && (
          <>
            <h1>Cake still Processing - Not rush</h1>
            <div className="process">
              {notRush.map((norushing: any, index) => (
                <div className="num" key={index}>
                  <div className="index">
                    <h3>Request </h3>

                    <p>Name: {norushing.customer.name}</p>
                    <p>Email: {norushing.customer.email}</p>
                    <p>ID: {norushing._id}</p>

                    <div className="loader">
                      <span className="hour"></span>
                      <span className="min"></span>
                      <span className="circel"></span>
                    </div>
                    <div>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          if (norushing.payment) {
                            setPersonal({
                              email: norushing.customer.email,
                              payment: norushing.payment,
                              id: norushing._id,
                            });
                          } else {
                            toast.error("No payment method", {
                              position: "top-right",
                              autoClose: 3000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                            });
                          }
                        }}
                      >
                        Ready to pickup
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          setOrderId(norushing._id);
                          toggleCancelModal(true);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                    <div
                      className="openDetail"
                      onClick={() => {
                        setDisplay({
                          img: norushing.images,
                          type: norushing.type,
                          flavor: norushing.flavor,
                          shape: norushing.shape,
                          size: norushing.size,
                          upgrades: norushing.upgrades,
                          addons: norushing.addons,
                          dedication: norushing.dedication,
                          orderDetails: norushing.orderDetails,
                          orderDate: norushing.orderDate,
                          promiseDate: norushing.promiseDate,
                          payment: norushing.payment,
                        });
                      }}
                    >
                      See details
                    </div>
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

                    <div className="Action">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setOrderId(pick._id);
                          toggleGetModal(true);
                        }}
                      >
                        Customer get the cake
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          setOrderId(pick._id);
                          toggleCancelModal(true);
                        }}
                      >
                        Cancel order
                      </button>
                    </div>

                    <div
                      className="openDetail"
                      onClick={() => {
                        setDisplay({
                          img: pick.images,
                          type: pick.type,
                          flavor: pick.flavor,
                          shape: pick.shape,
                          size: pick.size,
                          upgrades: pick.upgrades,
                          addons: pick.addons,
                          dedication: pick.dedication,
                          orderDetails: pick.orderDetails,
                          orderDate: pick.orderDate,
                          promiseDate: pick.promiseDate,
                          payment: pick.payment,
                        });
                      }}
                    >
                      See details
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <ToastContainer />
      </div>
    </>
  );
};

export default Ongoing;
