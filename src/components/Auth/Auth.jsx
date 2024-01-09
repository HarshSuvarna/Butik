// components/Auth/Auth.js

import React, { useState, useEffect } from "react";
import { countryCodes } from "../../constants";
import "./auth.css";
import { getOtpAPI, sendOTP } from "../../services/auth.services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { Loader } from "../UIElements/Loader";
import Select from "react-select";

const Auth = ({ setIsAuthenticated, cookies }) => {
  const [countryCode, setCountryCode] = useState("+44");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  // const [time, setTime] = useState("");
  // useEffect(() => {
  //   setTimeout(() => {
  //     let newTime = new Date();
  //     let currentTime =
  //       newTime.getHours().toString() +
  //       ":" +
  //       newTime.getMinutes().toString() +
  //       ":" +
  //       newTime.getSeconds().toString();
  //     setTime(currentTime);
  //   }, 1000);
  // }, [time]);

  const handleMobileNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    setMobileNumber(input);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const login = (token) => {
    const decoded = jwtDecode(token);
    window.localStorage.setItem("auth", JSON.stringify(decoded));
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
      if (res) {
        setOtpSent(true);
      }
    } catch (e) {
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
      if (res?.data?.Token) {
        login(res?.data?.Token, res);
      }
    } catch (e) {
      setLoading(false);
      toast("Incorrect OTP");
      console.log(e.message || e.error || e);
    }
  };

  return (
    <div className="auth-container">
      <ToastContainer />
      {!otpSent ? (
        <div className="phone-number-container">
          <h2>Login</h2>
          <form>
            <div className="country-code-select">
              <p>Country</p>
              <div>
                <Select
                  options={countryCodes}
                  onChange={(opt) => {
                    setCountryCode(opt?.value);
                  }}
                  defaultValue={countryCodes[1] || "Select"}
                  styles={{ width: "3px" }}
                />
              </div>
              <p>Mobile</p>
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
            </div>
          </form>
          <button onClick={handleMobileNumberSubmit} type="submit">
            {loading ? <Loader dim={"14px"} /> : "Send OTP"}
          </button>

          {/* <div className="time">{time}</div> */}
        </div>
      ) : (
        <div className="otp-page-container">
          <h2>Verify OTP</h2>
          <form>
            <label htmlFor="otp">Enter OTP</label>
            <input
              type="text"
              id="otp"
              name="otp"
              placeholder="Enter the OTP"
              value={otp}
              onChange={handleOtpChange}
              required
            />
          </form>
          <div className="buttons-container">
            <button onClick={handleOtpSubmit} type="submit">
              {loading ? <Loader /> : "Verify OTP"}
            </button>
            <p
              onClick={() => {
                setOtpSent(false);
                setOtp("");
              }}
            >
              Back
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
