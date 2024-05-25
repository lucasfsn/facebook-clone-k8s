function SignUpFooter() {
  return (
    <div className="flex flex-col gap-3 text-xs text-gray-500">
      <p className="text-xs text-gray-500">
        People who use our service may have uploaded your contact information to
        Facebook.{" "}
        <span className="text-blue-600 hover:underline">Learn more.</span>
      </p>
      <p>
        By clicking Sign Up, you agree to our{" "}
        <span className="cursor-pointer text-blue-600 hover:underline">
          Terms
        </span>
        . Learn how we collect, use and share your data in our{" "}
        <span className="cursor-pointer text-blue-600 hover:underline">
          Privacy Policy
        </span>{" "}
        and how we use cookies and similar technology in our{" "}
        <span className="cursor-pointer text-blue-600 hover:underline">
          Cookies Policy
        </span>
        . You may receive SMS Notifications from us and can opt out any time.
      </p>
    </div>
  );
}

export default SignUpFooter;
