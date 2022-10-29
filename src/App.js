import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import "./app.scss";
import { TimeContextProvider } from "./context/TimeContext";

const App = () => {
  const initialState = "No city selected";
  const [currentCity, setCurrentCity] = useState(initialState);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <TimeContextProvider>
      <div className="outter">
        <div className="container">
          <SearchBar
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
      </div>
    </TimeContextProvider>
  );
};

export default App;
