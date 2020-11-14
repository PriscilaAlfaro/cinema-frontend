import React, { useContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useTranslation } from "react-i18next";
import AppContext from "../../store/context";
import SalesOrderInfo from "../../Components/SalesOrderInfo/SalesOrderInfo";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import "./Register.css";

const axios = require("axios");

let stripePromise;

function Register() {
  const { t, i18n } = useTranslation();
  const { state, dispatch } = useContext(AppContext);
  const { salesOrder } = state;
  const [error, setError] = useState(null);

  const validateEmail = (email) => {
    if (!email) {
      return false;
    }
    const validEmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validEmailRegex.test(email.toLowerCase());
  };

  const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) {
      return false;
    }
    const validPhoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return validPhoneRegex.test(phoneNumber);
  };

  const handleUserName = (e) => {
    dispatch({
      type: "setSalesOrder",
      data: {
        userName: e.target.value,
      },
    });
  };

  const handleUserPhone = (e) => {
    dispatch({
      type: "setSalesOrder",
      data: {
        userPhone: e.target.value,
      },
    });
  };

  const handleUserEmail = (e) => {
    dispatch({
      type: "setSalesOrder",
      data: {
        userEmail: e.target.value,
      },
    });
  };

  // this post save order and update seatAvailability
  const postOrderData = async (sessionId) => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/order`, {
      name: salesOrder.userName,
      email: salesOrder.userEmail,
      location_id: salesOrder.location_id,
      location: salesOrder.location,
      place: salesOrder.place,
      salong: salesOrder.salong,
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
      purchaseDate: new Date().toISOString(),
      availability_id: salesOrder.availability_id,
    });
  };

  stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);
  const callStripeCheckout = async () => {
    const stripe = await stripePromise;
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/stripe/create-checkout-session`,
      {
        product: "Cinema-tickets",
        price: salesOrder.price,
        amount: salesOrder.tickets,
        email: salesOrder.email,
      }
    );
    const session = await response.data;
    const orderResponse = postOrderData(session.id);

    if (!orderResponse.order) {
      setError({
        es: "Error el sistema, por favor reingrese la información nuevamente.",
        sv: "Systemfel, skriv in informationen igen.",
      });
    }

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      setError(result.error.message);
    }
  };

  const currentLanguage = i18n.language;
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
      {/* -----------ERROR---------------*/}
      {error && (
        <div className="error">
          <h1>{error[currentLanguage]}</h1>
        </div>
      )}

      {/* -----------FORM---------------*/}

      <div className="personal_info">
        <h2>{t("completePersonalInformation")}</h2>
      </div>
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
            {!validateEmail(salesOrder.userEmail) && (
              <p>{t("validPhoneNumber")}</p>
            )}
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
            {!validatePhoneNumber(salesOrder.userPhone) && (
              <p>{t("validEmail")}</p>
            )}
          </div>
        </form>
      </div>

      {/* -----------NEXTBUTTON ---------------*/}
      {salesOrder.userName &&
        validateEmail(salesOrder.userEmail) &&
        validatePhoneNumber(salesOrder.userPhone) && (
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
      {/* -----------Error ---------------*/}

      <Footer />
    </div>
  );
}

export default Register;
