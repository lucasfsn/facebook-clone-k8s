import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { changeSettings as changeSettingsApi } from "../../services/apiSettings";
import { BirthDate } from "../../types/user";
import { ResponseError, handleError } from "../../utils/helpers";
import { changedSetting, error, loading } from "../user/userSlice";

export function useChangeSettings() {
  const dispatch = useDispatch();

  async function changeSettings(
    email: string | undefined,
    field: "firstName" | "lastName" | "email" | "birthDate",
    value: string | BirthDate,
  ) {
    dispatch(loading());
    try {
      if (!email) return;

      const { message, newValue } = await changeSettingsApi({
        email,
        field,
        value,
      });

      dispatch(changedSetting({ field, value: newValue }));

      toast.success(message);
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  return { changeSettings };
}
