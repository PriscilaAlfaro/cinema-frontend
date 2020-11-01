import React, { useContext } from "react";
import AppContext from "../../context/context";
import "./SalesOrderInfo.css";

function SalesOrderInfo() {
  const { salesOrder } = useContext(AppContext);

  return (
    <div className="salesOrder_information">
      <h1>Boka biljetter</h1>
      <h3>
        Movie: &nbsp;
        {salesOrder.movie}
      </h3>
      <h3>
        Location: &nbsp;
        {salesOrder.location}
      </h3>
      <h3>
        Date: &nbsp;
        {salesOrder.date}
      </h3>
      <h3>
        Hour: &nbsp;
        {salesOrder.screening}
      </h3>
    </div>
  );
}

export default SalesOrderInfo;
