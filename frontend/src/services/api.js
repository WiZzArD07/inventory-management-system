import axios from "axios";

const api = axios.create({
  baseURL: "https://inventory-backend-s2lr.onrender.com",
});

export default api;