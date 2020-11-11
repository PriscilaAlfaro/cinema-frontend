/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import AppContext from "../../context/context";
import Footer from "../../Components/Footer/Footer";
import SalesOrderInfo from "../../Components/SalesOrderInfo/SalesOrderInfo";
import Header from "../../Components/Header/Header";
import "./TicketsCounter.css";

const axios = require("axios");

function TicketsCounter() {
  const { t } = useTranslation();
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
    const fetchSeatAvailableData = async () => {
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
    };
    fetchSeatAvailableData();
  }, []);

  return (
    <div className="container">
      <Header />
      <SalesOrderInfo />
      {/* counter --------------------------*/}
      <div className="title-select-tickets">
        <h1>{t("numberOfTikects")}</h1>
      </div>
      <div className="container_tickets">
        <div className="tickets_info">
          <h4>{t("type")}</h4>
          <h5>{t("regular")}</h5>
        </div>
        <div className="tickets_info">
          <h4>{t("price")}</h4>
          <h5>
            {salesOrder.price}
            &nbsp; kr
          </h5>
        </div>
        <div className="tickets_info">
          <h4>{t("amount")}</h4>
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
              {t("seatsAvailableForScreen")}
              :&nbsp;
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
            <h3>{t("next")}</h3>
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default TicketsCounter;
