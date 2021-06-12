import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L, { map } from "leaflet";
import { VenueLocationIcon } from "../VenueLocationIcon";
import "./leaflet.css";
const Leaflet = ({ lat, lng }) => {
  const position = [lat, lng];

  return (
    <div id="leafltmap">
      <Map center={[36.7525, 3.04197]} zoom={5}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker position={position} icon={VenueLocationIcon}>
          <Popup>
            Hello <br /> I am good
          </Popup>
          <Tooltip>I am here</Tooltip>
        </Marker>
      </Map>
    </div>
  );
};

export default Leaflet;
