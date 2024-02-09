import React, { useState, useEffect } from "react";
import "./current-weather.css";

const CurrentWeather = ({ data }) => {
  const [hideDetails, setHideDetails] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://localhost/mdb5react/current-weather.php", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setHideDetails(result.hideDetails);
        } else {
          console.error("Error fetching weather data:", result.message);
        }
      })
      .catch((error) => {
        console.error("An unexpected error occurred:", error);
      });
  }, []);

  const getClothingRecommendation = (temperature) => {
    if (temperature < 1) {
      return "❄️ It's very cold today, so we recommend a thick, warm coat, scarf, hat, and gloves. Don't forget insulated shoes and thick socks!";
    } else if (temperature >= 1 && temperature <= 10) {
      return "🌦️ The weather is cold, and layering is crucial. We suggest wearing a long-sleeved shirt or sweater. A coat can also be helpful to shield against the chilly breeze. A light scarf or shawl that can be easily removed if needed is practical.";
    } else if (temperature >= 11 && temperature <= 15) {
      return "🌤️ Mild weather is expected today. Dress in layers so you can adjust as it gets warmer, and don't forget the light coat. A scarf or hat can still be useful.";
    } else if (temperature >= 16 && temperature <= 20) {
      return "☀️ It's beautiful outside, with pleasant weather. Long pants and a sweater are recommended. Additionally, a thin coat or vest can come in handy.";
    } else if (temperature >= 21 && temperature <= 27) {
      return "🌞 It's nice and comfortably warm. Opt for lighter clothing, like shorts or a thin polo, with long pants. In the early morning or late evening, a sweater or vest might be advisable.";
    } else if (temperature >= 28 && temperature <= 32) {
      return "🔥 It's hot! It's best to wear loose, lightweight clothes, such as a breezy shirt or polo and shorts. Stay hydrated by drinking plenty of fluids.";
    } else {
      return "🏖️ Extreme heat! Wear light, loose clothing, like a swimsuit, a t-shirt, and a skirt or shorts. Always stay hydrated and avoid prolonged exposure to the sun!";
    }
  };

  return (
    <>
      <div className="weather">
        <div className="top">
          <div>
            <p className="city">{data.city}</p>
            <p className="weather-description">
              {data.weather[0]?.description}
            </p>
          </div>
          <img
            alt="weather"
            className="weather-icon"
            src={`icons/${data?.weather[0]?.icon}.png`}
          />
        </div>
        <div className="bottom">
          <p className="temperature">{Math.round(data?.main?.temp)}°C</p>

          <div className="details">
            <div className="parameter-row">
              <span className="parameter-label">Details</span>
              <span>{hideDetails ? "Details are hidden" : " "}</span>
            </div>
            {!hideDetails && (
              <>
                <div className="parameter-row">
                  <span className="parameter-label">Feels like</span>
                  <span className="parameter-value">
                    {Math.round(data?.main?.feels_like)} °C
                  </span>
                </div>
                <div className="parameter-row">
                  <span className="parameter-label">Wind</span>
                  <span className="parameter-value">
                    {data?.wind?.speed} m/s
                  </span>
                </div>
                <div className="parameter-row">
                  <span className="parameter-label">Humidity</span>
                  <span className="parameter-value">
                    {data?.main?.humidity}%
                  </span>
                </div>
                <div className="parameter-row">
                  <span className="parameter-label">Pressure</span>
                  <span className="parameter-value">
                    {data?.main?.pressure} hPa
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="clothing-recommendation">
        {getClothingRecommendation(Math.round(data?.main?.temp))}
      </div>
    </>
  );
};

export default CurrentWeather;
