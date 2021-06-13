import React, { useEffect, useState } from "react";
import "./countryfrom.css";
const CountryForm = ({ addCountryInfo }) => {
  const [country, setCountry] = useState();

  const handelSubmit = (e) => {
    e.preventDefault();
    addCountryInfo([country]);
  };
  useEffect(() => {}, []);
  return (
    <div className="country-info">
      <form id="form-country" onSubmit={handelSubmit}>
        <div className="input-group">
          <input
            required
            type="text"
            autoComplete="true"
            placeholder="Type your country"
            onChange={(e) => {
              let name = e.target.value.toLocaleLowerCase();
              setCountry(name);
            }}
          />
        </div>
        <input type="submit" value="Submit " />
      </form>
    </div>
  );
};

export default CountryForm;
