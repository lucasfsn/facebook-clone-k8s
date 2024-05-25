import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAccount as deleteAccountApi } from "../../services/apiSettings";
import { ResponseError, handleError } from "../../utils/helpers";
import { deleteUser, error, loading } from "../user/userSlice";

export function useDelete() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function deleteAccount(id: string) {
    dispatch(loading());

    try {
      const { message } = await deleteAccountApi(id);

      dispatch(deleteUser());

      Cookies.remove("user");
      Cookies.remove("token");

      toast.success(message);

      navigate("/login");
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  return { deleteAccount };
}
