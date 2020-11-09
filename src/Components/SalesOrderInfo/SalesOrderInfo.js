import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import AppContext from "../../context/context";
import "./SalesOrderInfo.css";

function SalesOrderInfo() {
  const { t } = useTranslation();
  const { salesOrder } = useContext(AppContext);

  return (
    <div className="salesOrder_information">
      <div className="info">
        <h3>
          {t("movie")}
          :&nbsp;
          {salesOrder.movie}
        </h3>
      </div>
      <div className="info">
        <h3>
          {t("place")}
          :&nbsp;
          {salesOrder.location}
          &#45; &nbsp;
          {salesOrder.place}
        </h3>
      </div>
      <div className="info">
        <h3>
          {t("screen")}
          :&nbsp;
          {salesOrder.salong}
        </h3>
      </div>
      <div className="info">
        <h3>
          {t("date")}
          :&nbsp;
          {salesOrder.date}
        </h3>
      </div>
      <div className="info">
        <h3>
          {t("hour")}
          :&nbsp;
          {salesOrder.screening}
        </h3>
      </div>
    </div>
  );
}

export default SalesOrderInfo;
