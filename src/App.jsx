import React, { useState } from 'react';
import PickCity from './components/PickCity';
import DisplayResult from './components/DisplayResult';
import Weather from './components/Weather';

// Čistá funkce pro získání dat o počasí
const getWeatherData = async (cityId) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=48af8bf98245f07f707f0489d11d219b&units=metric`
  );
  return response.json();
};

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTown, setSelectedTown] = useState('');

  // Čistá funkce pro zpracování výsledku a aktualizaci stavu
  const handleFetchWeather = async (city) => {
    setLoading(true);
    const data = await getWeatherData(city.id);
    setWeatherData(data.list);
    setLoading(false);
  };


  return (
    <div className="container">
      <h1>Předpověď počasí</h1>
      <PickCity fetchWeatherData={handleFetchWeather} setLoading={setLoading} setSelectedTown={setSelectedTown} />
      <DisplayResult weatherData={weatherData} loading={loading} selectedTown={selectedTown} />
      <Weather/>
    </div>
  );
};

export default App;