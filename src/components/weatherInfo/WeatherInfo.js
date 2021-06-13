import React, { useState, useEffect } from "react";
import "./weatherinfo.css";
function WeatherInfo({ weatherInfo }) {
  const data = weatherInfo;

  const [info, setInfo] = useState();
  const [hide, setHide] = useState("block");
  const handelClick = () => {
    setHide("none");
  };
  useEffect(() => {
    setInfo(data);
  }, [data]);
  return (
    <div className="weather-info" style={{ display: hide }}>
      <span className="close" onClick={handelClick}>
        x
      </span>
      <div className="weather-card">
        {info &&
          info["daily"].map((item, index) => {
            return index > 0 ? (
              <div className="forecast-day" key={index}>
                <h5>
                  {new Date(item.dt * 1000).toLocaleDateString("en", {
                    weekday: "long",
                  })}
                </h5>
                <div>
                  <div className="weather-mood">
                    <img
                      src={`${process.env.REACT_APP_IMAGE_URL}${item.weather[0].icon}.png`}
                    />
                    <small> {item.weather[0].description} </small>
                  </div>
                </div>
                <div className="forecast-day--temp">
                  <b> {item.temp.day.toFixed(0).toString().slice(0, 2)}</b>
                  <sup>°C</sup>
                </div>
              </div>
            ) : null;
          })}
      </div>
    </div>
  );
}

export default WeatherInfo;
