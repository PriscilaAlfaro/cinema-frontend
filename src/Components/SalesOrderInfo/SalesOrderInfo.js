import React, { useContext } from "react";
import AppContext from "../../context/context";
import "./SalesOrderInfo.css";

function SalesOrderInfo() {
  const { salesOrder } = useContext(AppContext);

  return (
    <div className="salesOrder_information">
      <div className="info">
        <h3>
          Movie: &nbsp;
          {salesOrder.movie}
        </h3>
      </div>
      <div className="info">
        <h3>
          Location: &nbsp;
          {salesOrder.location}
        </h3>
      </div>
      <div className="info">
        <h3>
          Date: &nbsp;
          {salesOrder.date}
        </h3>
      </div>
      <div className="info">
        <h3>
          Hour: &nbsp;
          {salesOrder.screening}
        </h3>
      </div>
    </div>
  );
}

export default SalesOrderInfo;
