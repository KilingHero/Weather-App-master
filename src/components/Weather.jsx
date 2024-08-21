// src/Weather.js
import React, { useState, useEffect } from 'react';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          fetchWeather(latitude, longitude);
        },
        (err) => {
          setError("Chyba při získávání polohy: " + err.message);
        }
      );
    } else {
      setError("Geolokace není podporována tímto prohlížečem.");
    }
  }, []);

  const fetchWeather = async (latitude, longitude) => {
    const API_KEY = '48af8bf98245f07f707f0489d11d219b';  
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
      } else {
        setError("Chyba při načítání dat o počasí: " + data.message);
      }
    } catch (err) {
      setError("Chyba při volání API: " + err.message);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!weather) {
    return <p className='userCurrentLocation'>Načítání vaši polohy a počasí...</p>;
  }

  return (
    <div className='userCurrentLocation'>
      <p>Vaše lokace: <span className='town'>{weather.name}</span></p>
      <p>Teplota:  <span className='town'> {weather.main.temp} °C</span> </p>
    
    </div>
  );
};

export default Weather;