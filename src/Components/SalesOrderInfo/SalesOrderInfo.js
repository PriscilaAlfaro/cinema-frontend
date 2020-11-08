import React, { useContext } from "react";
import AppContext from "../../context/context";
import "./SalesOrderInfo.css";

function SalesOrderInfo() {
  const { salesOrder } = useContext(AppContext);

  return (
    <div className="salesOrder_information">
      <div className="info">
        <h3>
          Film: &nbsp;
          {salesOrder.movie}
        </h3>
      </div>
      <div className="info">
        <h3>
          Plats: &nbsp;
          {salesOrder.location}
          &#45; &nbsp;
          {salesOrder.place}
        </h3>
      </div>
      <div className="info">
        <h3>
          Salong: &nbsp;
          {salesOrder.salong}
        </h3>
      </div>
      <div className="info">
        <h3>
          Datum: &nbsp;
          {salesOrder.date}
        </h3>
      </div>
      <div className="info">
        <h3>
          Timm: &nbsp;
          {salesOrder.screening}
        </h3>
      </div>
    </div>
  );
}

export default SalesOrderInfo;
