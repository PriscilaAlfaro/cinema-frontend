import React, { useEffect } from "react";
import { useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import "./CancelledPay.css";

const axios = require("axios");

function CancelledPay() {
  const { t } = useTranslation();
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
