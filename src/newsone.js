// src/components/NewsOne.js
import React from "react";
import "./article.css";

function NewsOne() {
  return (
    <div className="news-one-container">
      <div className="news-one-content">
        <img
          src={"newsimages/news1.png"}
          alt="News 1"
          className="news-one-image"
        />
        <div className="news-one-text">
          <h2>Is the electric car the future?</h2>
          <p>
            While many still doubt it today, the wave of electric driving has
            already begun. Even the previously acclaimed best car manufacturers
            have noticed this. Those who understand new technologies benefit the
            most from these revolutionary changes. For example, someone who can
            assemble an electric car is undoubtedly facing an enticing career.
            True, this is not the classic crash course model - an expert needs
            to acquire serious and extensive knowledge because they won't be
            playing with toy dolls, but with dangerous electrical devices.
          </p>
          <p>
            In the 21st century, there is a growing social awareness of
            environmental protection and sustainability, which has an impact on
            various industries, including the automotive industry. Choosing a
            career path in the automotive industry that pays off in terms of
            such commitment to green and sustainable solutions is rewarding.
          </p>
          <p>
            The proliferation of electric vehicles and the development of
            sustainable technologies create new opportunities for professionals
            in the automotive industry. The design, production, and maintenance
            of hybrid and electric cars can provide excellent career
            opportunities in areas focusing on the transition to green
            technologies.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NewsOne;
