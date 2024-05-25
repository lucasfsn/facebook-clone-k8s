import { FormikProps } from "formik";
import { HiExclamationTriangle } from "react-icons/hi2";
import { FormInputData } from "../types/user";

interface FormInputProps<T extends FormInputData> {
  placeholder: string;
  name: string;
  type: string;
  purpose: "login" | "signup" | "settings";
  formik: FormikProps<T>;
}

function FormInput<T extends FormInputData>({
  placeholder,
  name,
  type,
  purpose,
  formik,
}: FormInputProps<T>) {
  let className;

  switch (purpose) {
    case "login":
      className = "p-3.5 text-lg border-blue-500";
      break;
    case "signup":
      className = "p-2 text-base";
      break;
    case "settings":
      className = "bg-tertiary text-secondary separator px-2 py-1 text-base";
      break;
    default:
      className = "";
  }

  return (
    <div className="flex w-full flex-col">
      <div className="relative">
        {formik.touched[name] && formik.errors[name] && (
          <HiExclamationTriangle className="absolute right-2.5 top-1/2 -translate-y-1/2 text-2xl text-red-500" />
        )}
        <input
          placeholder={placeholder}
          type={type}
          {...formik.getFieldProps(name)}
          className={`w-full rounded-md border focus:outline-none ${className} ${
            formik.touched[name] && formik.errors[name] && "border-red-500"
          }`}
        />
      </div>
      {formik.touched[name] && (
        <p className="pt-1 text-left text-sm text-red-500">
          {formik.errors[name]?.toString()}
        </p>
      )}
    </div>
  );
}

export default FormInput;
