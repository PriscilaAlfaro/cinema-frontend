/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import AppContext from "../../context/context";
import SalesOrderInfo from "../../Components/SalesOrderInfo/SalesOrderInfo";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import "./Register.css";

const axios = require("axios");

let stripePromise;

function Register() {
  const { salesOrder, setSalesOrder } = useContext(AppContext);

  useEffect(() => {
    async function fetchApiKey() {
      const key = await axios.get("http://localhost:4001/stripe/key");
      stripePromise = loadStripe(key.data.publishableApiKey);
    }
    fetchApiKey();
  }, []);

  const handleUserName = (e) => {
    setSalesOrder({
      ...salesOrder,
      userName: e.target.value,
    });
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  };

  const handleUserEmail = (e) => {
    if (validateEmail(e.target.value)) {
      setSalesOrder({
        ...salesOrder,
        userEmail: e.target.value,
      });
    }
  };

  const postOrderData = async (sessionId) => {
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
        paymentReference: sessionId,
        paymentStatus: "pending",
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const postAvailabilityData = async () => {
    await axios
      .patch(
        `http://localhost:4001/seatAvailability/${salesOrder.availability_id}`,
        {
          screening_id: salesOrder.screening_id,
          purchasedSeats: salesOrder.selectedSeats,
        }
      )
      .catch((e) => {
        console.log(e);
      });
  };

  const callStripeCheckout = async () => {
    const stripe = await stripePromise;
    const response = await axios.post(
      "http://localhost:4001/stripe/create-checkout-session",
      {
        product: "Cinema-tickets",
        price: salesOrder.price,
        amount: salesOrder.tickets,
        email: salesOrder.email,
      }
    );
    const session = await response.data;
    postOrderData(session.id);
    postAvailabilityData();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error.message);
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return (
    <div className="main-container">
      <Header />
      <SalesOrderInfo />
      {/* -----------TIKECT ---------------*/}
      <div className="ticket-info">
        <div className="cardWrap">
          <div className="card">
            <h2>
              Cinema&nbsp;
              <span>CR</span>
            </h2>
            <div className="title">
              <h3>{salesOrder.movie}</h3>
              <p>movie</p>
            </div>
            <div className="location">
              <h3>{salesOrder.location}</h3>
              <p>location</p>
            </div>
            <div className="inline">
              <div className="date">
                <h3>{salesOrder.date}</h3>
                <p>date</p>
              </div>
              <div className="time">
                <h3>{salesOrder.screening}</h3>
                <p>time</p>
              </div>
              <div className="seats">
                {salesOrder.selectedSeats.length === 1 && (
                  <>
                    <h3>
                      {salesOrder.selectedSeats.map((seat) => `${seat} `)}
                    </h3>
                    <p>seat</p>
                  </>
                )}
                {salesOrder.selectedSeats.length > 1 && (
                  <>
                    <h3>
                      {salesOrder.selectedSeats.map((seat) => `*${seat} `)}
                    </h3>
                    <p>seats</p>
                  </>
                )}
              </div>
            </div>
            <div className="barcode" />
          </div>
        </div>
      </div>

      {/* -----------FORM---------------*/}
      <div className="container-form">
        <form className="form">
          <div className="name">
            <label htmlFor="name" className="label">
              Name:
            </label>
            <input
              className="name-input"
              id="name"
              placeholder="name"
              name="firstName"
              autoComplete="name"
              type="text"
              onChange={handleUserName}
            />
          </div>
          <div className="email">
            <label htmlFor="email" className="label">
              Email:
            </label>
            <input
              className="email-input"
              id="email"
              placeholder="e-mail"
              name="email"
              autoComplete="email"
              onChange={handleUserEmail}
            />
          </div>
        </form>
      </div>

      {/* -----------NEXTBUTTON ---------------*/}
      {salesOrder.userName && salesOrder.userEmail && (
        <div>
          <button
            className="next-button"
            onClick={callStripeCheckout}
            type="button"
            role="link"
          >
            <h2>Checkout</h2>
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Register;
