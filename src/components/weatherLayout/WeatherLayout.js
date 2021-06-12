import React, { useState } from "react";
import "./weatherlayout.css";

const WeatherLayout = ({ addInfo }) => {
  const [lat, setLat] = useState({
    lat: "",
  });
  const [lng, setLng] = useState({
    lng: "",
  });

  const handelSubmit = (e) => {
    e.preventDefault();

    addInfo([lat, lng]);
    console.log("data:", lat, lng);
  };
  return (
    <div className="container">
      <div className="user-info">
        <h1>Weather Forecast </h1>
        <form id="form" onSubmit={handelSubmit}>
          <div className="input-group">
            <label> Add Lat</label>
            <input
              type="text"
              name="lat"
              value={lat.lat}
              onChange={(e) => setLat({ lat: e.target.value })}
              placeholder="Type you lat"
              required
            />
          </div>
          <div className="input-group">
            <label> Add Lng</label>
            <input
              type="text"
              name="lng"
              value={lng.lng}
              onChange={(e) => setLng({ lng: e.target.value })}
              placeholder="Type you lng"
              required
            />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default WeatherLayout;
