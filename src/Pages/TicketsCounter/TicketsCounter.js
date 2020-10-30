import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../context/context";
import Footer from "../../Components/Footer/Footer";
import "./TicketsCounter.css";

function TicketsCounter() {
  const { salesOrder, setSalesOrder } = useContext(AppContext);
  const [count, setCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [price] = useState(15);

  const incrementCounter = () => {
    if (count < 25) {
      setCount(count + 1);
    }
  };

  const decrementCounter = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    setTotalPrice(price * count);
    setSalesOrder({ ...salesOrder, tickets: count, total: totalPrice });
  }, [price, count, setSalesOrder, salesOrder, totalPrice]);

  return (
    <div className="container">
      {/* sales order info --------------------------*/}
      <div className="salesOrder_information" />
      <h1>Boka biljetter</h1>
      <h3>
        Movie: &nbsp;
        {salesOrder.movie}
      </h3>
      <h3>
        Location: &nbsp;
        {salesOrder.location}
      </h3>
      <h3>
        Date: &nbsp;
        {salesOrder.date}
      </h3>
      <h3>
        Hour: &nbsp;
        {salesOrder.hour}
      </h3>
      {/* counter --------------------------*/}
      <div>
        <h5>Select tickets </h5>
      </div>
      <div className="grid-container">
        <div className="grid-item">
          <h4>Type</h4>
          <h5>Regular</h5>
        </div>
        <div className="grid-item">
          <h4>Price</h4>
          <h5>{price}</h5>
        </div>
        <div className="grid-item">
          <h4>Amount</h4>
          <div className="buttons">
            <button className="button" type="button" onClick={decrementCounter}>
              <h2>-</h2>
            </button>
            <h5 className="count">{count}</h5>
            <button className="button" type="button" onClick={incrementCounter}>
              <h2>+</h2>
            </button>
          </div>
        </div>
        <div className="grid-item">
          <h4>Total</h4>
          <h4>{totalPrice}</h4>
        </div>
      </div>
      {/* counter --------------------------*/}
      {count > 0 && (
        <div>
          <button className="next-button" type="button">
            <h2>Next</h2>
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default TicketsCounter;
