import { FormikProps } from "formik";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { FormInputData } from "../types/user";
import { getDays, getMonths, getYears } from "../utils/helpers";

interface DateSelectInputProps<T extends FormInputData> {
  formik: FormikProps<T>;
  showTitle?: boolean;
}

function DateSelectInput<T extends FormInputData>({
  formik,
  showTitle = true,
}: DateSelectInputProps<T>) {
  const { birthMonth, birthYear } = formik.values;

  return (
    <div className="flex flex-col gap-1">
      {showTitle ? (
        <div className="flex flex-row items-center gap-1 text-sm text-gray-500">
          <span>Birthday</span>
          <span>
            <HiMiniQuestionMarkCircle />
          </span>
        </div>
      ) : null}
      <div className="grid grid-cols-1 justify-between gap-3 sm:grid-cols-3">
        <select
          {...formik.getFieldProps("birthMonth")}
          className={`focus:outline-none ${
            formik.touched["birthMonth"] &&
            formik.errors["birthMonth"] &&
            "border-red-500"
          }`}
        >
          {Object.entries(getMonths()).map((month) => (
            <option value={month[0]} key={month[0]}>
              {month[1]}
            </option>
          ))}
        </select>
        <select
          {...formik.getFieldProps("birthDay")}
          className={`focus:outline-none ${
            formik.touched["birthDay"] &&
            formik.errors["birthDay"] &&
            "border-red-500"
          }`}
        >
          {getDays(Number(birthYear), Number(birthMonth)).map((day) => (
            <option value={day} key={day}>
              {day}
            </option>
          ))}
        </select>
        <select
          {...formik.getFieldProps("birthYear")}
          className={`focus:outline-none ${
            formik.touched["birthYear"] &&
            formik.errors["birthYear"] &&
            "border-red-500"
          }`}
        >
          {getYears().map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <p className="w-full pt-1 text-left text-sm text-red-500">
        {formik.errors["birthYear"]?.toString()}
      </p>
    </div>
  );
}

export default DateSelectInput;
