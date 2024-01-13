export default function axiosInterceptors(axios, cookies) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  axios.interceptors.request.use((request) => {
    let token = cookies?.cookies?.jwt_authorization;
    request.headers["authorization"] = token ? "Bearer " + token : "";
    return request;
  });

  axios.interceptors.response.use(
    (response) => response.data || response,
    async (err) => {
      // console.log("err:>> ", err);
      throw err;
    }
  );
}
