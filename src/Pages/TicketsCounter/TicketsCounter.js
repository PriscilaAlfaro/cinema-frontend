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
    setSeatAvailability,
    setPurchasedSeats,
  } = useContext(AppContext);
  const [count, setCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [
    seatsAvailableForCurrentScreening,
    setSeatsAvailableForCurrentScreening,
  ] = useState(0);

  const navigate = useNavigate();

  const incrementCounter = () => {
    if (count < seatsAvailableForCurrentScreening) {
      const newCount = count + 1;
      const newTotal = salesOrder.price * newCount;
      setCount(newCount);
      setTotalPrice(newTotal);
      setSalesOrder({ ...salesOrder, totalPrice: newTotal, tickets: newCount });
    }
  };

  const decrementCounter = () => {
    if (count > 0) {
      const newCount = count - 1;
      const newTotal = salesOrder.price * newCount;
      setCount(newCount);
      setTotalPrice(newTotal);
      setSalesOrder({ ...salesOrder, totalPrice: newTotal, tickets: newCount });
    }
  };

  const handlGoToSeats = () => {
    navigate("/seats");
  };

  useEffect(() => {
    async function fetchSeatAvailableData() {
      const available = await axios.get(
        "http://localhost:4001/seatAvailability"
      );
      setSeatAvailability(available.data);

      const currentSeatAvailability = available.data.find(
        (seats) => seats.screening_id === salesOrder.screening_id
      );
      const seatsAvailable =
        salesOrder.totalSeats - currentSeatAvailability.purchasedSeats.length;
      setSeatsAvailableForCurrentScreening(seatsAvailable);
      setPurchasedSeats(currentSeatAvailability.purchasedSeats);
    }
    fetchSeatAvailableData();
    const initialTotalPrice = salesOrder.price * count;
    setTotalPrice(initialTotalPrice);
    setSalesOrder({
      ...salesOrder,
      totalPrice: initialTotalPrice,
    });
  }, []);

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
          <h5>{salesOrder.price}</h5>
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
