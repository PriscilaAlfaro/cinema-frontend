import React from "react";
import { useTranslation } from "react-i18next";
import Movies from "../../Components/Movies/Movies";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import SearchBar from "../../Components/SearchBar/SearchBar";
import "./Home.css";

function Home() {
  const { t } = useTranslation();
  return (
    <div>
      <Header />
      <div className="welcome">
        <h1>
          {t("welcome")}
          &nbsp; Cinema CR
        </h1>
      </div>
      <div className="searchMovies">
        <h3>{t("searchMovie")}</h3>
      </div>
      <SearchBar />
      <Movies />
      <Footer />
    </div>
  );
}

export default Home;
