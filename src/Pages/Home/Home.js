import React from "react";
import Movies from "../../Components/Movies/Movies";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import SearchBar from "../../Components/SearchBar/SearchBar";

function Home() {
  return (
    <div>
      <Header />
      <SearchBar />
      <Movies />
      <Footer />
    </div>
  );
}

export default Home;
