import React from "react";
import "./BackButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

function BackButton({ onClick }) {
  const { t } = useTranslation();
  return (
    <button type="button" className="return-to-home" onClick={onClick}>
      <h1>
        <FontAwesomeIcon icon="chevron-left" size="m" />
        &nbsp;
        {t("back")}
      </h1>
    </button>
  );
}

export default BackButton;
