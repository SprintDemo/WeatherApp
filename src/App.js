import React, { useState } from "react";
import "./styles.css";
const api = {
  key: "18948251a387f1a35473eac26e94676c",
  base: "https://api.openweathermap.org/data/2.5/"
};

/*  onChange={(e) => setQuery(e.target.value)}
            value={query}
            value={searchData}
            
            
            
  api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}          */
function App() {
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const search = (evt) => {
    console.log("enter press here! " + evt);
    // console.log("enter press here! " + ${query});

    if (evt.key === "Enter") {
      console.log("enter press here! " + query);
      fetch(`${api.base}/weather?q=${query}&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => setWeather(result));
      console.log(weather);
    }
  };
  return (
    <div
      className={
        typeof weather.main !== "undefined"
          ? (weather.main.temp < 280
            ? "app warm"
            : "app cold")
          : "app"
      }
    >
      <main>
        <h1>Weather Report App</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
            value={query}
          />
        </div>

        {typeof weather.main !== "undefined" ? (
          <div className="fontColor">
            <div className="weather">
              {weather.name} , {weather.sys.country}
            </div>
            <div className="date">{dateBuilder(new Date())}</div>
            <div className="temp">{Math.round(weather.main.temp)} °C</div>
            <div>{weather.weather[0].main} </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
