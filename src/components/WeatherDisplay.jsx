import React, { useEffect, useState } from "react";

const WeatherDisplay = ({
  currentCity,
  isLoading,
  setIsLoading,
  error,
  setError,
}) => {
  const initialState = "No city selected";
  const [temp, setTemp] = useState("");
  const [cityData, setCityData] = useState("");
  const [country, setCountry] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [weather, setWeather] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [iconUrl, setIconUrl] = useState("");

  useEffect(() => {
    setError(false);
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
          setWeather(weatherData?.weather?.[0]?.main);
          setWeatherIcon(weatherData?.weather?.[0]?.icon);
          setIconUrl(`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
        })
        .catch((err) => {
          setError(true);
          setErrorMessage(err.message);
        });
    };
    fetchWeather();
    setIsLoading(false);
  }, [currentCity, setError, setIsLoading, weatherIcon]);

  return (
    <div>
      {currentCity === initialState ? (
        <div>{initialState}</div>
      ) : isLoading ? (
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
            <img src={iconUrl} alt="weatherlogo" />
            <div>{weather}</div>
          </div>
        </div>
      ) : (
        <div>{errorMessage}</div>
      )}
    </div>
  );
};

export default WeatherDisplay;
