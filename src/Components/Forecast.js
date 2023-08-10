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

// Define the desired time slots
const desiredTimeSlots = ["15:00:00", "18:00:00", "21:00:00"];

function Forecast({ sevenDayData }) {
  const today = moment().format("YYYY-MM-DD");

  const filteredData = sevenDayData?.list.filter((day) => {
    return (
      day.dt_txt.includes(today) &&
      desiredTimeSlots.includes(day.dt_txt.split(" ")[1])
    );
  });

  return (
    <div className="forecast_section">
      <div className="forecast_section_heading">
        <h5 className="forecast_heading_text">Today's Forecast</h5>
      </div>

      {filteredData?.length > 0 ? (
        <div className="today_forcast_section">
          {filteredData?.map((day, index) => {
            const date = moment(day.dt_txt, "YYYY-MM-DD HH:mm:ss");
            const dow = date.day();
            const time = moment(date).format("HH:mm:ss");
            return (
              <div className="forecast_day" key={index}>
                <div className="forcast_image">
                  <img
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                    className="Sun_image"
                    alt="sun_icon"
                  />
                </div>
                <h5 className="forecast_day_text">
                  {weekDays[dow]} {time}
                </h5>
                <h5 className="forecast_day_muted_text">
                  {day.weather[0].description}
                </h5>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No data available for the selected time slots.</p>
      )}
    </div>
  );
}

export default Forecast;
