const History = () => {
  let sample1 = [
    {
      email: "ack@gmail.com",
      Cakes: "Bento Bundle",
      date: "2/11/2023",
    },
    {
      email: "arf@gmail.com",
      Cakes: "CupCake",
      date: "1/1/2023",
    },
  ];
  return (
    <div className="Pages3">
      <header>
        <h1>History</h1>
      </header>
      <div className="table3">
        <table>
          <thead>
            <tr>
              <th className="email">
                <b>Email</b>
              </th>
              <th className="cake">
                <b>Cakes</b>
                <select name="" id="">
                  <option value="choose">Sort</option>
                  <option value="bentoBundle">Bento Bundle</option>
                  <option value="minimaoptionstCake">
                    Minimaoptionst Cake
                  </option>
                  <option value="cakePopSicle">Cake (Pops & Sicle)</option>
                  <option value="cheesecakeSeries">Cheesecake Series</option>
                  <option value="cupcakes">Cupcakes</option>
                  <option value="moneyCake">Money Cake</option>
                  <option value="tierCake">Tier Cake</option>
                  <option value="bNumberCake">Bento Number Cake</option>
                  <option value="numberCake">Number Cake</option>
                  <option value="customizeCake">Customize Theme Cake</option>
                  <option value="pullapartCupcake">Pullapart Cupcake</option>
                  <option value="mNumberCake">Mini Number Cake</option>
                  <option value="bentoCake">Bento Cake</option>
                </select>
              </th>
              <th className="date">
                <b>Date</b>
                <input type="date" />
              </th>
            </tr>
          </thead>
          <tbody>
            {sample1.map((sample) => (
              <tr>
                <td>{sample.email}</td>
                <td>{sample.Cakes}</td>
                <td>{sample.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
