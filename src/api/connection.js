import axios from "axios";

const http = axios.create({
  baseURL: "https://jobs-api-prog.herokuapp.com/api/v1",
});

export default http;
