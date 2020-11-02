/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useState } from "react";
import { useNavigate } from "@reach/router";
import AppContext from "../../context/context";
import SalesOrderInfo from "../../Components/SalesOrderInfo/SalesOrderInfo";
import Footer from "../../Components/Footer/Footer";
import "./Seats.css";

function Seats() {
  const { salesOrder, setSalesOrder, purchasedSeats } = useContext(AppContext);
  const [totalAmountOfSeats] = useState(
    Array.from({ length: salesOrder.totalSeats }, (_, i) => i + 1)
  );
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  function removeSeat(seat) {
    const foundIndex = selectedSeats.indexOf(seat);
    if (foundIndex > -1) {
      const currentSeats = [...selectedSeats];
      currentSeats.splice(foundIndex, 1);
      setSelectedSeats(currentSeats);
    }
  }

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
    setSalesOrder({
      ...salesOrder,
      selectedSeats: [...selectedSeats, seatNumber],
    });
  }

  const handlGoToRegister = () => {
    navigate("/register");
  };

  // 2. aqui tiene que hacerse otro fecth y comparar si los asientos selected ya estan o no comprados

  return (
    <div className="main-container">
      <SalesOrderInfo />
      <h1>
        Tickets: &nbsp;
        {salesOrder.tickets}
      </h1>
      {/* -----------------legend ------------------*/}
      <div>
        <ul className="legend">
          <li>
            <div className="seat" />
            <small>N/A</small>
          </li>
          <li>
            <div className="seat selected" />
            <small>Selected</small>
          </li>
          <li>
            <div className="seat occupied" />
            <small>Occupied</small>
          </li>
        </ul>
      </div>
      {/* -----------------legend ------------------*/}
      <div>
        <div className="screen" />
      </div>
      <div>
        <div className="row">
          {totalAmountOfSeats &&
            totalAmountOfSeats.map((seatNumber) => (
              <div
                className={`seat 
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
        <p className="text">
          {selectedSeats.length === 1 && (
            <div>
              You have selected the seat number: &nbsp;
              {`${selectedSeats} `}
            </div>
          )}
          {selectedSeats.length > 1 && (
            <div>
              You have selected the seats number: &nbsp;
              {`${selectedSeats} `}
            </div>
          )}
        </p>
      </div>

      {/* next --------------------------*/}
      {selectedSeats.length > 0 && (
        <div>
          <button
            className="next-button"
            onClick={handlGoToRegister}
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

export default Seats;
