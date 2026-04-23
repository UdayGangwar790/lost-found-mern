import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-sktr.onrender.com/api"  // ✅ FIXED
});

// Token attach
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = token;
  return req;
});

export default API;