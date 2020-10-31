import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "@reach/router";
import AppContext from "../../context/context";
import Footer from "../../Components/Footer/Footer";
import SalesOrderInfo from "../../Components/SalesOrderInfo/SalesOrderInfo";
import "./TicketsCounter.css";

const axios = require("axios");

function TicketsCounter() {
  const {
    salesOrder,
    setSalesOrder,
    setTransations,
    transactions,
  } = useContext(AppContext);
  const [count, setCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [price] = useState(15);

  const navigate = useNavigate();

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

  const handlGoToSeats = () => {
    navigate("/seats");
  };
  useEffect(() => {
    async function fetchtransationsData() {
      const trans = await axios.get("http://localhost:4001/transations");
      setTransations(trans.data);
    }
    fetchtransationsData();
    setTotalPrice(price * count);
    setSalesOrder({ ...salesOrder, tickets: count, total: totalPrice });
  }, [price, count, setSalesOrder, salesOrder, totalPrice, setTransations]);

  return (
    <div className="container">
      <SalesOrderInfo />
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
          <h5>{transactions.price}</h5>
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
      {/* next --------------------------*/}
      {count > 0 && (
        <div>
          <button
            className="next-button"
            onClick={handlGoToSeats}
            type="button"
          >
            <h2>Next</h2>
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default TicketsCounter;
