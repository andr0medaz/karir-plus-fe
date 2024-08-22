import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import {useNavigate } from "react-router-dom"; // Import useNavigate
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axios from "axios";
import image1 from "../../assets/logo-pdam-way-rilau.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Tolong masukkan email yang valid!");
      return;
    }

    if (!password) {
      setError("Silahkan masukkan password anda");
      return;
    }

    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username: email,
        password,
      });

      console.log("Login successful", response.data);

      // Use the navigate function to redirect
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Login failed");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="py-10 bg-white border rounded w-96 px-7">
          <form onSubmit={handleLogin}>
            <div className="flex flex-col items-center">
                <h4 className="text-2xl mb-7">Login</h4>
              {/* Insert Image Here */}
              <div className="flex justify-center mb-4">
                <img
                  src={image1} // Replace with your image path
                  alt="Login Illustration"
                  className="object-cover w-32 h-32" // Adjust size and styles as needed
                />
              </div>
            </div>

            <input type="text" placeholder="Email" className="input-box" value={email} onChange={(e) => setEmail(e.target.value)} />

            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />

            {error && <p className="pb-1 text-xs text-red-500">{error}</p>}

            <button type="submit" className="btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
