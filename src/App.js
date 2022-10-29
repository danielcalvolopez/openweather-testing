import { useContext, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import { LocationContext } from "./context/LocationContext";
import "./app.scss";

const App = () => {
  const currentLocation = useContext(LocationContext);
  const initialState = "No city selected";
  const [currentCity, setCurrentCity] = useState(initialState);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLocation = () => {
    setError(false);
    setIsLoading(true);
    setCurrentCity(currentLocation);
    setIsLoading(false);
  };

  return (
    <div className="container">
      <SearchBar
        handleLocation={handleLocation}
        setCurrentCity={setCurrentCity}
        setIsLoading={setIsLoading}
        setError={setError}
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
