import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup as signupApi } from "../../services/apiAuth";
import { SignUpData } from "../../types/auth";
import { ResponseError, handleError } from "../../utils/helpers";
import { error, loading, login } from "./userSlice";

export function useSignup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function signUpUser(user: SignUpData) {
    dispatch(loading());
    try {
      const { message, user: signUpData, token } = await signupApi(user);

      Cookies.set("user", JSON.stringify(signUpData), {
        expires: 1 / 24,
        sameSite: "None",
        secure: true,
      });

      Cookies.set("token", token);

      dispatch(login(signUpData));

      toast.success(message);

      navigate("/", { replace: true });
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  return { signUpUser };
}
