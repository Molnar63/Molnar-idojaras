import React, { useEffect, useState, useRef } from "react";
import "./statistics.css";
import { Link } from "react-router-dom";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import "datatables.net";
import "datatables.net-responsive";

const Statistics = () => {
  const [viewedCities, setViewedCities] = useState([]);
  const [userCities, setUserCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const viewedCitiesTableRef = useRef(null);
  const userCitiesTableRef = useRef(null);

  useEffect(() => {
    const fetchViewedCities = async () => {
      try {
        const adminToken = localStorage.getItem("admin_token");
        if (!adminToken) {
          window.location.href = "http://localhost:3000/adminlogin";
          return;
        }

        const response = await fetch(
          "https://localhost/mdb5react/statistics.php",
          {
            method: "GET",
            headers: {
              Authorization: adminToken,
            },
          }
        );

        const result = await response.json();

        if (result.success) {
          setViewedCities(result.viewed_cities);
          setUserCities(result.user_cities);
          setLoading(false);

          $(viewedCitiesTableRef.current).DataTable({
            responsive: true,
          });

          $(userCitiesTableRef.current).DataTable({
            responsive: true,
          });
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
        setLoading(false);
      }
    };

    fetchViewedCities();
  }, []);

  return (
    <div className="statistics-container">
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : (
        <div className="table-container">
          <h2>Viewed Cities Statistics</h2>
          <table ref={viewedCitiesTableRef}>
            <thead>
              <tr>
                <th>City</th>
                <th>View Count</th>
              </tr>
            </thead>
            <tbody>
              {viewedCities.map((city, index) => (
                <tr key={index}>
                  <td>{city.city}</td>
                  <td>{city.view_count}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>User-City Statistics</h2>
          <table ref={userCitiesTableRef}>
            <thead>
              <tr>
                <th>User Name</th>
                <th>City</th>
                <th>IP address</th>
                <th>Device type</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {userCities.map((userCity, index) => (
                <tr key={index}>
                  <td>{userCity.user_name}</td>
                  <td>{userCity.city}</td>
                  <td>{userCity.ip_address}</td>
                  <td>{userCity.device_type}</td>
                  <td>{userCity.date_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/admin">back to the admin page</Link>
        </div>
      )}
    </div>
  );
};

export default Statistics;
