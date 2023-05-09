import { useNavigate } from "react-router-dom";
import "../pagescss/Finished.css";

const Finished = () => {
  const navigate = useNavigate();
  //@ts-ignore
  const detailsOrder = JSON.parse(localStorage.getItem("items"));
  //@ts-ignore
  const infoOrder = JSON.parse(localStorage.getItem("info"));

  function backToOngoing() {
    localStorage.removeItem("items");
    localStorage.removeItem("info");
    navigate("/dashboard-ongoing");
  }
  return (
    <div>
      {detailsOrder && infoOrder && (
        <div className="Done">
          <h4>BakedGoodies</h4>
          <p>Please print this item for confirmation and to claim your order</p>
          <p>your id: {detailsOrder.id}</p>
          <p>Name: {detailsOrder.name}</p>

          <p>Email: {detailsOrder.email}</p>

          <p>*******************************************************</p>
          <p>Item Description</p>
          {/* <img src={infoOrder.img} alt="finish Cake" /> */}
          <span>Flavor:</span>
          <span>{detailsOrder.flavor}</span>
          <br />
          <span>Shape:</span>
          <span>{detailsOrder.shape}</span>
          <br />
          <span>type of cake:</span>
          <span>{detailsOrder.type}</span>
          <br />
          <span>Size:</span>
          <span>{detailsOrder.size}</span>
          <br />
          <p>
            --------------------------------------------------------------------
          </p>
          <span>Total:</span>
          <span>{infoOrder.price}</span>
          <br />
          <br />
          <span>Order Date: </span>
          <span>{detailsOrder.orderDate}</span>
          <br />
          <span>End Date: </span>
          <span>{detailsOrder.finish}</span>
          <br />
          <br />
          <p>#######################################</p>
          <p>Thank you for ordering</p>
        </div>
      )}

      {detailsOrder && infoOrder && (
        <div>
          <button className="btn btn-primary">Send to customer</button>
          <button className="btn btn-danger" onClick={backToOngoing}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Finished;
