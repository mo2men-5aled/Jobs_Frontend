import axios from "axios";

const http = axios.create({
  baseURL: "https://jobsapi-production-d815.up.railway.app/api/v1",
});

export default http;
