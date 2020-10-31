import React, { useContext } from "react";
import AppContext from "../../context/context";
import SalesOrderInfo from "../../Components/SalesOrderInfo/SalesOrderInfo";
import Footer from "../../Components/Footer/Footer";
import "./Seats.css";

function Seats() {
  const { salesOrder } = useContext(AppContext);

  return (
    <div className="container">
      <SalesOrderInfo />
      <h1>
        Tickets: &nbsp;
        {salesOrder.tickets}
      </h1>
      <Footer />
    </div>
  );
}

export default Seats;
