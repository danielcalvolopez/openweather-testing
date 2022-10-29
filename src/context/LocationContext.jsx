import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState("");

  useEffect(() => {
    const successfulLookup = (position) => {
      const { latitude, longitude } = position.coords;
      fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.REACT_APP_GEO_CODE}`
      )
        .then((response) => response.json())
        .then((data) => {
          setCurrentLocation(data.results[0].components.city);
        });
    };

    window.navigator.geolocation.getCurrentPosition(
      successfulLookup,
      console.log
    );
  }, []);

  return (
    <LocationContext.Provider value={currentLocation}>
      {children}
    </LocationContext.Provider>
  );
};
