import Cookies from "js-cookie";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLoading, getUser } from "../features/user/userSlice";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const isLoading = useSelector(getLoading);

  const token = Cookies.get("token");

  useEffect(
    function () {
      if (!isLoading && !user && !token) navigate("/login");
    },
    [user, isLoading, navigate, token],
  );

  if (user && token) return children;
}

export default ProtectedRoute;
