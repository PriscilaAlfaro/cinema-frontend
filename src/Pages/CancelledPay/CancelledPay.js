import React, { useEffect } from "react";
import { useNavigate, useLocation } from "@reach/router";
import { useTranslation } from "react-i18next";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import "./CancelledPay.css";

const axios = require("axios");

function CancelledPay() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // this accion delete order and update seatAvailability
  const deleteOrderData = async (sessionId) => {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/order/${sessionId}`);
  };

  useEffect(() => {
    const sessionId = new URLSearchParams(location.search).get("session_id");

    deleteOrderData(sessionId);
  }, []);

  const handlGoToHomeFromCancelled = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="main-container-cancelled" data-testid="cancelled">
      <Header />
      <div className="text">
        <h1>{t("cancelledOrder")}</h1>
        <h3>
          {t("ifProblems")}
          <br />
          {t("emailContact")}
          &nbsp; cinema_cr@outlok.com
        </h3>
      </div>
      <div>
        <button
          className="goHome"
          data-testid="goHomeFromCancelled"
          onClick={handlGoToHomeFromCancelled}
          type="button"
        >
          <h1>{t("goToCinemaCr")}</h1>
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default CancelledPay;
