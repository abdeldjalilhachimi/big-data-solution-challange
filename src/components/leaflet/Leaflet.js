import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L, { map } from "leaflet";
import { VenueLocationIcon } from "../VenueLocationIcon";
import "./leaflet.css";
const Leaflet = ({ lat, lng, current }) => {
  console.log("current from leaflet : ", current);

  const data = current;
  const [info, setInfo] = useState();
  useEffect(() => {
    console.log("current leaflet:", data);
    setInfo(data);
  }, [data]);
  const position = [lat, lng];

  console.log("cur:", info && info.temp.toFixed(0).toString().slice(0, 2));

  return (
    <div id="leafltmap">
      <Map center={[36.7525, 3.04197]} zoom={5}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker position={position} icon={VenueLocationIcon}>
          <Popup>
            <div>
              <div className="weather-mood">
                {
                  <h3>
                    {new Date(info && info.dt * 1000).toLocaleDateString("en", {
                      weekday: "long",
                    })}
                  </h3>
                }

                <img
                  src={`${process.env.REACT_APP_IMAGE_URL}${
                    info && info.weather[0].icon
                  }.png`}
                />
                <small> {info && info.weather[0].description} </small>
                <b>
                  {" "}
                  {info && info.temp.toFixed(0).toString().slice(0, 2)}
                  <sup>°C</sup>{" "}
                </b>
              </div>
            </div>
          </Popup>
        </Marker>
      </Map>
    </div>
  );
};

export default Leaflet;
