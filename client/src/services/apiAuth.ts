import axios from "axios";
import { LoginData, SignUpData } from "../types/auth";

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

export async function signup(user: SignUpData) {
  const { data } = await axios.post(`${apiUrl}/signup`, user);

  return data;
}

export async function login(login: LoginData) {
  const { data } = await axios.post(`${apiUrl}/login`, login);

  return data;
}
