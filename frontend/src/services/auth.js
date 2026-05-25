import api from "./api.js";

const ACCESS_KEY = "renttrack_access";
const REFRESH_KEY = "renttrack_refresh";

export function getToken() {
  return localStorage.getItem(ACCESS_KEY);
}

export function setToken(access, refresh) {
  localStorage.setItem(ACCESS_KEY, access);
  if (refresh) {
    localStorage.setItem(REFRESH_KEY, refresh);
  }
}

export function clearToken() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

export async function signup(payload) {
  const response = await api.post("/auth/signup/", payload);
  return response.data;
}

export async function verifyOtp(payload) {
  const response = await api.post("/auth/verify-otp/", payload);
  if (response.data.access) {
    setToken(response.data.access, response.data.refresh);
  }
  return response.data;
}

export async function login(payload) {
  const response = await api.post("/auth/login/", payload);
  if (response.data.access) {
    setToken(response.data.access, response.data.refresh);
  }
  return response.data;
}

export async function googleLogin(payload) {
  const response = await api.post("/auth/google/", payload);
  if (response.data.access) {
    setToken(response.data.access, response.data.refresh);
  }
  return response.data;
}
