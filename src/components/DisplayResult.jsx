import React from 'react'

const DisplayResult = ({weatherData,loading, selectedTown}) => {
  




  return (
    <div className="weather-forecast">
      <div className='nadpis'>

      <h2>Předpověď počasí pro  </h2>
      <p><span className='mesto'>{selectedTown}</span></p>
      </div>
    <table>
      <thead>
        <tr>
          <th>Ikona</th>
          <th>Datum</th>
          <th>Teplota</th>
          <th>Max. Teplota</th>
          <th>Stav počasí</th>
        </tr>
      </thead>
      <tbody>
      {loading ? (
   <tr>
   <td colSpan="2">Načitaní...</td> 
 </tr>
) : (
  weatherData.map((forecast, index) => (
    <tr key={index}>
      <td className='ikona' > 
      {forecast.weather[0].description === 'clear sky' && <img className='sunresult' src="../public/img/contrast.png" alt="" />}
      {forecast.weather[0].description === 'overcast clouds' && <img className='sunresult' src="../public/img/cloudy.png" alt="" />}
      {forecast.weather[0].description === 'light rain' && <img className='sunresult' src="../public/img/light-rain.png" alt="" />}
      {forecast.weather[0].description === 'scattered clouds' && <img className='sunresult' src="../public/img/scattered-thunderstorms.png" alt="" />}
      {forecast.weather[0].description === 'broken clouds' && <img className='sunresult' src="../public/img/clouds.png" alt="" />}
      {forecast.weather[0].description === 'few clouds' && <img className='sunresult' src="../public/img/weather.png" alt="" />}
      {forecast.weather[0].description === 'moderate rain' && <img className='sunresult' src="../public/img/cloud.png" alt="" />}
      {forecast.weather[0].description === 'heavy intensity rain' && <img className='sunresult' src="../public/img/storm.png" alt="" />}
      </td>
      <td >{new Date(forecast.dt_txt).toLocaleString()}</td>
      <td>{forecast.main.temp}°C</td>
      <td>{forecast.main.temp_max}°C</td>
      <td>{forecast.weather[0].description}</td>
    </tr>
  ))
)}
      </tbody>
    </table>
  </div>
  )
}

export default DisplayResult