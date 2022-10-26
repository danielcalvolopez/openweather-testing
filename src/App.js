import { useEffect, useRef, useState } from "react";

const App = () => {
  const [currentLat, setCurrentLat] = useState("");
  const [currentLon, setCurrentLon] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [temp, setTemp] = useState("");
  const [cityInputValue, setCityInputValue] = useState("");
  const [currentCity, setCurrentCity] = useState(currentLocation);
  const effectRan = useRef(false);

  console.log(currentLocation);

  const handleCityInput = (event) => {
    setCityInputValue(event.target.value);
  };

  useEffect(() => {
    if (effectRan.current === false) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      function success(pos) {
        const crd = pos.coords;

        setCurrentLat(crd.latitude);
        setCurrentLon(crd.longitude);
      }

      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  }, []);

  useEffect(() => {
    if (effectRan.current === false) {
      const fetchCity = async () => {
        const response = await fetch(
          `https://eu1.locationiq.com/v1/reverse?key=${process.env.REACT_APP_IQ_TOKEN}&lat=${currentLat}&lon=${currentLon}&format=json`
        );

        const cityData = await response.json();
        setCurrentLocation(cityData?.address?.city);
      };
      fetchCity();
    }
  }, [currentLat, currentLon]);

  useEffect(() => {
    if (effectRan.current === false) {
      const fetchWeather = async () => {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
        );

        const weatherData = await response.json();
        setTemp(Math.round(weatherData?.main?.temp));
      };
      fetchWeather();
    }
  }, [currentCity]);

  const handleCitySubmit = (event) => {
    event.preventDefault();
    setCurrentCity(cityInputValue);
  };

  return (
    <div>
      <form onSubmit={handleCitySubmit}>
        <input
          onChange={handleCityInput}
          type="text"
          placeholder="Search a city..."
        />
        <button>Go</button>
      </form>
      <div>{temp}º</div>
    </div>
  );
};

export default App;
