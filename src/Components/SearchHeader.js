import React, { useState, useEffect } from "react";
import axios from "axios";
import Weatherscreen from "./Weatherscreen";
import Forecast from "./Forecast";
import Sidebar from "./Sidebar";
function SearchHeader() {
  const [city, setCity] = useState("Ambala");
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [sevenDayData, setSevenDayData] = useState([]);
  const [updateSideBar, setUpdateSideBar] = useState(false);

  const [latitude, setLatitude] = useState(25.454794);
  const [longitude, setLongitude] = useState(78.133957);
  


  const apiKey = "7df59a0536b1f9ab6210f454cc427326";
  const fetchWeatherData = () => {
    if (city !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      setUpdateSideBar(!updateSideBar)

      axios
        .get(apiUrl)
        .then((response) => {
          setWeatherData(response.data);
          console.log(response, "");
          setLatitude(response?.data?.coord?.lat)
          setLongitude(response?.data?.coord?.lon)
          setErrorMessage("");
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          setWeatherData(null); // Clear weather data in case of error
          setErrorMessage("City not found");

          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
        });
    } else {
      setWeatherData(null);
      setErrorMessage("");
    }
    
  };

  useEffect(() => {

    const api_seven_day = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;
    axios
      .get(api_seven_day)
      .then((response) => {
        console.log(response, "response======>");
        const sevenDayForecast = response.data;
        setSevenDayData(sevenDayForecast);
      })
      .catch((error) => {
        console.error("Error fetching seven-day forecast data:", error);
      });
  }, [city , updateSideBar,latitude]);



  return (
    <>
      <div className="search-header">
        <div className="search-header-section">
          <div className="content">
            <div className="search">
              <input
                type="text"
                className="search-header"
                placeholder="Enter the city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <button onClick={fetchWeatherData}>Search</button>
            </div>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            {weatherData && (
              <>
                <Weatherscreen weatherData={weatherData} />
                <Forecast sevenDayData={sevenDayData} />
                {/* <AirCondition weatherData={weatherData} /> */}
                {/* <Sidebar sevenDayData={sevenDayData} /> */}
              </>
            )}
          </div>
          {weatherData && <Sidebar sevenDayData={sevenDayData} />}
        </div>
      </div>
    </>
  );
}

export default SearchHeader;
