import { useEffect, useRef, useState } from "react";

const App = () => {
  const formRef = useRef();
  const [temp, setTemp] = useState("");
  const [cityInputValue, setCityInputValue] = useState("");
  const [currentCity, setCurrentCity] = useState("London");
  const [cityData, setCityData] = useState("");
  const [country, setCountry] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [weather, setWeather] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log(currentLocation);

  const handleCityInput = (event) => {
    setCityInputValue(event.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchWeather = () => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      )
        .then((response) => {
          if (!response.ok) {
            throw Error("City not found!");
          }
          return response.json();
        })
        .then((weatherData) => {
          setTemp(Math.round(weatherData?.main?.temp));
          setCityData(weatherData?.name);
          setCountry(weatherData?.sys?.country);
          setMaxTemp(Math.round(weatherData?.main?.temp_max));
          setMinTemp(Math.round(weatherData?.main?.temp_min));
          setWeather(weatherData?.weather?.[0].main);
          setWeatherIcon(weatherData?.weather?.[0].icon);
        })
        .catch((err) => {
          setError(true);
          setErrorMessage(err.message);
        });
    };
    fetchWeather();
    setIsLoading(false);
  }, [currentCity]);

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
      <div>
        <form ref={formRef} onSubmit={handleCitySubmit}>
          <input
            onChange={handleCityInput}
            type="text"
            placeholder="Search a city..."
          />
          <button>Go</button>
        </form>
        <button type="submit" onClick={handleLocation}>
          My location
        </button>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : !error ? (
        <div>
          <div>
            {cityData}, {country}
          </div>
          <div>{temp}º</div>
          <div>
            <p>Min: {minTemp}</p>
            <p>Max: {maxTemp}</p>
          </div>
          <div>
            <img
              src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
              alt="weatherlogo"
            />
            <div>{weather}</div>
          </div>
        </div>
      ) : (
        <div>{errorMessage}</div>
      )}
    </div>
  );
};

export default App;
