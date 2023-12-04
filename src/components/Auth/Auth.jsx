// components/Auth/Auth.js

import React, { useState } from "react";
import countryCodes from "../../countryCodes.json";
import "./auth.css";
import { getOtpAPI, sendOTP } from "../../services/auth.services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { jwtDecode } from "jwt-decode";

const Auth = ({ setIsAuthenticated, cookies }) => {
  const [countryCode, setCountryCode] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const login = (token) => {
    console.log("token :>> ", token);
    const decoded = jwtDecode(token);
    cookies.set("jwt_authorization", token, {
      expired: new Date(decoded.exp * 1000),
    });
    setIsAuthenticated(true);
  };

  const handleMobileNumberSubmit = async (e) => {
    e.preventDefault();

    try {
      let data = {
        cc: countryCode,
        mobile: mobileNumber,
      };

      setLoading(true);
      const res = await sendOTP(data);
      console.log("res :>> ", res);
      if (res) {
        setOtpSent(true);
      }
    } catch (e) {
      console.log("e :>> ", e);
      toast("Invalid phone number");
      console.log("Error:", e.message || e.error || e);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    try {
      e.preventDefault();
      let data = {
        cc: countryCode,
        mobile: mobileNumber,
        otp,
        otp_for: "user",
      };
      setLoading(true);
      const res = await getOtpAPI(data);
      setLoading(false);
      if (res?.data?.token) {
        login(res?.data?.Token);
      }
      toast(res?.data?.message || res?.message_status || "Incorrect OTP");
      setIsAuthenticated(true);
    } catch (e) {
      setLoading(false);
      toast("Incorrect OTP");
      console.log(e.message || e.error || e);
    }
  };

  return (
    <div className="auth-container">
      <ToastContainer />
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
            <label htmlFor="mobileNumber">Mobile Number</label>
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
            <button type="submit">
              {loading ? (
                <ClipLoader loading={loading} size={10} color="white" />
              ) : (
                "Submit"
              )}
            </button>
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
              placeholder="Enter the OTP"
              value={otp}
              onChange={handleOtpChange}
              required
            />
            <button type="submit">
              {loading ? (
                <ClipLoader loading={loading} size={10} color="white" />
              ) : (
                "Verify OTP"
              )}
            </button>
          </form>
          <p
            onClick={() => {
              setOtpSent(false);
              setOtp("");
            }}
          >
            Back
          </p>
        </>
      )}
    </div>
  );
};

export default Auth;