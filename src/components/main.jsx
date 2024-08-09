import React, { useState } from "react";
import "./main.css";

const api = {
  key: "e7704bc895b4a8d2dfd4a29d404285b6",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Main = () => {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [open, setOpen] = useState(false);

  const searchPressed = async () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setWeather(result);
      });
  };

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div className="center">
      <div className="container">
        <p className="title">Weather Service</p>

        <div className="inputHolder">
          <input
            type="text"
            className="input"
            placeholder="Enter City Name"
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="search" onClick={searchPressed}>
            Search
          </button>
        </div>

        <div className="center2">
          {weather.main && (
            <div
              className={
                weather.weather[0].main == "Clear"
                  ? "clear"
                  : weather.weather[0].main == "Rain"
                  ? "rain"
                  : weather.weather[0].main == "Clouds"
                  ? "clouds"
                  : weather.weather[0].main == "Snow"
                  ? "snow"
                  : weather.weather[0].main == "Drizzle"
                  ? "drizzle"
                  : weather.weather[0].main == "Thunderstorm"
                  ? "thunderstorm"
                  : "sunny"
              }
              key={weather.id}
            >
              <p className="city">{weather.name}</p>
              <p className="condition">{weather.weather[0].main}</p>
              <p className="temp">{Math.round(weather.main.temp)}°C</p>
              <div className="buttonHolder">
                <button
                  onClick={toggle}
                  className={open != true ? "open" : "close"}
                >
                  ➤
                </button>
              </div>

              <div className={open == true ? "openInfo" : "closeInfo"}>
                <p className="title">More info</p>
                <div className="hider"></div>

                <div className="info">
                  <p className="infoContent">
                    Humidity:{weather.main.humidity}%
                  </p>
                  <p className="infoContent">
                    Wind speed:{weather.wind.speed}m/s
                  </p>
                  <p className="infoContent">
                    Temp feels like:{weather.main.feels_like}°C
                  </p>
                </div>
              </div>
            </div>
          )}

          {weather.message == "city not found" && (
            <p className="error">Type in a valid city.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
