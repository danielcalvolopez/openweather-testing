import { useEffect, useState } from "react";

const App = () => {
  const [temp, setTemp] = useState("");
  const [cityInputValue, setCityInputValue] = useState("");
  const [currentCity, setCurrentCity] = useState("London");
  const [cityData, setCityData] = useState("");
  const [country, setCountry] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [weather, setWeather] = useState("");
  const [error, setError] = useState("");

  console.log(cityInputValue);

  const handleCityInput = (event) => {
    setCityInputValue(event.target.value);
  };

  useEffect(() => {
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
        })
        .catch((err) => setError(err.message));
    };
    fetchWeather();
  }, [currentCity]);

  const handleCitySubmit = (event) => {
    event.preventDefault();
    setCurrentCity(cityInputValue);
    if (cityInputValue === "") {
      return;
    }
    setCityInputValue("");
  };

  return (
    <div>
      <div>
        <form onSubmit={handleCitySubmit}>
          <input
            onChange={handleCityInput}
            type="text"
            placeholder="Search a city..."
          />
          <button>Go</button>
        </form>
        <button type="submit">My location</button>
      </div>
      {!error ? (
        <div>
          <div>
            {cityData}, {country}
          </div>
          <div>{temp}º</div>
          <div>
            <p>Min: {minTemp}</p>
            <p>Max: {maxTemp}</p>
          </div>
          <div>{weather}</div>
        </div>
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
};

export default App;
