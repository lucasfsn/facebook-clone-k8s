import axios from "axios";
import { LoginData, SignUpData } from "../types/auth";
import { getKeycloakToken } from "../utils/keycloak";

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

export async function signup(user: SignUpData) {
  const token = await getKeycloakToken();

  const { data } = await axios.post(`${apiUrl}/signup`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return { ...data, token };
}

export async function login(login: LoginData) {
  const token = await getKeycloakToken();

  const { data } = await axios.post(`${apiUrl}/login`, login, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return { ...data, token };
}
