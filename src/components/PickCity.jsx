import React, { useEffect, useState } from "react";

const PickCity = ({fetchWeatherData,setLoading,setSelectedTown}) => {
  const [userChoice, setUserChoice] = useState("");
  const [cities, setCities] = useState([]);
  const [showList, setShowList] = useState([]);

  useEffect(() => {
    // Načtení seznamu měst z JSON souboru pomocí fetch
    fetch("/city.list.json")
      .then((response) => response.json())
      .then((data) => {
        setCities(data);
      })
      .catch((error) => {
        console.error("Error loading city list:", error);
      });
  }, []);

  const showListOfCities = (e) => {
    const value = e.target.value.toLowerCase();
    setUserChoice(value);

    if (value.length > 2) {
      const filteredResult = cities.filter((city) => city.name.toLowerCase().includes(value));
      setShowList(filteredResult.slice(0, 5));
    } else {
      setShowList([]);
    }
  };

  const handleUserClick = (select) => {
    setUserChoice(select.name.toLowerCase());
    setShowList([]);
    setSelectedTown(select.name)
    
    setLoading(true)
    fetchWeatherData(select);
    setUserChoice('')
  }

  return <>
    <form action="">
      <input
        onChange={showListOfCities}
        value={userChoice}
        type="text"
        placeholder="Vyber město"
      />
      <img className="zoom" src="https://cdn-icons-png.flaticon.com/512/149/149852.png" alt="" />
      <img className="location" src="../public/img/location.png" alt="" />


      <div className="renderList"> 

      {showList.length > 0 && (
        <ul >
          {showList.map((city) => (
            <li className="list"  onClick={()=> handleUserClick(city)}  key={city.id}> {city.name} </li>
          ))}
        </ul>
      )}
</div>
   
    </form>
  </>;
};

export default PickCity;