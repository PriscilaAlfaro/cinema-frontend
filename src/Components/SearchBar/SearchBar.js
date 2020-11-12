import React, { useState, useContext } from "react";
import { useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import AppContext from "../../context/context";
import "./SearchBar.css";

function SearchBar() {
  const { t } = useTranslation();
  const { movies, handleMovieClick } = useContext(AppContext);

  const [activeOption, setActiveOption] = useState(0);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [userInput, setUserInput] = useState("");

  const navigate = useNavigate();

  const onChange = (e) => {
    const inputValue = e.target.value;
    setUserInput(inputValue);
    const filteredSuggestions = movies.filter((movie) =>
      movie.title.toLowerCase().startsWith(inputValue.toLowerCase())
    );

    setActiveOption(0);
    setFilteredMovies(filteredSuggestions.sort((a, b) => a.title - b.title));
    setShowOptions(true);
    setUserInput(inputValue);
  };

  const onClick = (movie) => {
    setActiveOption(0);
    setFilteredMovies([]);
    setShowOptions(true);
    const index = movies.findIndex((mov) => mov._id === movie._id);
    handleMovieClick(index);
    navigate("/movie-details");
  };

  let optionList;

  if (showOptions && userInput) {
    if (filteredMovies.length) {
      optionList = (
        <ul className="options">
          {filteredMovies.map((movie, index) => {
            return (
              <li
                className={index === activeOption ? "option-active" : ""}
                key={movie.title}
                onClick={() => {
                  onClick(movie);
                }}
              >
                {movie.title}
              </li>
            );
          })}
        </ul>
      );
    }
  }

  return (
    <div className="SearchBar">
      <div className="searchBar_input">
        <h1>{t("search")}</h1>
        <input
          className="search-box"
          placeholder={t("searchForAMovie")}
          type="text"
          onChange={onChange}
          value={userInput}
        />
      </div>
      <div className="block">{optionList}</div>
    </div>
  );
}

export default SearchBar;
