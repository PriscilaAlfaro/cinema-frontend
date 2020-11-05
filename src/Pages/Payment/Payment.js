import React, { useContext, useState } from "react";
import { useNavigate } from "@reach/router";
import AppContext from "../../context/context";
import SalesOrderInfo from "../../Components/SalesOrderInfo/SalesOrderInfo";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import "./Payment.css";

const axios = require("axios");

function Payment() {
  const { salesOrder } = useContext(AppContext);
  const [sucess] = useState(true);
  const navigate = useNavigate();

  const handlGoToThanks = () => {
    async function postOrderData() {
      await axios
        .post("http://localhost:4001/order", {
          name: salesOrder.userName,
          email: salesOrder.userEmail,
          location_id: salesOrder.location_id,
          location: salesOrder.location,
          movie_id: salesOrder.movie_id,
          movie: salesOrder.movie,
          date_id: salesOrder.date_id,
          date: salesOrder.date,
          screening_id: salesOrder.screening_id,
          screening: salesOrder.screening,
          price: salesOrder.price,
          totalPrice: salesOrder.totalPrice,
          seatNumber: salesOrder.selectedSeats,
          paymentReference: "123",
          paymentStatus: "suceed",
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    async function postAvailabilityData() {
      await axios
        .patch(
          `http://localhost:4001/seatAvailability/${salesOrder.availability_id}`,
          {
            screening_id: salesOrder.screening_id,
            purchasedSeats: salesOrder.selectedSeats,
          }
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    postOrderData();
    postAvailabilityData();
    navigate("/thanks");
  };
  return (
    <div className="main-container">
      <Header />
      {/* -----------salesOrderInfo ---------------*/}
      <SalesOrderInfo />
      <h2>
        Tickets: &nbsp;
        {salesOrder.tickets}
      </h2>
      <h2>
        Seats selected: &nbsp;
        {salesOrder.selectedSeats.map((seat) => ` ${seat} *`)}
      </h2>

      {/* -----------PAYMENT-STRIPE--------------*/}
      {sucess && (
        <div className="container-form">
          <h1>Payment</h1>
        </div>
      )}

      {/* -----------NEXTBUTTON ---------------*/}

      <div>
        <button className="next-button" onClick={handlGoToThanks} type="button">
          <h2>Next</h2>
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default Payment;
