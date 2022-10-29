import { useRef, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";

const App = () => {
  const initialState = "No city selected";
  const formRef = useRef();
  const [cityInputValue, setCityInputValue] = useState("");
  const [currentCity, setCurrentCity] = useState(initialState);
  const [error, setError] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    const successfulLookup = (position) => {
      const { latitude, longitude } = position.coords;
      fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.REACT_APP_GEO_CODE}`
      )
        .then((response) => response.json())
        .then((data) => {
          setCurrentLocation(data.results[0].components.city);
        });
      setCurrentCity(currentLocation);
    };

    window.navigator.geolocation.getCurrentPosition(
      successfulLookup,
      console.log
    );
    setIsLoading(false);
  };

  return (
    <div>
      <SearchBar
        handleCitySubmit={handleCitySubmit}
        handleCityInput={handleCityInput}
        handleLocation={handleLocation}
      />

      <WeatherDisplay
        currentCity={currentCity}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        error={error}
        setError={setError}
      />
    </div>
  );
};

export default App;
