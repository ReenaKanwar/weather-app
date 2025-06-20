import React, { useState } from "react";
import "./App.css";

const API_KEY = "139f69b489024dc19b9182019251906"; 

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setWeatherData(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      const data = await response.json();

      if (data.error) {
        alert("Failed to fetch weather data");
      } else {
        setWeatherData(data);
      }
    } catch (error) {
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      
      {loading && <p>Loading data…</p>}

      
      {!loading && weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weatherData.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
