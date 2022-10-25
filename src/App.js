import { useEffect, useState } from "react";

const App = () => {
  const [temp, setTemp] = useState(undefined);
  const [currentCity, setCurrentCity] = useState("London");
  const [cityInputValue, setCityInputValue] = useState("");

  const handleCityInput = (event) => {
    setCityInputValue(event.target.value);
  };

  const handleCitySubmit = (event) => {
    event.preventDefault();

    setCurrentCity(cityInputValue);
  };

  console.log(temp);
  console.log(currentCity);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => setTemp(Math.round(data.main.temp)))
      .catch(console.err);
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
