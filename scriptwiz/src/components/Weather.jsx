import { useEffect, useState } from "react";
import axios from "axios";

function Weather() {
  const [city, setCity] = useState(null);
  const [weatherData, setWeatherData] = useState({});

  // Fetch weather data based on user's location
  const fetchWeatherData = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=344958b1bf8d4dc285bcfd99e5bd47a0`
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
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return { city, weatherData };
}

export default Weather;
