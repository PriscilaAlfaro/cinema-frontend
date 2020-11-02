import React, { useContext } from "react";
import { useNavigate } from "@reach/router";
import AppContext from "../../context/context";
import SalesOrderInfo from "../../Components/SalesOrderInfo/SalesOrderInfo";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import "./Payment.css";

function Payment() {
  const { salesOrder } = useContext(AppContext);

  const navigate = useNavigate();
  const handlGoToThanks = () => {
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
        {" "}
        Seats selected: &nbsp;
        {salesOrder.selectedSeats.map((seat) => ` ${seat} *`)}
      </h2>

      {/* -----------PAYMENT-STRIPE--------------*/}
      <div className="container-form">
        <h1>Payment</h1>
      </div>

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
