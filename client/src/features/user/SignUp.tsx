import Modal from "../../ui/Modal";
import SignUpForm from "./SignUpForm";

function SignUp() {
  return (
    <Modal>
      <Modal.Open opens="signup-form">
        <button className="mx-auto rounded-lg bg-green-500 px-4 py-1.5 text-sm font-bold text-white sm:text-lg">
          Create new account
        </button>
      </Modal.Open>
      <Modal.Window
        name="signup-form"
        type="signup"
        width="w-[95%] sm:w-[475px]"
        alwaysClose={false}
      >
        <div className="flex w-full flex-col border-b p-4 text-left">
          <h1 className="text-xl font-semibold sm:text-3xl">Sign Up</h1>
          <span className="text-sm text-gray-500 sm:text-lg">
            It's quick and easy.
          </span>
        </div>
        <SignUpForm />
      </Modal.Window>
    </Modal>
  );
}

export default SignUp;
