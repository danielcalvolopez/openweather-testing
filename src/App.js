import { useContext, useEffect, useState } from "react";
import { LocationContext } from "./context/LocationContext";

const App = () => {
  const currentLocation = useContext(LocationContext);

  const [temp, setTemp] = useState(undefined);
  const [currentCity, setCurrentCity] = useState(currentLocation);
  const [cityInputValue, setCityInputValue] = useState("");

  const handleCityInput = (event) => {
    setCityInputValue(event.target.value);
  };

  const handleCitySubmit = (event) => {
    event.preventDefault();

    setCurrentCity(cityInputValue);
  };

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setTemp(Math.round(data.main.temp)))
      .catch((err) => console.log(err));
  }, [currentCity]);

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
