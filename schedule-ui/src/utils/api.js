import axios from "axios";

const axiosInstance = axios.create({
  headers: {
    "Cache-Control": "no-cache, no-store",
    Pragma: "no-cache",
  },
  withCredentials: true,
});

export default axiosInstance;
