import axios from "axios";
import { BASE_URL } from "~/config/config";

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    // Accept: 'application/json, text/plain, */*',
    // 'Accept-Encoding': 'gzip, deflate, br, zstd',
  },
});

export default instance;
