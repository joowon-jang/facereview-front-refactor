import axios from "axios";

const api = axios.create({
  baseURL: "http://3.139.8.146",
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    console.log("🔮 [Req config]", config, "\n");
    return config;
  },
  (error) => {
    console.log("🧨 [Req ERROR]", error, "\n");
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("🔮 [Res]", response, "\n");
    return response;
  },
  (error) => {
    console.log("🧨 [Res ERROR]", error, "\n");
    return Promise.reject(error);
  }
);

export default api;
