import React from "react";
import { useNavigate } from "@reach/router";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import "./CancelledPay.css";

function CancelledPay() {
  const navigate = useNavigate();

  const handlGoToHome = () => {
    navigate("/");
  };

  return (
    <div className="main-container">
      <Header />
      <div className="text">
        <h1>Your order in Cinema CR was cancelled</h1>
        <h3>
          Si usted enfrento problemas a la hora de cancelar la orden
          <br />
          por favor comuniquese al correo cinema_cr@outlok.com
        </h3>
      </div>
      <div>
        <button className="goHome" onClick={handlGoToHome} type="button">
          <h1>Go to Cinema CR</h1>
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default CancelledPay;
