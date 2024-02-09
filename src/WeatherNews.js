// src/components/WeatherNews.js
import React from "react";
import { Link } from "react-router-dom";
import "./news.css";
const newsData = [
  {
    id: 1,
    title: "Is the electric car the future?",
    description:
      "While many still doubt it today, the wave of electric driving has already begun.",
    image: "newsimages/news1.png",
    link: "/newsone",
  },
  {
    id: 2,
    title: "London slowly becomes vulnerable to intense waves",
    description:
      "Serious flood protection system must be in place to keep the city center safe from storm surges.",
    image: "newsimages/news2.png",
    link: "/newstwo",
  },
  {
    id: 3,
    title:
      "Why do we name storms, and what is the basis for giving them names?",
    description:
      "It might be confusing at times when experts refer to storms by their names. Katrina, Diane, Agnes, and others are not assigned randomly.",
    image: "newsimages/news3.png",
    link: "/newsthree",
  },
];

function WeatherNews() {
  return (
    <div className="news-container">
      <h1>Weather News</h1>
      {newsData.map((news) => (
        <div key={news.id} className="news-item">
          <div className="news-image">
            <img src={news.image} alt={`News ${news.id}`} />
          </div>
          <div className="news-content">
            <h2>{news.title}</h2>
            <p>{news.description}</p>
            <Link to={news.link}>Read more</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WeatherNews;
