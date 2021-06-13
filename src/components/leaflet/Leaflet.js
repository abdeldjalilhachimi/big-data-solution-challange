import React, { useState, useEffect, useRef } from "react";
import { Map, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import { VenueLocationIcon } from "../VenueLocationIcon";
import "./leaflet.css";
const Leaflet = ({ lat, lng, current, countryLatLng, countryInfo }) => {
  let mapRef = useRef();
  const data = current;
  const countryData = countryInfo;
  const [info, setInfo] = useState();
  const [country, setCountry] = useState();

  // Fly to a specefic Possition
  const flyOnSpecificPos = (lat, lng, info, country) => {
    const map = mapRef.current?.leafletElement;
    map.flyTo([lat, lng], 10);
    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(
        `
           <div className="weather-mood">
              <h3> ${new Date(
                (country && country.dt * 1000) || (info && info.dt * 1000)
              ).toLocaleDateString("en", {
                weekday: "long",
              })}
                </h3>
                <img
                  src="${process.env.REACT_APP_IMAGE_URL}${
          (country && country.weather[0].icon) || (info && info.weather[0].icon)
        }.png"
                /> 
                <div>
                  <small >
                  ${
                    (country && country.weather[0].description) ||
                    (info && info.weather[0].description)
                  }
                </small>
                </div>
                <div>
                    <br>
                    ${
                      (country &&
                        country.main.temp.toFixed(0).toString().slice(0, 2)) ||
                      (info && info.temp.toFixed(0).toString().slice(0, 2))
                    }
                    <sup>°C</sup>
                  </br>
                </div> 
               
            </div> 
          `
      );
  };
  // Fly to a specrfic Country
  const flyOnSpecificCountry = (countryLatLng, country) => {
    const map = mapRef.current?.leafletElement;
    console.log("cords:", countryLatLng);
    console.log("country", country);

    map.flyTo([countryLatLng.lat, countryLatLng.lon], 10);
    L.marker([countryLatLng.lat, countryLatLng.lon])
      .addTo(map)
      .bindPopup(
        `
          <div className="weather-mood">
              <h3> ${new Date(country && country.dt * 1000).toLocaleDateString(
                "en",
                {
                  weekday: "long",
                }
              )}
                </h3>
                <img
                  src="${process.env.REACT_APP_IMAGE_URL}${
          country && country.weather[0].icon
        }.png"
                /> 
                <div>
                  <small >
                  ${country && country.weather[0].description}
                </small>
                </div>
                <div>
                    <br>
                    ${
                      country &&
                      country.main.temp.toFixed(0).toString().slice(0, 2)
                    }
                    <sup>°C</sup>
                  </br>
                </div> 
               
            </div> 
          `
      );
  };
  useEffect(() => {
    setInfo(data);
    setCountry(countryData);
    flyOnSpecificPos(lat, lng, info, country);
    flyOnSpecificCountry(countryLatLng, country);
  }, [data, countryData, countryLatLng]);

  /* const position = [lat, lng];
  const countryLatLon = countryLatLng;
 */
  return (
    <div id="leafltmap">
      <Map center={[36.7525, 3.04197]} zoom={13} ref={mapRef}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {/*         <Marker position={position}>
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
        </Marker> */}
      </Map>
    </div>
  );
};

export default Leaflet;
