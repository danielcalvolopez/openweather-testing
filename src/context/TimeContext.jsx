import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

export const TimeContext = createContext();

export const TimeContextProvider = ({ children }) => {
  const [dateState, setDateState] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  return (
    <TimeContext.Provider value={dateState}>{children}</TimeContext.Provider>
  );
};
