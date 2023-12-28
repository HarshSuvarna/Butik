import axios from "axios";

export const getProductsInStore = (params) => {
  return axios.post("/product/get_by_store_user", params);
};
