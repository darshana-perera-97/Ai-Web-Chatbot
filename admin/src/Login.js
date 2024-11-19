import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "./Design/Pages/RegistrationForm"; // Import the new UI component

function Login() {
  const [newUser, setNewUser] = useState(false); // Track if it's a new user
  const [userInfo, setUserInfo] = useState(null); // Store user info temporarily
  const navigate = useNavigate();

  const handleSuccess = async (response) => {
    const decodedToken = jwtDecode(response.credential);
    const { email, name, picture } = decodedToken;

    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        name,
        picture,
      });
      localStorage.setItem("email", email);

      if (res.data.registered) {
        navigate("/dashboard"); // Navigate to dashboard for registered users
      } else {
        // For new users, store user info and show the registration form
        setUserInfo({ email, name, picture });
        setNewUser(true);
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleError = () => {
    console.error("Google login failed");
  };

  if (newUser && userInfo) {
    // Render the registration form for new users
    return <RegistrationForm userInfo={userInfo} />;
  }

  return (
    <GoogleOAuthProvider clientId="217224559773-kqu6heilvpmqq2qodtcja1cfbr6isjb9.apps.googleusercontent.com">
      <div>
        <h1>Login</h1>
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
