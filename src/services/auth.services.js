import axios from "axios";

export const sendOTP = (params) => {
  return axios.post("/send_otp", params);
};

export const getOtpAPI = (params) => {
  return axios.post("/verify_otp", params);
};

export const getUser = () => {
  return axios.get("/getUserByToken");
};
