// src/components/NewsOne.js
import React from "react";
import "./article.css";

function NewsTwo() {
  return (
    <div className="news-one-container">
      <div className="news-one-content">
        <img
          src={"newsimages/news2.png"}
          alt="News 2"
          className="news-one-image"
        />
        <div className="news-one-text">
          <h2>London slowly becomes vulnerable to intense waves</h2>
          <p>
            London is one of the world's most well-known cities; however, few
            are aware that a serious flood protection system must be in place to
            keep the city center safe from storm surges.
          </p>
          <p>
            The necessity of the barrier system, known as the Thames Barrier,
            was unquestionable because the river has a wide estuary where wave
            heights can reach significant proportions during storms. The
            construction of the barrier began in 1974 with this in mind.
          </p>
          <p>
            It was completed in 1984, and since then, the system has faithfully
            guarded London's peace. With a width of 520 meters, it is the
            largest flood protection system of its kind, safeguarding
            approximately 325 square kilometers of the capital. However, there
            is a slight issue.
          </p>
          <p>
            During its planning, experts did not account for the climate
            catastrophe taking such rapid and extensive proportions, resulting
            in a rapid increase in sea levels. Consequently, the barrier system
            will not be able to effectively mitigate incoming intense waves for
            much longer, especially considering that climate change not only
            raises sea levels but also significantly intensifies storms.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NewsTwo;
