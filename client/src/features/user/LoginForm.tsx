import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LoginData } from "../../types/auth";
import Button from "../../ui/Button";
import FormInput from "../../ui/FormInput";
import Spinner from "../../ui/Spinner";
import { loginValidation } from "../../utils/validation";
import SignUp from "./SignUp";
import { useLogin } from "./useLogin";
import { getLoading } from "./userSlice";

const initialState: LoginData = {
  email: "",
  password: "",
};

function LoginForm() {
  const { loginUser } = useLogin();
  const isLoading = useSelector(getLoading);
  const formik = useFormik({
    initialValues: initialState,
    validationSchema: loginValidation,
    onSubmit: handleSubmit,
  });

  if (isLoading) return <Spinner />;

  async function handleSubmit(values: LoginData) {
    await loginUser(values);
  }

  return (
    <div className="flex w-[95%] flex-col gap-4 rounded-lg bg-white p-4 text-center shadow-3xl sm:w-[400px]">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <FormInput<LoginData>
          placeholder="Email or phone number"
          name="email"
          type="text"
          purpose="login"
          formik={formik}
        />
        <FormInput<LoginData>
          placeholder="Password"
          name="password"
          type="password"
          purpose="login"
          formik={formik}
        />
        <Button className="bg-blue-500 text-sm sm:text-lg">Log In</Button>
      </form>
      <Link
        to="/recover"
        className="border-b pb-5 text-sm text-blue-600 hover:underline"
      >
        Forgot password?
      </Link>
      <SignUp />
    </div>
  );
}

export default LoginForm;
