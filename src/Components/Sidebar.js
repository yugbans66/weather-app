import React from "react";
import moment from "moment";

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function Sidebar({ sevenDayData }) {
  const uniqueDates = Array.from(
    new Set(
      sevenDayData?.list
        .filter((day) => moment(day.dt_txt).hour() === 15)
        .map((day) => moment(day.dt_txt).format("YYYY-MM-DD"))
    )
  );

  const forecastData = uniqueDates.map((date) => {
    const filteredData = sevenDayData?.list.filter(
      (day) =>
        moment(day.dt_txt).format("YYYY-MM-DD") === date &&
        moment(day.dt_txt).hour() === 15
    );

    const avgTemp =
      filteredData?.reduce((sum, day) => sum + day.main.temp, 0) /
      filteredData?.length;

    return {
      date: date,
      avgTemp: avgTemp,
      weatherDescriptions: filteredData?.map(
        (day) => day.weather[0].description
      ),
      icon: filteredData?.map((day) => day.weather[0].icon),
    };
  });

  return (
    <div className="sidebar">
      <div className="forecast_sidebar">
        <h3 className="forecast_sidebar_text">5-Day Forecast</h3>
      </div>

      {forecastData.length > 0 ? (
        <div>
          {forecastData.map((day, index) => {
            const date = moment(day.date, "YYYY-MM-DD");
            const dow = date.day();
            return (
              <div className="sidebar_forecast_day" key={index}>
                <h5 className="forecast_day_text">{weekDays[dow]}</h5>
                <div className="sidebar_forcast_image">
                  <img
                    src={`https://openweathermap.org/img/wn/${day.icon[0]}.png`}
                    className="Sun_image"
                    alt="sun_icon"
                  />
                </div>
                <h5 className="forecast_day_muted_text">
                  Avg Temp: {day.avgTemp.toFixed(2)} °C
                </h5>
                {/* <p className="forecast_weather_descriptions">
                  {day.weatherDescriptions.join(", ")}
                </p> */}
              </div>
            );
          })}
        </div>
      ) : (
        <p>Loading forecast data...</p>
      )}
    </div>
  );
}

export default Sidebar;
