import React, { useEffect, useState } from "react";
import "./profile.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailsSwitch, setDetailsSwitch] = useState(null);
  const [lastVisited, setLastVisited] = useState([]);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          window.location.href = "http://localhost:3000/login";
          return;
        }

        const response = await fetch(
          "https://localhost/mdb5react/profile.php",
          {
            method: "GET",
            headers: {
              Authorization: token,
            },
          }
        );

        const result = await response.json();

        if (result.success) {
          setUserData(result.user_data);

          const lastVisitedResponse = await fetch(
            "https://localhost/mdb5react/profile.php",
            {
              method: "GET",
              headers: {
                Authorization: token,
              },
            }
          );

          const lastVisitedResult = await lastVisitedResponse.json();

          if (lastVisitedResult.success) {
            setLastVisited(lastVisitedResult.last_visited);
          } else {
            console.error(lastVisitedResult.message);
          }

          // Fetch user's options
          const optionsResponse = await fetch(
            "https://localhost/mdb5react/getOptions.php",
            {
              method: "GET",
              headers: {
                Authorization: token,
              },
            }
          );

          const optionsResult = await optionsResponse.json();

          if (optionsResult.success) {
            setDetailsSwitch(optionsResult.detailsSwitch);
          } else {
            console.error(optionsResult.message);
          }

          const notificationsResponse = await fetch(
            "https://localhost/mdb5react/shownotifications.php",
            {
              method: "GET",
              headers: {
                Authorization: token,
              },
            }
          );

          const notificationsResult = await notificationsResponse.json();

          if (notificationsResult.success) {
            setNotifications(notificationsResult.notifications);
          } else {
            console.error(notificationsResult.message);
          }
        } else {
          console.error(result.message);
          if (result.message === "Invalid or expired token.") {
            localStorage.removeItem("token");
            window.location.href = "http://localhost:3000/login";
          }
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleToggleNotifications = async (city) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "http://localhost:3000/login";
        return;
      }

      const response = await fetch(
        "https://localhost/mdb5react/turnoffnotifications.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ city: city }),
        }
      );

      const result = await response.json();

      if (result.success) {
        const notificationsResponse = await fetch(
          "https://localhost/mdb5react/shownotifications.php",
          {
            method: "GET",
            headers: {
              Authorization: token,
            },
          }
        );

        const notificationsResult = await notificationsResponse.json();

        if (notificationsResult.success) {
          setNotifications(notificationsResult.notifications);
        } else {
          console.error(notificationsResult.message);
        }
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };
  const handleRemoveFavorite = async (city) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "http://localhost:3000/login";
        return;
      }
      const response = await fetch(
        `https://localhost/mdb5react/removeFavorite.php?city=${city}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );

      const result = await response.json();

      if (result.success) {
        setUserData((prevUserData) => ({
          ...prevUserData,
          favorites: prevUserData.favorites.filter((fav) => fav !== city),
        }));
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  const handleSwitchToggle = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "http://localhost:3000/login";
        return;
      }

      const newSwitchValue = detailsSwitch ? 0 : 1;

      const switchResponse = await fetch(
        "https://localhost/mdb5react/updateSwitch.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ switchValue: newSwitchValue }),
        }
      );

      const switchResult = await switchResponse.json();

      if (switchResult.success) {
        setDetailsSwitch(newSwitchValue);
      } else {
        console.error(switchResult.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  const handleSnowNotifications = async (city) => {
    console.log("City:", city);

    try {
      const response = await fetch(
        "https://localhost/mdb5react/snownotifications.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({ city: city }),
        }
      );

      const result = await response.json();

      if (result.success) {
        console.log("Snow notification added successfully!");
      } else {
        console.error(result.message);

        if (result.message === "Invalid or expired token.") {
          localStorage.removeItem("token");
          window.location.href = "http://localhost:3000/login";
        } else if (result.message === "Authorization header missing.") {
        } else {
        }
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div className="profile-container">
      {loading ? (
        <p>Loading...</p>
      ) : userData ? (
        <div className="profile-info">
          <h2>Welcome, {userData.user_name}!</h2>
          <p>Email: {userData.user_email}</p>
          <h3>Favorites:</h3>
          {userData.favorites && userData.favorites.length > 0 ? (
            <ul className="favorites-list">
              {userData.favorites.map((favorite, index) => (
                <li key={index}>
                  {favorite}{" "}
                  <button onClick={() => handleRemoveFavorite(favorite)}>
                    Remove
                  </button>
                  <button onClick={() => handleSnowNotifications(favorite)}>
                    Turn on notifications
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No favorites yet.</p>
          )}

          {}
          {detailsSwitch !== null && (
            <div className="details-switch">
              <p>Details are turned {detailsSwitch ? "off" : "on"}.</p>
              <button onClick={handleSwitchToggle}>Toggle Switch</button>
            </div>
          )}

          <h3>Last Visited:</h3>
          {lastVisited && lastVisited.length > 0 ? (
            <ul className="last-visited-list">
              {lastVisited.map((visit, index) => (
                <li key={index}>
                  {visit.city} - {visit.date_time}
                </li>
              ))}
            </ul>
          ) : (
            <p>No last visited sites yet.</p>
          )}

          <h3>Notifications:</h3>
          {notifications && notifications.length > 0 ? (
            <>
              <table className="notifications-table">
                <thead>
                  <tr>
                    <th>City</th>
                    <th>Expires</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.map((notification, index) => (
                    <tr key={index}>
                      <td>{notification.city}</td>
                      <td>{notification.expires}</td>
                      <td>{notification.active ? "Active" : "Inactive"}</td>
                      <td>
                        <button
                          onClick={() =>
                            handleToggleNotifications(notification.city)
                          }
                        >
                          {notification.active ? "Turn Off" : "Turn On"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <p>No notifications yet.</p>
          )}
          <button
            className="update-profile-btn"
            onClick={() =>
              (window.location.href = "http://localhost:3000/updateProfile")
            }
          >
            Update your profile
          </button>
        </div>
      ) : (
        <p>Error loading profile.</p>
      )}
    </div>
  );
};

export default Profile;
