import React, { useContext, useState } from "react";
import { useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import AppContext from "../../store/context";
import SalesOrderInfo from "../../Components/SalesOrderInfo/SalesOrderInfo";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import BackButton from "../../Components/BackButton/BackButton";
import "./Seats.css";

function Seats() {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(AppContext);
  const { salesOrder, purchasedSeats } = state;
  const [totalAmountOfSeats] = useState(
    Array.from({ length: salesOrder.totalSeats }, (_, i) => i + 1)
  );
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  const removeSeat = (seat) => {
    const foundIndex = selectedSeats.indexOf(seat);
    if (foundIndex > -1) {
      const currentSeats = [...selectedSeats];
      currentSeats.splice(foundIndex, 1);
      setSelectedSeats(currentSeats);
    }
  };

  function handleSelectedSeat(seatNumber) {
    // case already puschased
    if (purchasedSeats.includes(seatNumber)) {
      return;
    }
    // case already selected
    if (selectedSeats.includes(seatNumber)) {
      removeSeat(seatNumber);
      return;
    }
    // case maximun seats
    if (selectedSeats.length === salesOrder.tickets) {
      return;
    }
    // case selected
    setSelectedSeats([...selectedSeats, seatNumber]);

    dispatch({
      type: "setSalesOrder",
      data: {
        selectedSeats: [...selectedSeats, seatNumber],
      },
    });
  }

  const handlGoToRegister = () => {
    navigate("/register");
  };

  const handlGoToTickets = () => {
    navigate("/tickets");
  };

  return (
    <div className="main-container">
      <Header />
      <BackButton onClick={handlGoToTickets} />
      <SalesOrderInfo />
      <div className="tickets-buy">
        <h1>
          {t("tickets")}
          :&nbsp;
          {salesOrder.tickets}
        </h1>
        <h1>{t("chooseYourSeats")}</h1>
      </div>
      {/* -----------------legend ------------------*/}
      <div>
        <ul className="legend">
          <li>
            <div className="seat" />
            <small>{t("available")}</small>
          </li>
          <li>
            <div className="seat selected" />
            <small>{t("selected")}</small>
          </li>
          <li>
            <div className="seat occupied" />
            <small>{t("ocuppied")}</small>
          </li>
        </ul>
      </div>
      {/* -----------------legend ------------------*/}
      <div>
        <div className="screen">{t("screenSquare")}</div>
      </div>
      <div>
        <div className="row">
          {totalAmountOfSeats &&
            totalAmountOfSeats.map((seatNumber) => (
              <div
                data-testid="seat-grid"
                className={`seat } 
                ${purchasedSeats.includes(seatNumber) ? "occupied" : ""} ${
                  selectedSeats.includes(seatNumber) ? "selected" : ""
                }`}
                type="button"
                onClick={() => handleSelectedSeat(seatNumber)}
                key={seatNumber}
              >
                {seatNumber}
              </div>
            ))}
        </div>
        <div className="text">
          {selectedSeats.length === 1 && (
            <div data-testid="seat-selected">
              {t("youSelectSeatSingular")}
              :&nbsp;
              {`${selectedSeats} `}
            </div>
          )}
          {selectedSeats.length > 1 && (
            <div>
              {t("youSelectSeatsPlural")}
              :&nbsp;
              {`${selectedSeats} `}
            </div>
          )}
        </div>
      </div>

      {/* next --------------------------*/}
      {selectedSeats.length === salesOrder.tickets && (
        <div>
          <button
            data-testid="goToRegister"
            className="next-button"
            onClick={handlGoToRegister}
            type="button"
          >
            <h2>{t("next")}</h2>
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Seats;
