import React, { useContext, useRef, useState } from "react";
import "./search-bar.scss";
import { TbSearch } from "react-icons/tb";
import { ImLocation } from "react-icons/im";
import { LocationContext } from "../context/LocationContext";

const SearchBar = ({ setCurrentCity, setIsLoading, setError }) => {
  const formRef = useRef();
  const [cityInputValue, setCityInputValue] = useState("");
  const currentLocation = useContext(LocationContext);

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

  const handleLocation = () => {
    setError(false);
    setIsLoading(true);
    setCurrentCity(currentLocation);
    setIsLoading(false);
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
          <TbSearch color="rgb(190, 190, 190)" />
        </button>
      </form>
      <button className="location-btn" type="submit" onClick={handleLocation}>
        <ImLocation color="rgb(190, 190, 190)" />
      </button>
    </div>
  );
};

export default SearchBar;
