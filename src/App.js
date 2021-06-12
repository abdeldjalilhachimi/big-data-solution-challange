import React, { useState } from "react";
import "./App.css";
import Leaflet from "./components/leaflet/Leaflet";
import WeatherInfo from "./components/weatherInfo/WeatherInfo";
import WeatherLayout from "./components/weatherLayout/WeatherLayout";

function App() {
  const [lat, setLat] = useState(36.7525);
  const [lng, setLng] = useState(3.04197);
  /*  const [day, setDay] = useState();
  const [icon, setIcon] = useState();
  const [temp, setTemp] = useState(); */
  const [isNotEmpty, setIsNotEmpty] = useState(false);
  const [weatherData, setWeatherData] = useState();
  const getWeatherData = (lat, lng) => {
    if (lat && lng) {
      fetch(
        `${process.env.REACT_APP_BASE_URL}?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_API_KEY}`
      )
        .then(async (res) => {
          let data = await res.json();
          console.log("data:", data["daily"]);
          setWeatherData(data);
          /*         data.daily.map((value, index) => {
          if (index > 0) {
            setDay(
              new Date(value.dt * 1000).toLocaleDateString("en", {
                weekday: "long",
              })
            );
            setIcon(value.weather[0].icon);
            setTemp(value.temp.day.toFixed(0));
          }
        }); */
        })
        .catch(function (err) {
          console.log("Fetch Error :-S", err);
        });
    }
  };
  const addInfo = (e) => {
    console.log(e[0].lat, e[1].lng);
    if ((e[0].lat !== null) & (e[0].lng !== null)) {
      setIsNotEmpty(true);
    }
    setLat(e[0].lat);
    setLng(e[1].lng);
    //call api here and assign value to the state
    getWeatherData(e[0].lat, e[1].lng);

    // after that put data in Weatherinfo Componenets
  };
  return (
    <div className="app">
      <WeatherLayout addInfo={addInfo} />
      <Leaflet lat={lat} lng={lng} />
      {isNotEmpty ? <WeatherInfo weatherInfo={weatherData} /> : null}
    </div>
  );
}

export default App;
