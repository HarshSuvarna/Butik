import axios from "axios";

let API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const sendOTP = (params) => {
  return axios.post(`${API_BASE_URL}/send_otp`, params);
};

export const getOtpAPI = (params) => {
  return axios.post(`${API_BASE_URL}/verify_otp`, params);
};
