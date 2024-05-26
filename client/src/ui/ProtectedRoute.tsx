import axios from "axios";
import Cookies from "js-cookie";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../features/user/useLogout";
import { getLoading, getUser } from "../features/user/userSlice";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const isLoading = useSelector(getLoading);
  const { logoutUser } = useLogout();

  const token = Cookies.get("token");

  useEffect(
    function () {
      if (token) {
        axios
          .get(import.meta.env.VITE_KEYCLOAK_USERINFO_ENDPOINT, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.status !== 200) {
              logoutUser();
            }
          })
          .catch(() => {
            logoutUser();
          });
      }

      if (!isLoading && !user && !token) navigate("/login");
    },
    [user, isLoading, navigate, token, logoutUser],
  );

  if (user && token) return children;
}

export default ProtectedRoute;
