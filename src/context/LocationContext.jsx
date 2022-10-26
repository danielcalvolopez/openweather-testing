import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState("");
  const [currentLat, setCurrentLat] = useState("");
  const [currentLon, setCurrentLon] = useState("");

  useEffect(() => {
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

    fetch(
      `https://eu1.locationiq.com/v1/reverse?key=${process.env.REACT_APP_IQ_TOKEN}&lat=${currentLat}&lon=${currentLon}&format=json`
    )
      .then((response) => response.json())
      .then((data) => setCurrentLocation(data?.address?.city))
      .catch((err) => console.error(err));
  }, [currentLat, currentLon]);

  return (
    <LocationContext.Provider value={currentLocation}>
      {children}
    </LocationContext.Provider>
  );
};
