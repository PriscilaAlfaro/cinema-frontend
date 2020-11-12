import React, { useEffect, useState } from "react";
import { useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import formatDay from "../../utils/utils";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import "./Thanks.css";

const axios = require("axios");

function Thanks() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [finalOrder, setFinalOrder] = useState({});

  const UpdateOrderData = async (sessionId) => {
    const updateOrder = await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/order/${sessionId}`,
      {
        newPaymentStatus: "sucess",
      }
    );
    console.log("finalOrder", updateOrder.data.order);
    setFinalOrder(updateOrder.data.order);
  };

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );

    UpdateOrderData(sessionId);
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
      {finalOrder.movie && (
        <>
          <div className="thanks">
            <h1>
              {t("thanksForyYourOrder")}
              &nbsp;
              {finalOrder.name}
            </h1>
            <h2>{t("detailsOfYourOrder")}</h2>
            <h3 className="order_detail_subtitle">
              {t("movie")}
              :&nbsp;
            </h3>
            <h4>{finalOrder.movie}</h4>

            <h3 className="order_detail_subtitle">
              {t("place")}
              :&nbsp;
            </h3>
            <h4>
              {finalOrder.location}
              &#45; &nbsp;
              {finalOrder.place}
            </h4>

            <h3 className="order_detail_subtitle">
              {t("tickets")}
              :&nbsp;
            </h3>
            <h4>{finalOrder.seatNumber.length}</h4>

            {finalOrder.seatNumber.length > 1 && (
              <>
                <h3 className="order_detail_subtitle">
                  {t("seats")}
                  :&nbsp;
                </h3>
                <h4>
                  {finalOrder.seatNumber.sort().map((seat) => `*${seat} `)}
                </h4>
              </>
            )}
            {finalOrder.seatNumber.length === 1 && (
              <>
                <h3 className="order_detail_subtitle">
                  {t("seat")}
                  :&nbsp;
                </h3>
                <h4>{finalOrder.seatNumber}</h4>
              </>
            )}
            <h3 className="order_detail_subtitle">
              {t("screen")}
              :&nbsp;
            </h3>
            <h4>{finalOrder.salong}</h4>

            <h3 className="order_detail_subtitle">
              {t("date")}
              :&nbsp;
            </h3>
            <h4>{finalOrder.date}</h4>

            <h3 className="order_detail_subtitle">
              {t("hour")}
              :&nbsp;
            </h3>
            <h4>{finalOrder.screening}</h4>

            <h3 className="order_detail_subtitle">
              {t("purchaseStatus")}
              :&nbsp;
            </h3>
            <h4>
              {finalOrder.paymentStatus.charAt(0).toUpperCase() +
                finalOrder.paymentStatus.slice(1)}
            </h4>

            <h3 className="order_detail_subtitle">
              {t("purchaseDate")}
              :&nbsp;
            </h3>
            <h4>{formatDay(finalOrder.purchaseDate)}</h4>

            <h3 className="order_detail_subtitle">
              {t("purchaseNumber")}
              :&nbsp;
            </h3>
            <h4>{finalOrder.paymentReference}</h4>
          </div>

          <div className="thanks_email">
            <h5>
              {t("tickectsSentTo")}
              &nbsp;
              {finalOrder.email}
              <br />
              {t("youCanDownloadHere")}
              &gt; &nbsp;
              <button
                className="download"
                onClick={showPrintOption}
                type="button"
              >
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
          <button
            className="home"
            onClick={handlGoToHomeFromThanks}
            type="button"
          >
            <h2>{t("goToCinemaCr")}</h2>
          </button>
        </>
      )}
      <Footer />
    </div>
  );
}

export default Thanks;
