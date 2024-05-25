import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { importProfile as importProfileApi } from "../../services/apiSettings";
import {
  ResponseError,
  handleError,
  importProfileFile,
} from "../../utils/helpers";
import { ProfileImportSchema } from "../../utils/validation";
import { error, importUserProfile, loading } from "../user/userSlice";

export function useImport() {
  const dispatch = useDispatch();

  async function importProfile(userId: string, file: File) {
    dispatch(loading());

    try {
      const fileContent = await importProfileFile(file);

      const profile = JSON.parse(fileContent);

      await ProfileImportSchema.validate(profile, { strict: true });

      const { data } = await importProfileApi(userId, profile);

      const { user, message } = data;

      dispatch(
        importUserProfile({
          firstName: user.firstName,
          lastName: user.lastName,
        }),
      );

      toast.success(message);
    } catch (err) {
      handleError(err as ResponseError);
      dispatch(error());
    }
  }

  return { importProfile };
}
