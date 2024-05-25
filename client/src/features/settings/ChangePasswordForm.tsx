import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { ChangePasswordData } from "../../types/settings";
import Button from "../../ui/Button";
import FormInput from "../../ui/FormInput";
import Spinner from "../../ui/Spinner";
import { changePasswordValidation } from "../../utils/validation";
import { getLoading, getUser } from "../user/userSlice";
import { useChangePassword } from "./useChangePassword";

const initialState: ChangePasswordData = {
  password: "",
  confirmPassword: "",
};

function ChangePasswordForm() {
  const user = useSelector(getUser);
  const isLoading = useSelector(getLoading);
  const { changePassword } = useChangePassword();

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: changePasswordValidation,
    onSubmit: handleSubmit,
  });

  if (isLoading) return <Spinner />;

  async function handleSubmit(values: ChangePasswordData) {
    await changePassword(user?.email, values.password);
  }

  return (
    <div className="bg-primary flex flex-col gap-4 rounded-md p-4 shadow-lg">
      <div className="text-secondary separator border-b pb-2 text-lg font-semibold">
        Change Password
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex w-full flex-col gap-4"
      >
        <div className="flex flex-col gap-3">
          <FormInput<ChangePasswordData>
            placeholder="New password"
            name="password"
            type="password"
            purpose="settings"
            formik={formik}
          />
          <FormInput
            placeholder="Confirm password"
            name="confirmPassword"
            type="password"
            purpose="settings"
            formik={formik}
          />
        </div>
        <Button
          className="bg-post-disabled h-fit bg-blue-500 text-sm hover:bg-blue-600 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          Change
        </Button>
      </form>
    </div>
  );
}

export default ChangePasswordForm;
