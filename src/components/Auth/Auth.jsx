// components/Auth/Auth.js

import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import countryCodes from "../../countryCodes.json";
import "./auth.css";

const Auth = ({ setIsAuthenticated }) => {
  const [countryCode, setCountryCode] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  const handleMobileNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setMobileNumber(input);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleMobileNumberSubmit = async (e) => {
    e.preventDefault();

    let data = JSON.stringify({
      "cc": countryCode,
      "mobile": mobileNumber
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://main-emu7ybkl6a-el.a.run.app/send_otp',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setOtpSent(true)
      })
      .catch((error) => {
        console.log(error);
      });
  }


  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    let data = JSON.stringify({
      "cc": countryCode,
      "mobile": mobileNumber,
      otp,
      "otp_for": "user"
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://main-emu7ybkl6a-el.a.run.app/verify_otp',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        setIsAuthenticated(true); // Pass success flag to parent component
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
        setIsAuthenticated(false); // Pass failure flag to parent component
      });
  };

  return (
    <div className="auth-container">
      {!otpSent && (
        <>
          <h2>Mobile Number Login</h2>
          <form onSubmit={handleMobileNumberSubmit}>
            <div className="country-code-select">
              <label htmlFor="countryCode">Country Code:</label>
              <select
                id="countryCode"
                name="countryCode"
                value={countryCode}
                onChange={handleCountryCodeChange}
                required
              >
                {countryCodes.map((country, index) => (
                  <option key={index} value={country.code}>
                    {`${country.name} (${country.code})`}
                  </option>
                ))}
              </select>
            </div>
            <label htmlFor="mobileNumber">Mobile Number:</label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              placeholder="Enter your mobile number"
              value={mobileNumber}
              maxLength={10}
              onChange={handleMobileNumberChange}
              required
            />
            <button type="submit">Send OTP</button>
          </form>
        </>
      )}
      {otpSent && (
        <>
          <h2>Verify OTP</h2>
          <form onSubmit={handleOtpSubmit}>
            <label htmlFor="otp">Enter OTP:</label>
            <input
              type="text"
              id="otp"
              name="otp"
              placeholder="Enter the OTP sent to your mobile"
              value={otp}
              onChange={handleOtpChange}
              required
            />
            <button type="submit">Verify OTP</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Auth;