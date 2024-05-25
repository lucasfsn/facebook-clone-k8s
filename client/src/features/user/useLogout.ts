import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./userSlice";

export function useLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function logoutUser() {
    Cookies.remove("user");
    Cookies.remove("token");

    dispatch(logout());

    toast.success("Logged out successfully");

    navigate("/login");
  }

  return { logoutUser };
}
