import axios from "axios";

const api = axios.create({
  baseURL: "http://34.64.238.124",
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    console.log("🔮 [Req]", config.headers, config.url, "\n");
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
