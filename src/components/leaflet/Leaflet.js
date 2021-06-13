import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L, { map } from "leaflet";
import { VenueLocationIcon } from "../VenueLocationIcon";
import "./leaflet.css";
const Leaflet = ({ lat, lng, current, countryLatLng, countryInfo }) => {
  console.log("current from leaflet : ", countryLatLng);

  const data = current;
  const countryData = countryInfo;
  const [info, setInfo] = useState();
  const [country, setCountry] = useState();
  useEffect(() => {
    console.log("current leaflet:", data);
    setInfo(data);
    setCountry(countryData);
  }, [data, countryData]);
  const position = [lat, lng];
  const countryLatLon = countryLatLng;
  console.log("cur:", info && info.temp.toFixed(0).toString().slice(0, 2));

  return (
    <div id="leafltmap">
      <Map center={[36.7525, 3.04197]} zoom={5}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker
          position={position ? countryLatLon : position}
          icon={VenueLocationIcon}
        >
          <Popup>
            {country || info ? (
              <div>
                <div className="weather-mood">
                  {
                    <h3>
                      {new Date(
                        (country && country.dt * 1000) ||
                          (info && info.dt * 1000)
                      ).toLocaleDateString("en", {
                        weekday: "long",
                      })}
                    </h3>
                  }

                  <img
                    src={`${process.env.REACT_APP_IMAGE_URL}${
                      (country && country.weather[0].icon) ||
                      (info && info.weather[0].icon)
                    }.png`}
                  />
                  <small>
                    {" "}
                    {(country && country.weather[0].description) ||
                      (info && info.weather[0].description)}{" "}
                  </small>
                  <b>
                    {" "}
                    {(country &&
                      country.main.temp.toFixed(0).toString().slice(0, 2)) ||
                      (info && info.temp.toFixed(0).toString().slice(0, 2))}
                    <sup>°C</sup>{" "}
                  </b>
                </div>
              </div>
            ) : (
              "Fill the form above  to get more info"
            )}
          </Popup>
        </Marker>
      </Map>
    </div>
  );
};

export default Leaflet;
