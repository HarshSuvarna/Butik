import axios from "axios";

export const getProductsInStore = (params) => {
  return axios.post("/product/get_by_store_user", params);
};

export const getDetailedProductData = (params) => {
  return axios.post("/getDetailedProductForUser", params);
};
