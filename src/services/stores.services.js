import axios from "axios";

export const getNearestStores = (params) => {
  return axios.post("/get_nearest_store", params);
};

export const getLocation = () => {
  return axios.get("  https://ipapi.co/json", { baseURL: "" });
};

export const getNearestStoresByCategory = (params) => {
  return axios.post("/store/get_nearest_by_category", params);
};

export const getNearestStoresBySubcategory = (params) => {
  return axios.post("/store/get_nearest_by_subcategory", params);
};
