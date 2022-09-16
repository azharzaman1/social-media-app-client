import axios from "axios";
import { BASE_URL } from "../config";

const API = axios.create({
  baseURL: BASE_URL,
});

export const createChat = (data) => API.post("/chat/", data);

export const userChats = (id) => API.get(`/chat/${id}`);

export const findChat = (firstId, secondId) =>
  API.get(`/chat/find/${firstId}/${secondId}`);
