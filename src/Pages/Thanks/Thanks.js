import React, { useEffect, useState } from "react";
import { useNavigate } from "@reach/router";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import "./Thanks.css";

const axios = require("axios");

function Thanks() {
  const navigate = useNavigate();
  const [finalOrder, setFinalOrder] = useState({});

  // llevar el final order a que se pueda descargar

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

  return (
    <div className="main-container">
      <Header />
      <div className="thanks">
        <h1>
          Thanks for your order &nbsp;
          {finalOrder.name}
        </h1>
      </div>

      <div className="email">
        <h5>
          Your tickets will be sent to &nbsp;
          {finalOrder.email}
          <br />
          Or you can download your tickets here &gt; &nbsp;
          <button className="download" type="button">
            <h1>Download Tickets</h1>
          </button>
        </h5>
        <h5>We appreciate your business!</h5>
        <h6>
          If you have any questions, please email: &nbsp;
          <a href="mailto:cinema_cr@outlook.com">cinema_cr@outlook.com</a>
        </h6>
      </div>
      <button className="home" onClick={handlGoToHomeFromThanks} type="button">
        <h1>Go to Cinema CR</h1>
      </button>
      <Footer />
    </div>
  );
}

export default Thanks;
