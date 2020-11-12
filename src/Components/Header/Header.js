import React from "react";
import { useNavigate } from "@reach/router";
import "./Header.css";
import { useTranslation } from "react-i18next";

function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handlGoToHomeFromLogo = () => {
    navigate("/", { replace: true });
  };

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
  };

  return (
    <div className="header">
      <div className="header_logo" onClick={handlGoToHomeFromLogo}>
        <img
          className="header-image"
          alt=""
          src="https://www.flaticon.com/svg/static/icons/svg/1765/1765822.svg"
        />
        <h3>Cinema CR</h3>
      </div>
      <div className="language-buttons">
        <button type="button" onClick={() => changeLanguage("sv")}>
          {t("sv")}
        </button>

        <button type="button" onClick={() => changeLanguage("es")}>
          {t("es")}
        </button>
      </div>
    </div>
  );
}

export default Header;
