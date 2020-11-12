import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import AppContext from "../../store/context";
import Footer from "../../Components/Footer/Footer";
import SalesOrderInfo from "../../Components/SalesOrderInfo/SalesOrderInfo";
import Header from "../../Components/Header/Header";
import "./TicketsCounter.css";

const axios = require("axios");

function TicketsCounter() {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(AppContext);
  const { salesOrder } = state;

  const [ticketCount, setTicketCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [
    seatsAvailableForCurrentScreening,
    setSeatsAvailableForCurrentScreening,
  ] = useState(0);

  const navigate = useNavigate();

  const fetchSeatAvailableData = async () => {
    const available = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/seatAvailability`
    );

    // find the correct seatAvalability accoding to screennig id
    const currentSeatAvailability = available.data.find(
      (seats) => seats.screening_id === salesOrder.screening_id
    );
    dispatch({
      type: "setPurchasedSeats",
      data: currentSeatAvailability.purchasedSeats,
    });

    const seatsAvailable =
      salesOrder.totalSeats - currentSeatAvailability.purchasedSeats.length;
    setSeatsAvailableForCurrentScreening(seatsAvailable);

    const initialTotalPrice = salesOrder.price * ticketCount;
    setTotalPrice(initialTotalPrice);
    dispatch({
      type: "setSalesOrder",
      data: {
        totalPrice: initialTotalPrice,
        availability_id: currentSeatAvailability._id,
      },
    });
  };

  useEffect(() => {
    fetchSeatAvailableData();
  }, []);

  const incrementCounter = () => {
    if (ticketCount < seatsAvailableForCurrentScreening) {
      const newCount = ticketCount + 1;
      const newTotal = salesOrder.price * newCount;
      setTicketCount(newCount);
      setTotalPrice(newTotal);

      dispatch({
        type: "setSalesOrder",
        data: {
          totalPrice: newTotal,
          tickets: newCount,
          seatsAvailableForCurrentScreening,
        },
      });
    }
  };

  const decrementCounter = () => {
    if (ticketCount > 0) {
      const newCount = ticketCount - 1;
      const newTotal = salesOrder.price * newCount;
      setTicketCount(newCount);
      setTotalPrice(newTotal);
      dispatch({
        type: "setSalesOrder",
        data: {
          totalPrice: newTotal,
          tickets: newCount,
        },
      });
    }
  };

  const handlGoToSeats = () => {
    navigate("/seats");
  };

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
            <h5 className="count">{ticketCount}</h5>
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
          <h5>
            {totalPrice}
            &nbsp; kr
          </h5>
        </div>
      </div>
      {/* next --------------------------*/}
      {ticketCount > 0 && (
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
