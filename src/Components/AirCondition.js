import React from "react";
import { Switch } from "antd";

function AirCondition({ weatherData, isFahrenheit, toggleTemperatureUnit }) {
  const convertToFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32;
  };

  const minTemp = isFahrenheit
    ? convertToFahrenheit(weatherData.main.temp_min)
    : weatherData.main.temp_min;

  const maxTemp = isFahrenheit
    ? convertToFahrenheit(weatherData.main.temp_max)
    : weatherData.main.temp_max;

  return (
    <>
      <div className="air_condition_section">
        <div className="air_condition_subheading">
          <h3 className="air_condition_muted_text">AIR CONDITIONS</h3>
        </div>
        <div className="temp">
          {weatherData && (
            <>
              <div className="temperature_section">
                <div className="air_condition_main">
                  <div className="air_condition_first">
                    <h5 className="air_condition_muted_text">
                      Minimum Temperature
                    </h5>
                    <h6 className="air_condition_number">
                      {minTemp.toFixed(2)} {isFahrenheit ? "ºF" : "ºC"}
                    </h6>
                  </div>
                </div>
                <div className="air_condition_second">
                  <h5 className="air_condition_muted_text">
                    Maximum Temperature
                  </h5>
                  <h6 className="air_condition_number">
                    {maxTemp.toFixed(2)} {isFahrenheit ? "ºF" : "ºC"}
                  </h6>
                </div>
              </div>
              <div className="temperature_section">
                <div className="air_condition_wind">
                  <h5 className="air_condition_muted_text">Wind</h5>
                  <h6 className="air_condition_number">
                    {weatherData.wind.speed} km/h
                  </h6>
                </div>
                <div className="uv_section">
                  <h5 className="air_condition_muted_text">Humidity</h5>
                  <h6 className="air_condition_number">
                    {weatherData.main.humidity}
                  </h6>
                </div>
              </div>
              <Switch
                defaultChecked={isFahrenheit}
                onChange={toggleTemperatureUnit}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AirCondition;
