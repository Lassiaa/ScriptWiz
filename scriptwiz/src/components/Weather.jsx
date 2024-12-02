import { useState } from "react";
import axios from "axios";

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});

  // Fetch weather data based on the city
  const fetchWeatherData = async (cityName) => {
    if (!cityName) return;

    try {
      const response = await axios.get(
        `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=344958b1bf8d4dc285bcfd99e5bd47a0`
      );
      setCity(response.data.city_name);

      // Store 16 days of weather data in an object
      const fullWeather = response.data.data.reduce((acc, day) => {
        acc[new Date(day.datetime).toDateString()] = day;
        return acc;
      }, {});
      setWeatherData(fullWeather);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData({});
    }
  };

  return { city, weatherData, fetchWeatherData };
}

export default Weather;
