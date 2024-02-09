import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItemPanel,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
} from "react-accessible-accordion";
import "./Forecast.css";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data }) => {
  const [hidePanel, setHidePanel] = useState(false);
  const [precipitationNotification, setPrecipitationNotification] = useState(
    []
  );

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch weather data from the PHP page
    fetch("https://localhost/mdb5react/current-weather.php", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setHidePanel(result.hideDetails);
        } else {
          console.error("Error fetching weather data:", result.message);
        }
      })
      .catch((error) => {
        console.error("An unexpected error occurred:", error);
      });
  }, []);

  const dayinInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayinInAWeek).concat(
    WEEK_DAYS.slice(0, dayinInAWeek)
  );

  // Calculate precipitation days directly in the main useEffect
  const precipitationDays = data.list
    .slice(0, 7)
    .filter(
      (item, idx) =>
        item.weather[0].main === "Rain" || item.weather[0].main === "Snow"
    )
    .map((_, idx) => forecastDays[idx]);

  // Update precipitationNotification state
  useEffect(() => {
    if (precipitationDays.length > 0) {
      setPrecipitationNotification(precipitationDays);
    }
  }, [precipitationDays]);

  return (
    <>
      {precipitationNotification.length > 0 && (
        <div className="precipitation-notification">
          {`There will be rain or snow on ${precipitationNotification.join(
            ", "
          )}`}
        </div>
      )}

      <Accordion allowZeroExpanded>
        {data.list.slice(0, 7).map((item, idx) => {
          return (
            <AccordionItem key={idx}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className="daily-item">
                    <img
                      alt="weather"
                      className="icon-small"
                      src={`icons/${item.weather[0].icon}.png`}
                    />
                    <label className="day">{forecastDays[idx]}</label>
                    <label className="description">
                      {item.weather[0].description}
                    </label>
                    <label className="temp">{item.main.temp_max}°C</label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                {!hidePanel && (
                  <div className="daily-details-grid">
                    <div className="daily-details-grid-item">
                      <label>Pressure</label>
                      <label>{item.main.pressure} hPa</label>
                    </div>

                    <div className="daily-details-grid-item">
                      <label>Humidity</label>
                      <label>{item.main.humidity} %</label>
                    </div>

                    <div className="daily-details-grid-item">
                      <label>Clouds</label>
                      <label>{item.clouds.all} %</label>
                    </div>

                    <div className="daily-details-grid-item">
                      <label>Wind</label>
                      <label>{item.wind.speed} m/s</label>
                    </div>

                    <div className="daily-details-grid-item">
                      <label>Sea level</label>
                      <label>{item.main.sea_level} m</label>
                    </div>

                    <div className="daily-details-grid-item">
                      <label>Feels like</label>
                      <label>{item.main.feels_like} °C</label>
                    </div>
                  </div>
                )}
              </AccordionItemPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};

export default Forecast;
