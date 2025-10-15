import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_ENDPOINT_URL;

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
