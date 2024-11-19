import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegistrationForm({ userInfo }) {
  const [website, setWebsite] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const { email, name, picture } = userInfo;

    try {
      await axios.post("http://localhost:5000/register", {
        email,
        name,
        picture,
        website,
        contactNumber,
      });
      navigate("/dashboard"); // Navigate to dashboard after registration
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div>
      <h1>Welcome, {userInfo.name}!</h1>
      <p>We need a bit more information to complete your registration.</p>
      <input
        type="text"
        placeholder="Website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />
      <input
        type="text"
        placeholder="Contact Number"
        value={contactNumber}
        onChange={(e) => setContactNumber(e.target.value)}
      />
      <button onClick={handleRegister}>Complete Registration</button>
    </div>
  );
}

export default RegistrationForm;
