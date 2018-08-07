import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";

const BASE_URL = "http://192.168.0.8:8000";

//prod
//const BASE_URL = "https://dujxlnj50a.execute-api.us-east-2.amazonaws.com/Prod";

const client = axios.create({
  baseURL: BASE_URL,
  responseType: "json"
});

export const defaultMiddleware = axiosMiddleware(client);
