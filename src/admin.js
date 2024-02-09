// admin.js
import "./admin.css";
import React, { useEffect, useState, useRef } from "react";
import $ from "jquery"; // Import jQuery
import "datatables.net"; // Import DataTable library

const AdminProfile = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const usersTableRef = useRef(null); // Reference for Users table
  const activationTableRef = useRef(null); // Reference for Activation/Deactivation table

  const fetchUsers = async (adminToken) => {
    try {
      const response = await fetch("https://localhost/mdb5react/getUsers.php", {
        method: "GET",
        headers: {
          Authorization: adminToken,
        },
      });

      const result = await response.json();

      if (result.success) {
        setUsers(result.users);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const adminToken = localStorage.getItem("admin_token");
        if (!adminToken) {
          window.location.href = "http://localhost:3000/adminlogin";
          return;
        }

        const response = await fetch("https://localhost/mdb5react/admin.php", {
          method: "GET",
          headers: {
            Authorization: adminToken,
          },
        });

        const result = await response.json();

        if (result.success) {
          setAdminData(result.admin_data);
          await fetchUsers(adminToken);

          $(usersTableRef.current).DataTable({
            responsive: true,
          });

          $(activationTableRef.current).DataTable({
            responsive: true,
          });
        } else {
          console.error(result.message);
          if (result.message === "Invalid or expired token.") {
            localStorage.removeItem("admin_token");
            window.location.href = "http://localhost:3000/adminlogin";
          }
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, []);

  const handleRemoveUser = async (userId) => {
    try {
      const adminToken = localStorage.getItem("admin_token");
      const response = await fetch(
        `https://localhost/mdb5react/removeUser.php?user_id=${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: adminToken,
          },
        }
      );

      const result = await response.json();

      if (result.success) {
        await fetchUsers(adminToken);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  const handleActivateUser = async (userId) => {
    try {
      const adminToken = localStorage.getItem("admin_token");

      if (!adminToken) {
        window.location.href = "http://localhost:3000/adminlogin";
        return;
      }

      const response = await fetch(
        `https://localhost/mdb5react/deactivateUser.php`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: adminToken,
          },
          body: JSON.stringify({
            user_id: userId,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        await fetchUsers(adminToken);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div className="container">
      {loading ? (
        <p>Loading...</p>
      ) : adminData ? (
        <div>
          <h2>Welcome, {adminData.admin_name}!</h2>
          <p>Email: {adminData.admin_email}</p>
          <table ref={usersTableRef}>
            <thead>
              <tr>
                <th>User ID</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.user_id}>
                  <td>{user.user_id}</td>
                  <td>{user.user_name}</td>
                  <td>{user.user_email}</td>
                  <td>
                    <button onClick={() => handleRemoveUser(user.user_id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {}
          <h3>User Activation/Deactivation</h3>
          <table ref={activationTableRef}>
            <thead>
              <tr>
                <th>User ID</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Activate/Deactivate</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.user_id}>
                  <td>{user.user_id}</td>
                  <td>{user.user_name}</td>
                  <td>{user.user_email}</td>
                  <td>
                    <button onClick={() => handleActivateUser(user.user_id)}>
                      {user.activated ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() =>
              (window.location.href = "http://localhost:3000/statistics")
            }
          >
            Go to Statistics
          </button>
        </div>
      ) : (
        <p>Error loading profile.</p>
      )}
    </div>
  );
};

export default AdminProfile;
