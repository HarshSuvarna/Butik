import axios from "axios";

export const getAllCategories = (params) => {
  return axios.post("/getAllCategories", params);
};

export const getSubcategories = (params) => {
  return axios.post("/getSubcategoryByCategory  ", params);
};
