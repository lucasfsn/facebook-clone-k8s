import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { ChangeEmailData } from "../../types/settings";
import Button from "../../ui/Button";
import FormInput from "../../ui/FormInput";
import Spinner from "../../ui/Spinner";
import { changeEmailValidation } from "../../utils/validation";
import { getLoading, getUser } from "../user/userSlice";
import { useChangeSettings } from "./useChangeSettings";

const initialState: ChangeEmailData = {
  email: "",
};

function ChangeEmailForm() {
  const user = useSelector(getUser);
  const isLoading = useSelector(getLoading);
  const { changeSettings } = useChangeSettings();

  const formik = useFormik({
    initialValues: {
      email: user?.email || initialState.email,
    },
    validationSchema: changeEmailValidation,
    onSubmit: handleSubmit,
  });

  if (isLoading) return <Spinner />;

  async function handleSubmit(values: ChangeEmailData) {
    await changeSettings(user?.email, "email", values.email);
  }

  return (
    <div className="bg-primary flex flex-col gap-4 rounded-md p-4 shadow-lg">
      <div className="text-secondary separator border-b pb-2 text-lg font-semibold">
        Change Email
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex w-full flex-row justify-between gap-2"
      >
        <FormInput<ChangeEmailData>
          placeholder="New email"
          name="email"
          type="text"
          purpose="settings"
          formik={formik}
        />

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

export default ChangeEmailForm;
