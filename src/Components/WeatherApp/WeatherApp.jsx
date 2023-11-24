import React, { useState } from 'react';
import './WeatherApp.css';

import search_icon from '../Assets/search.png';
import cloud_icon from '../Assets/cloud.png';
import humidity_icon from '../Assets/humidity.png';
import wind_icon from '../Assets/wind.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import drizzle_icon from '../Assets/drizzle.png';
import clear_icon from '../Assets/clear.png';

const WeatherApp = () => {
  const api_key = "6927b3d57951117a23838f10dc1c94bc";
  const [wincon, setWicon] = useState(cloud_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput")[0];

    if (element.value === "") {
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=Metric&appid=${api_key}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Weather API request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (data.main && data.main.humidity && data.wind && data.wind.speed) {
        const humidity = document.getElementsByClassName("humidity-percent")[0];
        const wind = document.getElementsByClassName("wind-rate")[0];
        const temperature = document.getElementsByClassName("weather-temp")[0];
        const location = document.getElementsByClassName("weather-location")[0];

        humidity.innerHTML = data.main.humidity;
        wind.innerHTML = data.wind.speed;
        temperature.innerHTML = `${data.main.temp}&deg;C`; // Display temperature with degree symbol and Celsius
        location.innerHTML = data.name;

        switch (data.weather[0].icon) {
          case "01d":
          case "01n":
            setWicon(clear_icon);
            break;
          case "02d":
          case "02n":
            setWicon(cloud_icon);
            break;
          case "03d":
          case "03n":
          case "04d":
          case "04n":
            setWicon(drizzle_icon);
            break;
          case "09d":
          case "09n":
          case "10d":
          case "10n":
            setWicon(rain_icon);
            break;
          case "13d":
          case "13n":
            setWicon(snow_icon);
            break;
          default:
            setWicon(clear_icon);
        }
      } else {
        throw new Error("Invalid data format in the API response");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
    }
  };

  return (
    <div className='container'>
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder='Search' />
        <div className="search-icon" onClick={() => { search() }}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wincon} alt="" />
      </div>
      <div className="weather-temp">24&deg;C</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">64%</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
