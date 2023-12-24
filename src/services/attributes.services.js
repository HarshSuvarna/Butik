import axios from "axios";

export const getAllGenders = (params) => {
  return axios.post("/getAllGenders", params);
};
