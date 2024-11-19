import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const email = localStorage.getItem("email");

      // If no email found in localStorage, redirect to login
      if (!email) {
        navigate("/");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/user/${email}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Redirect to login if the user is not found
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {userData.name}</p>
      <p>Email: {userData.email}</p>
      {userData.website ? (
        <p>Website: {userData.website}</p>
      ) : (
        <p>No website provided</p>
      )}
      <img
        src={userData.picture}
        alt="User Profile"
        style={{ borderRadius: "50%", width: "100px", height: "100px" }}
      />
    </div>
  );
}

export default Dashboard;
