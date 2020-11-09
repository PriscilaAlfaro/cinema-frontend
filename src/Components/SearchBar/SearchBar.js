import React from "react";
import "./SearchBar.css";

function SearchBar() {
  // function handleChange(e) {
  //   const word = e.target.value;
  //   props.setInputValue(word);
  // }

  return (
    <div className="SearchBar">
      <input
        type="text"
        // onChange={handleChange}
        // value={props.inputValue}
        placeholder="Search for a movie"
      />
      <button
        className="SearchButton"
        type="button"
        // onClick={() => {
        //   props.onClick(props.inputValue);
        // }}
      >
        SEARCH
      </button>
    </div>
  );
}

export default SearchBar;
