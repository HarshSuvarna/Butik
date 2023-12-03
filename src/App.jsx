// App.js
import React, { useState } from "react";
import './App.css';
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  const handleMobileNumberSubmit = () => {
    setOtpVerified(false); // 
  };

  const handleOtpSubmit = () => {
    setOtpVerified(true);
  };

  return (
    <div className="main">
      {!isAuthenticated && (
        <Auth
        setIsAuthenticated={setIsAuthenticated}
        />
      )}
      {isAuthenticated && <Home />}
    </div>
  );
}

export default App;