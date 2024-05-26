import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import { LoginData } from "../../types/auth";
import { ResponseError, handleError } from "../../utils/helpers";
import { error, loading, login } from "./userSlice";

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function loginUser(user: LoginData) {
    dispatch(loading());

    try {
      const { message, user: loginData, token } = await loginApi(user);

      Cookies.set("user", JSON.stringify(loginData), {
        expires: 1 / 24,
        sameSite: "None",
        secure: true,
      });

      Cookies.set("token", token, {
        expires: 15 / 24 / 60,
      });

      dispatch(login(loginData));

      toast.success(message);

      navigate("/", { replace: true });
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  return { loginUser };
}
