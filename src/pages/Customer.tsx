import axios from "axios";
import { useEffect, useState } from "react";
import { faStar as thinStar } from "@fortawesome/free-regular-svg-icons";
import {
  faStarHalfStroke,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BakedGoodies from "../components/BakedGoodies";
import Modal from "react-bootstrap/Modal";

const Customer = () => {
  localStorage.setItem("route", "customer");
  const [pleaseWait, togglePleaseWait] = useState(false);
  const [buyers, setBuyers] = useState([]);
  const [search, setSearch] = useState("");
  const [allOrders, setAllOrders] = useState([]);
  const [average, setAverage] = useState(0);
  const [total, setTotal] = useState([]);
  const [avatar, changeAvatar] = useState("");

  useEffect(() => {
    axios
      .get("https://baked-goodies-api.vercel.app/api/customer/list")
      .then((res) => {
        setBuyers(res.data);
      });
  }, []);

  const allSum = (add: any) => {
    setAverage((old) => old + add);
    //@ts-ignore
    setTotal((prev) => {
      return [...prev, add];
    });
  };

  const handleSubmit = (data: any) => {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      axios
        .get(`https://baked-goodies-api.vercel.app/api/order?_id=${element}`)
        .then((res) => {
          //@ts-ignore
          setAllOrders((ordering) => {
            return [...ordering, res.data[0]];
          });

          togglePleaseWait(false);

          if (res.data[0].isDone === true) {
            allSum(res.data[0].feedback.rating);
          }
        });
    }
  };

  const [display, setDisplay] = useState({
    imgPay: "",
    imgEnd: "",
    imgStart: [],
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
    endDate: new Date(),
    payment: "",
  });

  console.log(display.imgStart);

  const [displayModal, toggleDisplayModal] = useState(false);

  return (
    <>
      <BakedGoodies />
      <Modal show={pleaseWait}>
        <Modal.Body>Please wait processing...</Modal.Body>
      </Modal>

      <Modal show={displayModal}>
        <Modal.Header>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {display.imgStart.map((imageS: any) => (
              <div>
                <img src={imageS} alt="startCake" width={100} />
                <p>Start Cake</p>
              </div>
            ))}

            <div>
              <img src={display.imgPay} alt="confirmCake" width={100} />
              <p>Confirm Payment</p>
            </div>

            <div>
              <img src={display.imgEnd} alt="finalProduct" width={100} />
              <p>final Product</p>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <b>Type: {display.type}</b>
          <br />

          <b>Flavor: {display.flavor}</b>
          <br />

          <b>Shape: {display.shape}</b>
          <br />

          <b>Size: {display.size.replace(/^(.*)₱(.).*/, "$1")}</b>
          <br />

          {display.upgrades.length > 0 && (
            <>
              <b>
                Upgrades:{" "}
                {display.upgrades.map((upgrade: any) => (
                  <>{upgrade.replace(/^(.*)₱(.).*/, "$1")}</>
                ))}
              </b>
              <br />
            </>
          )}
          {display.addons.length > 0 && (
            <>
              <b>
                Addons:{" "}
                {display.addons.map((addon: any) => (
                  <>{addon.replace(/^(.*)₱(.).*/, "$1")}</>
                ))}
              </b>
              <br />
            </>
          )}

          <b>Dedication: {display.dedication}</b>
          <br />

          <b>Description: {display.orderDetails}</b>
          <br />

          <b>Order Date: {new Date(display.orderDate).toLocaleDateString()}</b>
          <br />

          <b>Deadline: {new Date(display.promiseDate).toLocaleDateString()}</b>
          <br />
          <b>end Date: {new Date(display.endDate).toLocaleDateString()}</b>
          <br />

          <b>Payment: {display.payment}</b>
          <br />
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-primary"
            onClick={() => {
              toggleDisplayModal(false);
              setDisplay({
                imgPay: "",
                imgEnd: "",
                imgStart: [],
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
                endDate: new Date(),
                payment: "",
              });
            }}
          >
            Ok
          </button>
        </Modal.Footer>
      </Modal>

      <div className="Pages4">
        {allOrders.length > 0 && (
          <div className="individual">
            <aside>
              <button
                onClick={() => {
                  setAllOrders([]);
                  setTotal([]);
                  setAverage(0);
                }}
                className="btn btn-danger"
                style={{
                  float: "left",
                  position: "absolute",
                }}
              >
                X
              </button>
              {/* @ts-ignore */}
              {avatar && <img src={avatar} alt="avatar" />}
              {!avatar && (
                <img
                  src="https://i.pinimg.com/originals/15/6f/bb/156fbb01d3ec2f7ea869e06bf34351dc.jpg"
                  alt="avatar"
                />
              )}
              <div>
                {/* @ts-ignore */}
                <p className="text-break">{allOrders[0].customer.name}</p>
                {/* @ts-ignore */}
                <p className="text-break">{allOrders[0].customer.email}</p>
              </div>
            </aside>
            <main>
              {average === 0 && <h4>Total Rating - 0 star</h4>}
              {average !== 0 && (
                <h4>Total Rating - {average / total.length} star</h4>
              )}

              <div>
                {average / total.length <= 5 && average / total.length > 4 && (
                  <>
                    <FontAwesomeIcon icon={solidStar} className="star" />
                    <FontAwesomeIcon icon={solidStar} className="star" />
                    <FontAwesomeIcon icon={solidStar} className="star" />
                    <FontAwesomeIcon icon={solidStar} className="star" />
                    {average / total.length === 5 && (
                      <FontAwesomeIcon icon={solidStar} className="star" />
                    )}
                    {average / total.length <= 4.99 &&
                      average / total.length >= 4.5 && (
                        <FontAwesomeIcon
                          icon={faStarHalfStroke}
                          className="star"
                        />
                      )}
                    {average / total.length <= 4.49 &&
                      average / total.length >= 4 && (
                        <FontAwesomeIcon icon={thinStar} className="star" />
                      )}
                  </>
                )}
                {average / total.length <= 4 && average / total.length > 3 && (
                  <>
                    <FontAwesomeIcon icon={solidStar} className="star" />
                    <FontAwesomeIcon icon={solidStar} className="star" />
                    <FontAwesomeIcon icon={solidStar} className="star" />
                    {average / total.length === 4 && (
                      <FontAwesomeIcon icon={solidStar} className="star" />
                    )}
                    {average / total.length <= 3.99 &&
                      average / total.length >= 3.5 && (
                        <FontAwesomeIcon
                          icon={faStarHalfStroke}
                          className="star"
                        />
                      )}
                    {average / total.length <= 3.49 &&
                      average / total.length >= 3 && (
                        <FontAwesomeIcon icon={thinStar} className="star" />
                      )}
                    <FontAwesomeIcon icon={thinStar} className="star" />
                  </>
                )}
                {average / total.length <= 3 && average / total.length > 2 && (
                  <>
                    <FontAwesomeIcon icon={solidStar} className="star" />
                    <FontAwesomeIcon icon={solidStar} className="star" />
                    {average / total.length === 3 && (
                      <FontAwesomeIcon icon={solidStar} className="star" />
                    )}
                    {average / total.length <= 2.99 &&
                      average / total.length >= 2.5 && (
                        <FontAwesomeIcon
                          icon={faStarHalfStroke}
                          className="star"
                        />
                      )}
                    {average / total.length <= 2.49 &&
                      average / total.length >= 2 && (
                        <FontAwesomeIcon icon={thinStar} className="star" />
                      )}

                    <FontAwesomeIcon icon={thinStar} className="star" />
                    <FontAwesomeIcon icon={thinStar} className="star" />
                  </>
                )}
                {average / total.length <= 2 &&
                  average / total.length > 1.1 && (
                    <>
                      <FontAwesomeIcon icon={solidStar} className="star" />
                      {average / total.length === 2 && (
                        <FontAwesomeIcon icon={solidStar} className="star" />
                      )}
                      {average / total.length <= 1.99 &&
                        average / total.length >= 1.5 && (
                          <FontAwesomeIcon
                            icon={faStarHalfStroke}
                            className="star"
                          />
                        )}
                      {average / total.length <= 1.49 &&
                        average / total.length >= 1 && (
                          <FontAwesomeIcon icon={thinStar} className="star" />
                        )}
                      <FontAwesomeIcon icon={thinStar} className="star" />
                      <FontAwesomeIcon icon={thinStar} className="star" />
                      <FontAwesomeIcon icon={thinStar} className="star" />
                    </>
                  )}
                {average / total.length <= 1 && average / total.length > 0 && (
                  <>
                    {average / total.length === 1 && (
                      <FontAwesomeIcon icon={solidStar} className="star" />
                    )}
                    {average / total.length <= 0.99 &&
                      average / total.length >= 0.5 && (
                        <FontAwesomeIcon
                          icon={faStarHalfStroke}
                          className="star"
                        />
                      )}
                    <FontAwesomeIcon icon={thinStar} className="star" />
                    <FontAwesomeIcon icon={thinStar} className="star" />
                    <FontAwesomeIcon icon={thinStar} className="star" />
                    <FontAwesomeIcon icon={thinStar} className="star" />
                  </>
                )}
                {average === 0 && (
                  <>
                    <FontAwesomeIcon icon={thinStar} className="star" />
                    <FontAwesomeIcon icon={thinStar} className="star" />
                    <FontAwesomeIcon icon={thinStar} className="star" />
                    <FontAwesomeIcon icon={thinStar} className="star" />
                    <FontAwesomeIcon icon={thinStar} className="star" />
                  </>
                )}
              </div>
            </main>
            <footer>
              <table>
                <thead>
                  <tr>
                    <th colSpan={3}></th>
                  </tr>
                  <tr>
                    <th className="orderID">Id</th>
                    <th className="cakeType">Cake type</th>

                    <th className="cakeStatus">Status</th>
                    <th className="cakeRating">Rating</th>
                    <th className="cakeAction">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allOrders.map((allOrder: any, index: any) => (
                    <tr key={index}>
                      <td className="orderID">{allOrder._id}</td>
                      <td className="cakeType">{allOrder.type}</td>

                      {allOrder.status === "processing" && (
                        <td
                          className="cakeStatus"
                          style={{
                            background: "lightblue",
                            paddingLeft: "10px",
                          }}
                        >
                          Pending
                        </td>
                      )}
                      {allOrder.status === "accepted" && (
                        <td
                          className="cakeStatus"
                          style={{ background: "yellow", paddingLeft: "10px" }}
                        >
                          Working
                        </td>
                      )}
                      {allOrder.status === "pickup" && (
                        <td
                          className="cakeStatus"
                          style={{
                            background: "orange",
                            paddingLeft: "10px",
                          }}
                        >
                          Wating for payment
                        </td>
                      )}
                      {allOrder.status === "paid" && (
                        <td
                          className="cakeStatus"
                          style={{
                            background: "pink",
                            paddingLeft: "10px",
                          }}
                        >
                          Checking the payment
                        </td>
                      )}
                      {allOrder.status === "confirm" && (
                        <td
                          className="cakeStatus"
                          style={{
                            background: "lightgreen",
                            paddingLeft: "10px",
                          }}
                        >
                          Wating for pickup
                        </td>
                      )}
                      {allOrder.status === "decline" && (
                        <td
                          className="cakeStatus"
                          style={{ background: "red", paddingLeft: "10px" }}
                        >
                          Declined
                        </td>
                      )}
                      {allOrder.status === "canceled" && (
                        <td
                          className="cakeStatus"
                          style={{ background: "red", paddingLeft: "10px" }}
                        >
                          Canceled
                        </td>
                      )}
                      {allOrder.status === "getCake" && (
                        <td
                          className="cakeStatus"
                          style={{ background: "green", paddingLeft: "10px" }}
                        >
                          Done
                        </td>
                      )}
                      {!allOrder.feedback && (
                        <td className="cakeRating">None</td>
                      )}
                      {allOrder.feedback && (
                        <>
                          {allOrder.feedback.rating === 5 && (
                            <td className="cakeRating">⭐⭐⭐⭐⭐</td>
                          )}
                          {allOrder.feedback.rating === 4 && (
                            <td className="cakeRating">⭐⭐⭐⭐</td>
                          )}
                          {allOrder.feedback.rating === 3 && (
                            <td className="cakeRating">⭐⭐⭐</td>
                          )}
                          {allOrder.feedback.rating === 2 && (
                            <td className="cakeRating">⭐⭐</td>
                          )}
                          {allOrder.feedback.rating === 1 && (
                            <td className="cakeRating">⭐</td>
                          )}
                        </>
                      )}

                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            toggleDisplayModal(true);
                            setDisplay({
                              imgPay: allOrder.paymentImage,
                              imgEnd: allOrder.endImage,
                              imgStart: allOrder.images,
                              type: allOrder.type,
                              flavor: allOrder.flavor,
                              shape: allOrder.shape,
                              size: allOrder.size,
                              upgrades: allOrder.upgrades,
                              addons: allOrder.addons,
                              dedication: allOrder.dedication,
                              orderDetails: allOrder.orderDetails,
                              orderDate: allOrder.orderDate,
                              promiseDate: allOrder.promiseDate,
                              endDate: allOrder.endDate,
                              payment: allOrder.payment,
                            });
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </footer>
          </div>
        )}

        {allOrders.length === 0 && (
          <>
            <div>
              <label>Search name or email: </label>
              <input
                type="text"
                placeholder="small leter only"
                onChange={(e) => {
                  setSearch(e.target.value.toLowerCase());
                }}
                value={search}
              />
            </div>
            <div className="customers">
              <table>
                <thead>
                  <tr>
                    <th className="index">
                      <b>ID</b>
                    </th>
                    <th className="name">
                      <b>Name</b>
                    </th>
                    <th className="email">
                      <b>Email</b>
                    </th>
                    <th className="pending">
                      <b>Number</b>
                    </th>
                    <th className="action">
                      <b>Action</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {buyers
                    .filter(
                      (buyer: any) =>
                        buyer.name.toLowerCase().includes(search) ||
                        buyer.email.toLowerCase().includes(search)
                    )
                    .map((buyer: any, index) => (
                      <>
                        <tr key={index} className="trbody">
                          <td className="index">
                            <span>{index}</span>
                          </td>
                          <td className="name">
                            <span>
                              {buyer.avatar && (
                                <img src={buyer.avatar} alt="avatar" />
                              )}

                              {!buyer.avatar && (
                                <img
                                  src="https://i.pinimg.com/originals/15/6f/bb/156fbb01d3ec2f7ea869e06bf34351dc.jpg"
                                  alt="avatar"
                                />
                              )}

                              <span
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                {buyer.name}
                              </span>
                            </span>
                          </td>
                          <td className="email">
                            <span>{buyer.email}</span>
                          </td>
                          <td className="pending">
                            <span>{buyer.phone}</span>
                          </td>
                          <td className="action">
                            {buyer.orders.length > 0 && (
                              <button
                                className="btn btn-outline-warning"
                                onClick={() => {
                                  handleSubmit(buyer.orders);
                                  togglePleaseWait(true);
                                  changeAvatar(buyer.avatar);
                                }}
                              >
                                View profile
                              </button>
                            )}
                            {buyer.orders.length === 0 && (
                              <button className="btn btn-warning" disabled>
                                No orders yet
                              </button>
                            )}
                          </td>
                        </tr>
                      </>
                    ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Customer;
