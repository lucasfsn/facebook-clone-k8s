import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { SignUpData } from "../../types/auth";
import Button from "../../ui/Button";
import DateSelectInput from "../../ui/DateSelectInput";
import FormInput from "../../ui/FormInput";
import GenderSelectInput from "../../ui/GenderSelectInput";
import Spinner from "../../ui/Spinner";
import { signUpValidation } from "../../utils/validation";
import SignUpFooter from "./SignUpFooter";
import { useSignup } from "./useSignup";
import { getLoading } from "./userSlice";

const initialState: SignUpData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  birthDay: new Date().getDate(),
  birthMonth: new Date().getMonth(),
  birthYear: new Date().getFullYear(),
  gender: "",
};

function SignUpForm() {
  const { signUpUser } = useSignup();
  const isLoading = useSelector(getLoading);

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: signUpValidation,
    onSubmit: async (values) => {
      await signUpUser({
        ...values,
        birthDay: Number(values.birthDay),
        birthMonth: Number(values.birthMonth),
        birthYear: Number(values.birthYear),
      });
    },
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="flex max-h-[85dvh] w-[95%] flex-col gap-3 overflow-y-scroll p-3">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
        <div className="flex flex-row justify-between gap-3">
          <FormInput<SignUpData>
            placeholder="First name"
            name="firstName"
            type="text"
            purpose="signup"
            formik={formik}
          />
          <FormInput<SignUpData>
            placeholder="Last name"
            name="lastName"
            type="text"
            purpose="signup"
            formik={formik}
          />
        </div>
        <FormInput<SignUpData>
          placeholder="Email"
          name="email"
          type="text"
          purpose="signup"
          formik={formik}
        />
        <FormInput<SignUpData>
          placeholder="New password"
          name="password"
          type="password"
          purpose="signup"
          formik={formik}
        />
        <DateSelectInput<SignUpData> formik={formik} />
        <GenderSelectInput<SignUpData> name="gender" formik={formik} />
        <SignUpFooter />
        <Button className="mx-auto my-4 w-1/2 bg-green-500 text-sm hover:bg-green-600 sm:text-lg">
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default SignUpForm;
