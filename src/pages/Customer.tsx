import axios, { all } from "axios";
import { useEffect, useState } from "react";

const Customer = () => {
  let images = "th.jpg";
  const [buyers, setBuyers] = useState([]);
  // const [orderName, setOrderName] = useState("");
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    axios
      .get("https://baked-goodies-api.vercel.app/api/customer/list")
      .then((res) => {
        setBuyers(res.data);
      });
  }, []);

  const handleSubmit = (data: any) => {
    console.log(data);
    axios
      .get(
        `https://baked-goodies-api.vercel.app/api/order?customer.name=${data}`
      )
      .then((res) => {
        setAllOrders(res.data);
      });
  };

  return (
    <div className="Pages4">
      {allOrders.length > 0 && (
        <div className="individual">
          <aside>
            <div>
              <button
                onClick={() => {
                  setAllOrders([]);
                }}
                className="btn btn-danger"
                style={{ float: "left", position: "absolute" }}
              >
                X
              </button>
            </div>
            <img src={images} alt="avatar" />
            <div>
              {/* @ts-ignore */}
              <p className="text-break"> {allOrders[0].customer.name}</p>
              {/* @ts-ignore */}
              <p className="text-break">{allOrders[0].customer.email}</p>
              {/* @ts-ignore */}
              <p className="text-break">{allOrders[0].customer.phone}</p>
            </div>
          </aside>
          <main>
            <h4>Total Rating</h4>
            <div>⭐⭐⭐⭐⭐</div>
          </main>
          <footer>
            {allOrders.map((allOrder: any, index) => (
              <div key={index}>
                <table>
                  <thead>
                    <tr>
                      <th>Cake type</th>
                      <th>Size</th>
                      <th>Status</th>
                      <th>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{allOrder.type}</td>
                      <td>{allOrder.size}</td>
                      {allOrder.status === "processing" && (
                        <td style={{ background: "yellow" }}>Pending</td>
                      )}

                      {/* <td>⭐⭐⭐⭐⭐</td> */}
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </footer>
        </div>
      )}

      {allOrders.length === 0 && (
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
              {buyers.map((buyer: any, index) => (
                <tr key={index} className="trbody">
                  <td className="index">
                    <span>{index}</span>
                  </td>
                  <td className="name">
                    <span>
                      <img src={images} alt="avatar" />{" "}
                      <span style={{ display: "flex", alignItems: "center" }}>
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
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => {
                        handleSubmit(buyer.name);
                      }}
                    >
                      View profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Customer;
