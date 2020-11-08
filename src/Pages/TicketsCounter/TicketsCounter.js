/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "@reach/router";
import AppContext from "../../context/context";
import Footer from "../../Components/Footer/Footer";
import SalesOrderInfo from "../../Components/SalesOrderInfo/SalesOrderInfo";
import Header from "../../Components/Header/Header";
import "./TicketsCounter.css";

const axios = require("axios");

function TicketsCounter() {
  const { salesOrder, setSalesOrder, setPurchasedSeats } = useContext(
    AppContext
  );
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
      setSalesOrder({
        ...salesOrder,
        totalPrice: newTotal,
        tickets: newCount,
        seatsAvailableForCurrentScreening,
      });
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

      const currentSeatAvailability = available.data.find(
        (seats) => seats.screening_id === salesOrder.screening_id
      );
      const seatsAvailable =
        salesOrder.totalSeats - currentSeatAvailability.purchasedSeats.length;
      setSeatsAvailableForCurrentScreening(seatsAvailable);
      setPurchasedSeats(currentSeatAvailability.purchasedSeats);

      const initialTotalPrice = salesOrder.price * count;
      setTotalPrice(initialTotalPrice);
      setSalesOrder({
        ...salesOrder,
        totalPrice: initialTotalPrice,
        availability_id: currentSeatAvailability._id,
      });
    }
    fetchSeatAvailableData();
  }, []);

  return (
    <div className="container">
      <Header />
      <SalesOrderInfo />
      {/* counter --------------------------*/}
      <div className="title-select-tickets">
        <h1>Välj biljetter</h1>
      </div>
      <div className="container_tickets">
        <div className="tickets_info">
          <h4>Typ</h4>
          <h5>Regelbunden</h5>
        </div>
        <div className="tickets_info">
          <h4>Pris</h4>
          <h5>
            {salesOrder.price}
            &nbsp; kr
          </h5>
        </div>
        <div className="tickets_info">
          <h4>Belopp</h4>
          <div className="buttons">
            <button className="button" type="button" onClick={decrementCounter}>
              <h2>-</h2>
            </button>
            <h5 className="count">{count}</h5>
            <button className="button" type="button" onClick={incrementCounter}>
              <h2>+</h2>
            </button>
          </div>
          <div className="seats-available">
            <p>
              Platser tillgängliga för denna screening: &nbsp;
              {seatsAvailableForCurrentScreening}
            </p>
          </div>
        </div>
        <div className="tickets_info">
          <h4>Total</h4>
          <h5>{totalPrice}</h5>
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
            <h3>Nästa</h3>
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default TicketsCounter;
