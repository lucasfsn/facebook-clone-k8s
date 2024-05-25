import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { ChangeBirthDateData } from "../../types/settings";
import Button from "../../ui/Button";
import DateSelectInput from "../../ui/DateSelectInput";
import Spinner from "../../ui/Spinner";
import { changeBirthDateValidation } from "../../utils/validation";
import { getLoading, getUser } from "../user/userSlice";
import { useChangeSettings } from "./useChangeSettings";

const initialState: ChangeBirthDateData = {
  birthDay: new Date().getDate(),
  birthMonth: new Date().getMonth(),
  birthYear: new Date().getFullYear(),
};

function ChangeBirthDate() {
  const user = useSelector(getUser);
  const isLoading = useSelector(getLoading);
  const { changeSettings } = useChangeSettings();

  const formik = useFormik({
    initialValues: {
      birthDay: user?.birthDate.birthDay || initialState.birthDay,
      birthMonth: user?.birthDate.birthMonth || initialState.birthMonth,
      birthYear: user?.birthDate.birthYear || initialState.birthYear,
    },
    validationSchema: changeBirthDateValidation,
    onSubmit: handleSubmit,
  });

  if (isLoading) return <Spinner />;

  async function handleSubmit(values: ChangeBirthDateData) {
    await changeSettings(user?.email, "birthDate", values);
  }

  return (
    <div className="bg-primary flex flex-col gap-4 rounded-md p-4 shadow-lg">
      <div className="text-secondary separator border-b pb-2 text-lg font-semibold">
        Change Birth Date
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex w-full flex-row justify-between gap-2"
      >
        <DateSelectInput<ChangeBirthDateData>
          showTitle={false}
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

export default ChangeBirthDate;
