import axios from "axios";

const API = axios.create({
  baseURL: "https://confessly-backend-5wpo.onrender.com", // ✅ your Render backend
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
