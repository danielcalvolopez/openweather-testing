import { useContext } from "react";
import { useEffect, useState } from "react";
import { TimeContext } from "../context/TimeContext";
import "./weather-display.scss";

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
  const dateState = useContext(TimeContext);

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
    <div className="display-container">
      {currentCity === initialState ? (
        <div className="initial-state">{initialState}</div>
      ) : isLoading ? (
        <div className="loading">Loading...</div>
      ) : !error ? (
        <div className="data-container">
          <div className="city-and-date">
            <div className="city">
              {cityData}, {country}
            </div>
            <div className="divider"> </div>
            <div className="date-title">
              {dateState.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
              })}
            </div>
          </div>

          <div className="temperature">
            <div className="current">
              {temp}º
              <div className="min-max">
                <p>L: {minTemp}º</p>
                <p>H: {maxTemp}º</p>
              </div>
            </div>
          </div>
          <div className="weather-conditions">
            <img className="weather-logo" src={iconUrl} alt="weatherlogo" />
            <div>{weather}</div>
          </div>
        </div>
      ) : (
        <div className="error">{errorMessage}</div>
      )}
      <div className="date">
        {dateState.toLocaleString("en-GB", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}
      </div>
    </div>
  );
};

export default WeatherDisplay;
