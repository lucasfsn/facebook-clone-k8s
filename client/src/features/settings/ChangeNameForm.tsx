import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { ChangeNameData } from "../../types/settings";
import Button from "../../ui/Button";
import FormInput from "../../ui/FormInput";
import Spinner from "../../ui/Spinner";
import { changeNameValidation } from "../../utils/validation";
import { getLoading, getUser } from "../user/userSlice";
import { useChangeSettings } from "./useChangeSettings";

interface ChangeNameProps {
  field: "firstName" | "lastName";
}

const initialState: ChangeNameData = {
  name: "",
};

function ChangeNameForm({ field }: ChangeNameProps) {
  const user = useSelector(getUser);
  const isLoading = useSelector(getLoading);
  const { changeSettings } = useChangeSettings();

  const formik = useFormik({
    initialValues: {
      name: user?.[field] || initialState.name,
    },
    validationSchema: changeNameValidation,
    onSubmit: handleSubmit,
  });

  if (isLoading) return <Spinner />;

  async function handleSubmit(values: ChangeNameData) {
    await changeSettings(user?.email, field, values.name);
  }

  const content = field === "firstName" ? "First name" : "Last name";

  return (
    <div className="bg-primary flex flex-col gap-4 rounded-md p-4 shadow-lg">
      <div className="text-secondary separator border-b pb-2 text-lg font-semibold">
        Change {content}
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex w-full flex-row justify-between gap-2"
      >
        <FormInput<ChangeNameData>
          placeholder={content}
          name="name"
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

export default ChangeNameForm;
