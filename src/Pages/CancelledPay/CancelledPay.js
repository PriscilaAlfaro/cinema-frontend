import React, { useEffect } from "react";
import { useNavigate } from "@reach/router";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import "./CancelledPay.css";

const axios = require("axios");

function CancelledPay() {
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    async function deleteOrderData() {
      await axios.delete(`http://localhost:4001/order/${sessionId}`);
    }

    deleteOrderData();
  }, []);

  const handlGoToHomeFromCancelled = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="main-container">
      <Header />
      <div className="text">
        <h1>Din beställning i Cinema CR avbröts</h1>
        <h3>
          Om du har problem med att avbryta beställningen
          <br />
          kontakta e-postmeddelandet cinema_cr@outlok.com
        </h3>
      </div>
      <div>
        <button
          className="goHome"
          onClick={handlGoToHomeFromCancelled}
          type="button"
        >
          <h1>Gå till Cinema CR</h1>
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default CancelledPay;
