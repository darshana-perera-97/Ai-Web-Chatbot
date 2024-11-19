import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const email = localStorage.getItem("email");

      if (!email) {
        navigate("/");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/user/${email}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("email");
    navigate("/");
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {userData.name}</p>
      <p>Email: {userData.email}</p>
      <p>Website: {userData.website || "Not provided"}</p>
      <p>Contact Number: {userData.contactNumber || "Not provided"}</p>
      <img
        src={userData.picture}
        alt="User Profile"
        style={{ borderRadius: "50%", width: "100px", height: "100px" }}
      />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
