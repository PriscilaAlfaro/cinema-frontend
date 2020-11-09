import React, { useEffect, useState } from "react";
import { useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import "./Thanks.css";

const axios = require("axios");

function Thanks() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [finalOrder, setFinalOrder] = useState({});

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    async function UpdateOrderData() {
      const updateOrder = await axios.patch(
        `http://localhost:4001/order/${sessionId}`,
        {
          newPaymentStatus: "sucess",
        }
      );
      setFinalOrder(updateOrder.data.order);
    }

    UpdateOrderData();
  }, []);

  const handlGoToHomeFromThanks = () => {
    navigate("/", { replace: true });
  };

  const showPrintOption = () => {
    window.print();
  };
  return (
    <div className="main-container">
      <Header />
      <div className="thanks">
        <h1>
          {t("thanksForyYourOrder")}
          &nbsp;
          {finalOrder.name}
        </h1>
        <h2>Los datos de su orden son los siguientes:</h2>
        <h5>
          {t("movie")}
          :&nbsp;
          {finalOrder.movie}
        </h5>
        <h5>
          {t("place")}
          :&nbsp;
          {finalOrder.location}
          &#45; &nbsp;
          {finalOrder.place}
        </h5>
        <h5>
          {t("screen")}
          :&nbsp;
          {finalOrder.salong}
        </h5>
        <h5>
          {t("date")}
          :&nbsp;
          {finalOrder.date}
        </h5>
        <h3>
          {t("hour")}
          :&nbsp;
          {finalOrder.screening}
        </h3>
      </div>

      <div className="thanks_email">
        <h5>
          {t("tickectsSentTo")}
          &nbsp;
          {finalOrder.email}
          <br />
          {t("youCanDownloadHere")}
          &gt; &nbsp;
          <button className="download" onClick={showPrintOption} type="button">
            <h1>{t("tickets")}</h1>
          </button>
        </h5>
        <h5>{t("thanksTorYourElection")}</h5>
        <h6>
          {t("ifQuestions")}
          :&nbsp;
          <a href="mailto:cinema_cr@outlook.com">cinema_cr@outlook.com</a>
        </h6>
      </div>
      <button className="home" onClick={handlGoToHomeFromThanks} type="button">
        <h1>{t("goToCinemaCr")}</h1>
      </button>
      <Footer />
    </div>
  );
}

export default Thanks;
