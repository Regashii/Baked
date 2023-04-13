const Request = () => {
  const orders = [
    "order1",
    "order2",
    "order3",
    "order4",
    "order5",
    "order6",
    "order7",
    "order8",
    "order9",
    "order10",
  ];
  return (
    <div className="Pages1">
      <header>
        <h1>Request</h1>
      </header>
      <body>
        {orders.map((order) => (
          <div className="order">{order}</div>
        ))}
      </body>
    </div>
  );
};

export default Request;
