import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import AppContext from "../../store/context";
import "./SalesOrderInfo.css";

function SalesOrderInfo() {
  const { t } = useTranslation();
  const { state } = useContext(AppContext);
  const { salesOrder } = state;

  return (
    <div className="salesOrder_information">
      <div className="info">
        <h2 className="info_subtitle">
          {t("movie")}
          :&nbsp;
        </h2>
        <h3>{salesOrder.movie}</h3>
      </div>
      <div className="info">
        <h2 className="info_subtitle">
          {t("place")}
          :&nbsp;
        </h2>
        <h3>
          {salesOrder.location}
          &#45; &nbsp;
          {salesOrder.place}
        </h3>
      </div>
      <div className="info">
        <h2 className="info_subtitle">
          {t("screen")}
          :&nbsp;
        </h2>
        <h3>{salesOrder.salong}</h3>
      </div>
      <div className="info">
        <h2 className="info_subtitle">
          {t("date")}
          :&nbsp;
        </h2>
        <h3>{salesOrder.date}</h3>
      </div>
      <div className="info">
        <h2 className="info_subtitle">
          {t("hour")}
          :&nbsp;
        </h2>
        <h3>{salesOrder.screening}</h3>
      </div>
    </div>
  );
}

export default SalesOrderInfo;
