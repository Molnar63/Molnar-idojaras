import React, { useState, useEffect } from "react";

const UpdateProfile = () => {
  const [userDetails, setUserDetails] = useState({
    user_id: "",
    user_name: "",
    user_email: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

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
          const { user_data } = result;
          setUserDetails({
            user_id: user_data.user_id,
            user_name: user_data.user_name,
            user_email: user_data.user_email,
          });
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

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const formData = {
      user_id: userDetails.user_id,
      user_name: userDetails.user_name,
      user_email: userDetails.user_email,
    };

    try {
      const response = await fetch(
        "https://localhost/mdb5react/update_profile.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.success) {
        setMessage("Profile updated successfully!");
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setMessage(
        "An unexpected error occurred. Please try again or contact support."
      );
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleUpdateProfile}>
          <h3>Update Profile</h3>
          <label htmlFor="user_name">Username:</label>
          <input
            type="text"
            placeholder="Username"
            name="user_name"
            value={userDetails.user_name}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="user_email">Email:</label>
          <input
            type="email"
            placeholder="Email"
            name="user_email"
            value={userDetails.user_email}
            onChange={handleChange}
            required
          />
          <br />
          <button type="submit">Update Profile</button>
          {message && <p>{message}</p>}
        </form>
      )}
    </div>
  );
};

export default UpdateProfile;
