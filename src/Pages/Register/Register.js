/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useTranslation } from "react-i18next";
import AppContext from "../../context/context";
import SalesOrderInfo from "../../Components/SalesOrderInfo/SalesOrderInfo";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import "./Register.css";

const axios = require("axios");

let stripePromise;

function Register() {
  const { t } = useTranslation();
  const { salesOrder, setSalesOrder } = useContext(AppContext);
  let errorInStripe;
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

  const handleUserPhone = (e) => {
    const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (e.target.value.match(phoneno)) {
      setSalesOrder({
        ...salesOrder,
        userPhone: e.target.value,
      });
    }
  };
  const handleUserEmail = (e) => {
    if (validateEmail(e.target.value)) {
      setSalesOrder({
        ...salesOrder,
        userEmail: e.target.value,
      });
    }
  };
  // hacer solo un fetch
  const postOrderData = async (sessionId) => {
    await axios.post("http://localhost:4001/order", {
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
    });
  };

  const postAvailabilityData = async () => {
    await axios.patch(
      `http://localhost:4001/seatAvailability/${salesOrder.availability_id}`,
      {
        screening_id: salesOrder.screening_id,
        purchasedSeats: salesOrder.selectedSeats,
      }
    );
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
      errorInStripe = result.error.message;
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
              <p>{t("movie")}</p>
            </div>
            <div className="location">
              <h3>
                {salesOrder.location}
                &#45; &nbsp;
                {salesOrder.place}
              </h3>
              <p>{t("place")}</p>
            </div>

            <div className="inline">
              <div className="date">
                <h3>{salesOrder.date}</h3>
                <p>{t("date")}</p>
              </div>
              <div className="time">
                <h3>{salesOrder.screening}</h3>
                <p>{t("hour")}</p>
              </div>
              <div className="salong">
                <h3>{salesOrder.salong}</h3>
                <p>{t("screen")}</p>
              </div>
              <div className="seats">
                {salesOrder.selectedSeats.length === 1 && (
                  <>
                    <h3>
                      {salesOrder.selectedSeats.map((seat) => `${seat} `)}
                    </h3>
                    <p>{t("seat")}</p>
                  </>
                )}
                {salesOrder.selectedSeats.length > 1 && (
                  <>
                    <h3>
                      {salesOrder.selectedSeats.map((seat) => `*${seat} `)}
                    </h3>
                    <p>{t("seats")}</p>
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
              {t("fullName")}
              :&nbsp;
            </label>
            <input
              className="input"
              id="name"
              placeholder={t("fullName")}
              name="name"
              autoComplete="name"
              type="text"
              onChange={handleUserName}
            />
          </div>
          <div className="email">
            <label htmlFor="email" className="label">
              {t("email")}
              :&nbsp;
            </label>
            <input
              className="input"
              id="email"
              placeholder="example@sample.com"
              name="email"
              autoComplete="email"
              type="email"
              onChange={handleUserEmail}
            />
          </div>
          <div className="phone">
            <label htmlFor="phone" className="label">
              {t("telephone")}
              :&nbsp;
            </label>
            <input
              className="input"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
              id="phone"
              placeholder="012-123-12-12"
              name="phone"
              autoComplete="phone"
              type="tel"
              required
              onChange={handleUserPhone}
            />
          </div>
        </form>
      </div>

      {/* -----------NEXTBUTTON ---------------*/}
      {salesOrder.userName && salesOrder.userEmail && salesOrder.userPhone && (
        <div>
          <button
            className="next-button"
            onClick={callStripeCheckout}
            type="button"
            role="link"
          >
            <h2>{t("checkout")}</h2>
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Register;
