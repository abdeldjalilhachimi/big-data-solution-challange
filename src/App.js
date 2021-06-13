import React, { useState } from "react";
import "./App.css";
import CountryForm from "./components/countryFrom/CountryForm";
import Leaflet from "./components/leaflet/Leaflet";
import Loading from "./components/loading/Loading";
import WeatherInfo from "./components/weatherInfo/WeatherInfo";
import WeatherLayout from "./components/weatherLayout/WeatherLayout";

function App() {
  const [lat, setLat] = useState(36.7525);
  const [lng, setLng] = useState(3.04197);
  const [isNotEmpty, setIsNotEmpty] = useState(false);
  const [loading, setLoading] = useState(null);
  const [countryInfo, setCountryInfo] = useState();
  const [counryLatLng, setCountryLatLng] = useState([36.7525, 3.04197]);
  const [weatherData, setWeatherData] = useState();
  const [current, setCurrent] = useState();
  const [hideCordsFrom, setHideCordsFrom] = useState(false);
  const [hideCountryFrom, setHideCountryFrom] = useState(true);
  //Get Weather info via Country Name
  const countries = (country) => {
    fetch(
      `${process.env.REACT_APP_API_CITIES}?q=${country}&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then(async (res) => {
        const data = await res.json();
        console.log("Country :", data);
        setCountryInfo(data);
        setCountryLatLng(data["coord"]);
      })
      .catch((err) => console.log("Fetch Error -S:", err));
  };
  // Get weather info via Lat and Lon
  const getWeatherData = (lat, lng) => {
    if (lat && lng) {
      fetch(
        `${process.env.REACT_APP_BASE_URL}?lat=${lat}&lon=${lng}&exclude=minutely,hourly,&appid=${process.env.REACT_APP_API_KEY}`
      )
        .then(async (res) => {
          let data = await res.json();
          console.log("data:", data["daily"]);
          setWeatherData(data);
          setCurrent(data["current"]);
        })
        .catch(function (err) {
          console.log("Fetch Error :-S", err);
        });
    }
  };
  const handelCordsFrom = () => {
    setHideCordsFrom(!hideCordsFrom);
    setHideCountryFrom(!hideCountryFrom);
  };
  const handelCountryFrom = () => {
    setHideCountryFrom(!hideCountryFrom);
    setHideCordsFrom(!hideCordsFrom);
  };
  const addCountryInfo = (e) => {
    console.log("E:", e);
    countries(e);
  };
  const addInfo = (e) => {
    setLat(e[0].lat);
    setLng(e[1].lng);
    //call api here and assign value to the state
    setTimeout(() => {
      setLoading(true);
    }, 500);
    const timer = setTimeout(() => {
      setIsNotEmpty(true);
      setLoading(false);
      getWeatherData(e[0].lat, e[1].lng);
    }, 1000);

    return () => {
      setLoading(false);
      clearTimeout(timer);
    };
  };
  return (
    /* addInfo || countryInfo */
    <div className="app">
      <div className="dashboard">
        <button
          onClick={handelCordsFrom}
          title="Type your coordinates (lat, lng) to get weather info  "
        >
          {" "}
          Cords{" "}
        </button>
        <button
          onClick={handelCountryFrom}
          title="Type your Country or City to get weather info"
        >
          {" "}
          Country{" "}
        </button>
      </div>
      {hideCountryFrom ? <WeatherLayout addInfo={addInfo} /> : null}
      {hideCordsFrom ? <CountryForm addCountryInfo={addCountryInfo} /> : null}
      <Leaflet
        lat={lat}
        lng={lng}
        current={current}
        countryLatLng={counryLatLng}
        countryInfo={countryInfo}
      />
      {loading ? <Loading /> : ""}
      {isNotEmpty ? (
        <WeatherInfo weatherInfo={weatherData} countryInfo={countryInfo} />
      ) : null}
    </div>
  );
}

export default App;
