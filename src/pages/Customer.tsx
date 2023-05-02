import axios from "axios";
import { useEffect, useState } from "react";

const Customer = () => {
  const [buyers, setBuyers] = useState([]);

  useEffect(() => {
    axios
      .get("https://baked-goodies-api.vercel.app/api/customer/list")
      .then((res) => {
        setBuyers(res.data);
      });
  }, []);

  return (
    <div className="Pages4">
      <div className="customers">
        <table>
          <thead>
            <tr>
              <th className="check">
                <input type="checkbox" />
              </th>
              <th className="index">
                <b>ID</b>
              </th>
              <th className="name">
                <b>name</b>
              </th>
              <th className="email">
                <b>email</b>
              </th>
              <th className="pending">
                <b>status</b>
              </th>
              <th className="action">
                <b>Action</b>
              </th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((buyer: any, index) => (
              <tr key={index} className="trbody">
                <td className="check">
                  <input type="checkbox" />
                </td>
                <td className="index">{index}</td>
                <td className="name">{buyer.name}</td>
                <td className="email">{buyer.email}</td>
                <td className="pending">Pending</td>
                <td className="action">
                  <button className="btn btn-outline-warning">View</button>
                  <button className="btn btn-outline-success">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customer;
