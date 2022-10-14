import { useEffect, useState } from "react";
import http from "../api/connection";

const CheckUserID = (userID) => {
  const [result, setResult] = useState([]);
  useEffect(() => {
    http.get(`/login?userID=${userID}`).then((res) => {
      setResult(res.data);
    });
  }, [userID]);
  return result;
};
export default CheckUserID;
