import React from 'react';
import './WeatherApp.css';

import search_icon from '../Assets/search.png';
import cloud_icon from '../Assets/cloud.png';
import humidity_icon from '../Assets/humidity.png';
import wind_icon from '../Assets/wind.png';

const WeatherApp = () => {
    let api_key = "6927b3d57951117a23838f10dc1c94bc";

    const search = async () => {
        const element = document.getElementsByClassName("cityInput")[0];

        if (element.value === "") {
            return;
        }

        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=Metric&appid=${api_key}`;
            let response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Weather API request failed with status ${response.status}`);
            }

            let data = await response.json();

            // Check if the expected properties exist in the data object
            if (data.main && data.main.humidity && data.wind && data.wind.speed) {
                const humidity = document.getElementsByClassName("humidity-percent")[0];
                const wind = document.getElementsByClassName("wind-rate")[0];
                const temperature = document.getElementsByClassName("weather-temp")[0];
                const location = document.getElementsByClassName("weather-location")[0];

                humidity.innerHTML = data.main.humidity;
                wind.innerHTML = data.wind.speed;
                temperature.innerHTML = data.main.temp;
                location.innerHTML = data.name;
            } else {
                throw new Error("Invalid data format in the API response");
            }
        } catch (error) {
            console.error("Error fetching weather data:", error.message);
            // Handle the error, e.g., display an error message to the user
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
                <img src={cloud_icon} alt="" />
            </div>
            <div className="weather-temp">24°C</div>
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
