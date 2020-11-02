/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from "react"; // , useState }
import { useNavigate } from "@reach/router";
import AppContext from "../../context/context";
import SalesOrderInfo from "../../Components/SalesOrderInfo/SalesOrderInfo";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import "./Register.css";

function Register() {
  const { salesOrder, setSalesOrder } = useContext(AppContext);
  // 1. debe aparecer un cuadro tipo entrada con los datos de la compra
  // 2. un formulario para registrar nombre y correo
  // 3. verificar correo con regex
  // 4. usar mailChimp para enviar ese correo
  const navigate = useNavigate();

  function handleUserName(e) {
    setSalesOrder({
      ...salesOrder,
      userName: e.target.value,
    });
  }

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  };
  function handleUserEmail(e) {
    if (validateEmail(e.target.value)) {
      setSalesOrder({
        ...salesOrder,
        userEmail: e.target.value,
      });
    }
  }

  const handlGoToPayment = () => {
    navigate("/payment");
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
            onClick={handlGoToPayment}
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

export default Register;
