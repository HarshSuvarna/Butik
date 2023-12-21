import axios from "axios";

export const getAllCategories = (params) => {
  return axios.post("/getAllCategories", params);
};
