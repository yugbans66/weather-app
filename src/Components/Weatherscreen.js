import React, { useState } from "react";
import { Switch } from "antd";
import AirCondition from "./AirCondition";

function Weatherscreen({ weatherData }) {
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  const toggleTemperatureUnit = () => {
    setIsFahrenheit(!isFahrenheit);
  };

  const convertToFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32;
  };

  const temperature = isFahrenheit
    ? convertToFahrenheit(weatherData.main.temp)
    : weatherData.main.temp;

  return (
    <>
      <div className="">
        <div className="weatherscreen_section">
          <div className="weatherscreen_headings">
            {weatherData && (
              <div>
                <h1 className="weatherscreen_text">{weatherData.name}</h1>
                <p className="weatherscreen_muted_text">
                  {weatherData.weather[0].description}
                </p>
                <h3 className="weatherscreen_temperature">
                  {temperature.toFixed(2)} {isFahrenheit ? "ºF" : "ºC"}
                </h3>
              </div>
            )}
          </div>

          <div className="weatherscreen_img">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              className="weather_img"
              alt="weather_image"
            ></img>
          </div>
        </div>
        <AirCondition
          weatherData={weatherData}
          isFahrenheit={isFahrenheit}
          toggleTemperatureUnit={toggleTemperatureUnit}
        />
      </div>
    </>
  );
}

export default Weatherscreen;
