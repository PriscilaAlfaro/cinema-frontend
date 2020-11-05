import React from "react";
import { useNavigate } from "@reach/router";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import "./Thanks.css";

function Thanks() {
  const navigate = useNavigate();
  // Aqui va toda la logica de consultar a la vase de datos por la orden que tiene el sesionId
  // y cambiar el pending a sucess

  // const sesion_id = new URLSearchParams(window.location.search).get("session_id");

  const handlGoToHome = () => {
    navigate("/");
  };
  return (
    <div className="main-container">
      <Header />
      <div className="thanks">
        <h1>Thanks for your order!</h1>
      </div>

      <div className="email">
        <h5>
          We appreciate your business! If you have any questions, please email:
          &nbsp;
          <a href="mailto:cinema_cr@outlook.com">cinema_cr@outlook.com</a>
        </h5>
      </div>
      <button className="home" onClick={handlGoToHome} type="button">
        <h1>Go to Cinema CR</h1>
      </button>
      <Footer />
    </div>
  );
}

export default Thanks;
