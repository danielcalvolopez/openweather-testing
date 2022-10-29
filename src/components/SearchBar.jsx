import React, { useRef, useState } from "react";
import "./search-bar.scss";
import { GrSearch } from "react-icons/gr";
import { ImLocation } from "react-icons/im";

const SearchBar = ({
  handleLocation,
  setCurrentCity,
  setIsLoading,
  setError,
}) => {
  const formRef = useRef();
  const [cityInputValue, setCityInputValue] = useState("");

  const handleCityInput = (event) => {
    setCityInputValue(event.target.value);
  };
  const handleCitySubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(false);
    if (cityInputValue === "") {
      setError(true);
    }
    setCurrentCity(cityInputValue);
    setIsLoading(false);
    formRef.current.reset();
  };

  return (
    <div className="search-container">
      <form ref={formRef} onSubmit={handleCitySubmit}>
        <input
          onChange={handleCityInput}
          type="text"
          placeholder="Search a city..."
          required
        />
        <button>
          <GrSearch />
        </button>
      </form>
      <button type="submit" onClick={handleLocation}>
        <ImLocation />
      </button>
    </div>
  );
};

export default SearchBar;
