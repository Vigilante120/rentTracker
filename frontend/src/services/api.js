import axios from "axios";
import { getToken } from "./auth.js";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

api.interceptors.request.use((config) => {
  const token = getToken();
  const isAuthRequest = config.url?.includes("/auth/");
  if (token && !isAuthRequest) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
