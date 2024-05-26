import axios from "axios";

export async function getKeycloakToken() {
  const { data } = await axios.post(
    import.meta.env.VITE_KEYCLOAK_TOKEN_ENDPOINT,
    {
      client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
      client_secret: import.meta.env.VITE_KEYCLOAK_SECRET,
      grant_type: "client_credentials",
      scope: "openid",
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      transformRequest: [
        (data: Record<string, string | number | boolean>) => {
          return Object.entries(data)
            .map(
              ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
            )
            .join("&");
        },
      ],
    },
  );

  return data.access_token;
}
