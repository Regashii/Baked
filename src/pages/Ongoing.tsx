import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Ongoing = () => {
  localStorage.setItem("route", "onGoing");
  const endDate = new Date();

  console.log();

  const [personal, setPersonal] = useState({
    email: "",
    payment: "",
    id: "",
  });

  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [gcash, setGcash] = useState("");

  const [reload, toggleReload] = useState(false);
  const [upload, toggleSending] = useState(false);
  const [sending, toggleUpload] = useState(false);

  if (upload && sending) {
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
                toggleUpload(true);
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
                toggleUpload(true);
              }
            });
        });
    }
    formData.append("gmail", "goodiesbaked9@gmail.com");
    formData.append("payment", personal.payment);

    axios
      .post("/api/sender", formData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toggleSending(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const pikcUpCake = (orderID: any) => {
    axios
      .put(`https://baked-goodies.vercel.app/api/order/server/${orderID}`, {
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

  const cancelCake = (orderID: any) => {
    axios
      .put(`https://baked-goodies.vercel.app/api/order/server/${orderID}`, {
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
                toggleSending(false);
                toggleUpload(false);
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

                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setPersonal({
                        email: rushing.customer.email,
                        payment: rushing.payment,
                        id: rushing._id,
                      });
                    }}
                  >
                    Ready to pickup
                  </button>
                  <details className="styling">
                    <summary>Info about order</summary>
                    <div className="orderInfo" key={index}>
                      {/* <div className="png">
                        <img
                          src={order.images}
                          alt="Cake"
                          onClick={() => {
                            setPic(order.images);
                          }}
                        />
                      </div> */}

                      <div>
                        <b>Type: {rushing.type}</b>
                      </div>
                      <div>
                        <b>Flavor: {rushing.flavor}</b>
                      </div>
                      <div>
                        <b>Shape: {rushing.shape}</b>
                      </div>
                      <div>
                        <b>Size: {rushing.size.replace(/^(.*)₱(.).*/, "$1")}</b>
                      </div>

                      {rushing.upgrades.length > 0 && (
                        <div>
                          <b>
                            Upgrades:{" "}
                            {rushing.upgrades.map((upgrade: any) => (
                              <>{upgrade.replace(/^(.*)₱(.).*/, "$1")}</>
                            ))}
                          </b>
                        </div>
                      )}

                      {rushing.addons.length > 0 && (
                        <div>
                          <b>
                            Addons:{" "}
                            {rushing.addons.map((addon: any) => (
                              <>{addon.replace(/^(.*)₱(.).*/, "$1")}</>
                            ))}
                          </b>
                        </div>
                      )}

                      <div>
                        <b>Dedication: {rushing.dedication}</b>
                      </div>
                      <div>
                        <b>Description: {rushing.orderDetails}</b>
                      </div>
                      <div>
                        <b>
                          Order Date:{" "}
                          {new Date(rushing.orderDate).toLocaleDateString()}
                        </b>
                      </div>
                      <div>
                        <b>
                          Deadline:{" "}
                          {new Date(rushing.promiseDate).toLocaleDateString()}
                        </b>
                      </div>
                      <div>
                        <b>Payment: {rushing.payment}</b>
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            ))}
          </div>
        </>
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

                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setPersonal({
                        email: norushing.customer.email,
                        payment: norushing.payment,
                        id: norushing._id,
                      });
                    }}
                  >
                    Ready to pickup
                  </button>
                  <details className="styling">
                    <summary>Info about order</summary>
                    <div className="orderInfo" key={index}>
                      {/* <div className="png">
                        <img
                          src={order.images}
                          alt="Cake"
                          onClick={() => {
                            setPic(order.images);
                          }}
                        />
                      </div> */}

                      <div>
                        <b>Type: {norushing.type}</b>
                      </div>
                      <div>
                        <b>Flavor: {norushing.flavor}</b>
                      </div>
                      <div>
                        <b>Shape: {norushing.shape}</b>
                      </div>
                      <div>
                        <b>
                          Size: {norushing.size.replace(/^(.*)₱(.).*/, "$1")}
                        </b>
                      </div>

                      {norushing.upgrades.length > 0 && (
                        <div>
                          <b>
                            Upgrades:{" "}
                            {norushing.upgrades.map((upgrade: any) => (
                              <>{upgrade.replace(/^(.*)₱(.).*/, "$1")}</>
                            ))}
                          </b>
                        </div>
                      )}

                      {norushing.addons.length > 0 && (
                        <div>
                          <b>
                            Addons:{" "}
                            {norushing.addons.map((addon: any) => (
                              <>{addon.replace(/^(.*)₱(.).*/, "$1")}</>
                            ))}
                          </b>
                        </div>
                      )}

                      <div>
                        <b>Dedication: {norushing.dedication}</b>
                      </div>
                      <div>
                        <b>Description: {norushing.orderDetails}</b>
                      </div>
                      <div>
                        <b>
                          Order Date:{" "}
                          {new Date(norushing.orderDate).toLocaleDateString()}
                        </b>
                      </div>
                      <div>
                        <b>
                          Deadline:{" "}
                          {new Date(norushing.promiseDate).toLocaleDateString()}
                        </b>
                      </div>
                      <div>
                        <b>Payment: {norushing.payment}</b>
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

                  <div className="Action">
                    {" "}
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        pikcUpCake(pick._id);
                      }}
                    >
                      Customer get the cake
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        cancelCake(pick._id);
                      }}
                    >
                      Cancel order
                    </button>
                  </div>

                  <details>
                    <div className="order" key={index}>
                      {/* <div className="png">
                        <img
                          src={pick.endImage}
                          alt="Cake"
                          onClick={() => {
                            setPic(pick.images);
                          }}
                        />
                      </div> */}
                      <div>
                        {!pick.paymentImage && <p>Not paid yet</p>}

                        {pick.paymentImage && (
                          <>
                            {pick.paymentMethod &&
                              pick.paymentMethod.toLowerCase() === "gcash" && (
                                <img src={pick.paymentImage} alt="paid" />
                              )}
                            {pick.paymentMethod &&
                              pick.paymentMethod.toLowerCase() ===
                                "cash on pickup" && (
                                <p>{pick.finalPrice} Paid</p>
                              )}
                          </>
                        )}
                      </div>

                      <div className="dates">
                        <div className="orderDate">
                          <b>
                            Order Date:{" "}
                            {new Date(pick.orderDate).toLocaleDateString()}
                          </b>
                        </div>
                        <div className="promiseDate">
                          <b>
                            Deadline:{" "}
                            {new Date(pick.promiseDate).toLocaleDateString()}
                          </b>
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

      <ToastContainer />
    </div>
  );
};

export default Ongoing;
