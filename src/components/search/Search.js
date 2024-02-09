// Search.js

import React, { useState, useEffect } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";
import "./search.css";

const Search = ({ onSearchChange, onQuickSearch }) => {
  const [search, setSearch] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (isLoggedIn) {
      fetchFavorites();
      fetchUserProfile(token);
    }
  }, [isLoggedIn]);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch("https://localhost/mdb5react/profile.php", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      const result = await response.json();

      if (result.success) {
        setUserData(result.user_data);
      } else {
        console.error(result.message);
        if (result.message === "Invalid or expired token.") {
          localStorage.removeItem("token");
          window.location.href = "http://localhost:3000/login";
        }
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=50000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);

    if (isLoggedIn && searchData && searchData.value && userData) {
      const [latitude, longitude] = searchData.value.split(" ");
      const city = searchData.label;

      fetch("https://localhost/mdb5react/views.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ city, user_id: userData.user_id }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            console.log("Search data sent to views.php successfully!");
          } else {
            console.error(
              "Error sending search data to views.php:",
              result.message
            );
          }
        })
        .catch((error) => {
          console.error("An unexpected error occurred:", error);
        });

      onQuickSearch({ city, latitude, longitude });
    }
  };

  const fetchFavorites = () => {
    const token = localStorage.getItem("token");

    fetch("https://localhost/mdb5react/search.php", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setFavorites(result.favorites);
        } else {
          console.error("Error fetching favorites:", result.message);
        }
      })
      .catch((error) => {
        console.error("An unexpected error occurred:", error);
      });
  };

  const handleAddToFavorites = () => {
    if (isLoggedIn && search) {
      const token = localStorage.getItem("token");

      const { label, value } = search;
      const [latitude, longitude] = value.split(" ");

      const favoriteObject = { city: label, latitude, longitude };

      fetch("https://localhost/mdb5react/favorite.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(favoriteObject),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            console.log("City added to favorites successfully!");
            fetchFavorites();

            onQuickSearch(favoriteObject);
          } else {
            console.error("Error adding city to favorites:", result.message);
          }
        })
        .catch((error) => {
          console.error("An unexpected error occurred:", error);
        });
    }
  };

  return (
    <div className="search-container">
      {" "}
      {}
      {favorites.length > 0 && (
        <div>
          <h3>Favorites:</h3>
          {favorites.map((favorite, index) => (
            <button
              key={index}
              onClick={() =>
                onQuickSearch({
                  city: favorite.city,
                  latitude: favorite.latitude,
                  longitude: favorite.longitude,
                })
              }
            >
              {`${favorite.city}`}
            </button>
          ))}
        </div>
      )}
      <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
      {isLoggedIn && search && (
        <button
          className="search-button"
          onClick={() => handleAddToFavorites(search)}
        >
          Add to Favorites
        </button>
      )}
    </div>
  );
};

export default Search;
