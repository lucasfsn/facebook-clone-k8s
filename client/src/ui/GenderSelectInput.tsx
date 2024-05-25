import { FormikProps } from "formik";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { FormInputData } from "../types/user";

interface GenderSelectInputProps<T extends FormInputData> {
  name: string;
  formik: FormikProps<T>;
}

function GenderSelectInput<T extends FormInputData>({
  name,
  formik,
}: GenderSelectInputProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row items-center gap-1 text-sm text-gray-500">
        <span>Gender</span>
        <span>
          <HiMiniQuestionMarkCircle />
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label
          htmlFor="female"
          className={`flex cursor-pointer flex-row justify-between gap-2 rounded-[5px] border p-1 ${
            formik.touched[name] && formik.errors[name] && "border-red-500"
          }`}
        >
          <span>Female</span>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </label>
        <label
          htmlFor="male"
          className={`flex cursor-pointer flex-row justify-between gap-2 rounded-[5px] border p-1 ${
            formik.touched[name] && formik.errors[name] && "border-red-500"
          }`}
        >
          <span>Male</span>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </label>
        <label
          htmlFor="other"
          className={`flex cursor-pointer flex-row justify-between gap-2 rounded-[5px] border p-1 ${
            formik.touched[name] && formik.errors[name] && "border-red-500"
          }`}
        >
          <span>Other</span>
          <input
            type="radio"
            id="other"
            name="gender"
            value="other"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </label>
      </div>
      <p className="w-full pt-1 text-left text-sm text-red-500">
        {formik.errors[name]?.toString()}
      </p>
    </div>
  );
}

export default GenderSelectInput;
