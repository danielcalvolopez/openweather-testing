import { useEffect, useState } from "react";

const App = () => {
  const [temp, setTemp] = useState(undefined);

  console.log(temp);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => setTemp(Math.round(data.main.temp)))
      .catch(console.err);
  }, []);

  return <div>{temp}º</div>;
};

export default App;
