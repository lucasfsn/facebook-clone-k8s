import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { changePassword as changePasswordApi } from "../../services/apiSettings";
import { ResponseError, handleError } from "../../utils/helpers";
import { changedPassword, error, loading } from "../user/userSlice";

export function useChangePassword() {
  const dispatch = useDispatch();

  async function changePassword(email: string | undefined, password: string) {
    dispatch(loading());

    try {
      if (!email) return;

      const { message } = await changePasswordApi({ email, password });

      dispatch(changedPassword());

      toast.success(message);
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  return { changePassword };
}
