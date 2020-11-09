import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Components/App/App";
import "./i18n";

ReactDOM.render(
  <Suspense fallback={null}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Suspense>,
  document.getElementById("root")
);
