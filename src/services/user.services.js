import axios from "axios";

export const updateUser = (params) => {
  return axios.put("/update_user", params);
};

export const makeSeller = (params) => {
  return axios.post("/userToSeller", params);
};
