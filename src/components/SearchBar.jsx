import React, { useRef } from "react";

const SearchBar = ({ handleCitySubmit, handleCityInput, handleLocation }) => {
  const formRef = useRef();
  return (
    <div>
      <form ref={formRef} onSubmit={handleCitySubmit}>
        <input
          onChange={handleCityInput}
          type="text"
          placeholder="Search a city..."
          required
        />
        <button>Go</button>
      </form>
      <button type="submit" onClick={handleLocation}>
        My location
      </button>
    </div>
  );
};

export default SearchBar;
