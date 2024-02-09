// src/components/NewsOne.js
import React from "react";
import "./article.css";

function NewsThree() {
  return (
    <div className="news-one-container">
      <div className="news-one-content">
        <img
          src={"newsimages/news3.png"}
          alt="News 3"
          className="news-one-image"
        />
        <div className="news-one-text">
          <h2>
            Why do we name storms, and what is the basis for giving them names?
          </h2>
          <p>
            It might be confusing at times when experts refer to storms by their
            names. However, names like Katrina, Diane, Agnes, and others are not
            assigned randomly; naming storms has been a long-standing practice
            in meteorology.
          </p>
          <p>
            People have been naming storms since approximately the 1500s, often
            using the names of saints for this purpose. It is likely that storms
            occurring around the feast days of certain saints led to this
            tradition.
          </p>
          <p>
            The first official names for storms were assigned by Clement Wragge,
            who was born in Staffordshire but moved to Australia. He borrowed
            names from mythological figures in Greek and Roman mythology.
            However, the contemporary Australian government did not appreciate
            Wragge enough to appoint him as the director of the new
            meteorological office, a decision he took offense to. As a result,
            during this period, some storms were named after Australian
            politicians.
          </p>
          <p>
            The naming process was later taken over by the United States Air
            Force Hurricane Office in Miami in the late 1940s. Their system
            initially aligned with the military alphabet in use at the time,
            with storm names like Alpha, Bravo, Charlie, etc. However, this
            caused confusion in military information flow, as these letters were
            used in various contexts, leading to misunderstandings.
          </p>
          <p>
            In the 1950s, American meteorologists began using female names,
            simplifying and making information more accessible. Initially, only
            female names were used, but this practice did not last long.
          </p>
          <p>
            The problem wasn't just that it was offensive to exclusively assign
            destructive storms female names. People felt less fear when hearing
            kind-sounding female names. A 2014 study pointed out that storms and
            hurricanes with female names caused more casualties than their
            male-named counterparts, which could be attributed to this reason.
          </p>
          <p>
            As a result, male names were introduced into the rotation, giving
            rise to storms like Andrew, Gilbert, or Dorian (all of which
            incidentally developed into Category 5 hurricanes). There have been
            ongoing changes in naming conventions. The 2020 hurricane season
            generated a record number of hurricanes, causing experts to quickly
            run out of names allocated for that year. Subsequently, they began
            using the Greek alphabet, but this proved challenging to follow.
            Nowadays, experts predefine reserve names for each year to address
            this issue.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NewsThree;
