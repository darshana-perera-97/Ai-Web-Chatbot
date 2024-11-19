import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
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
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleError = () => {
    console.error("Google login failed");
  };

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
