type LogoType = "icon" | "text";

interface LogoProps {
  style?: LogoType;
}

function Logo({ style = "icon" }: LogoProps) {
  if (style === "icon")
    return (
      <img className="h-[40px] max-w-[40px]" src="/logo/icon.png" alt="Logo" />
    );

  return (
    <div className="flex flex-col gap-4">
      <img
        src="../../logo/facebook.svg"
        alt="facebook"
        className="mx-auto w-[250px] lg:mx-0"
      />
      <p className="max-w-sm text-center text-2xl lg:max-w-md lg:text-left lg:text-3xl">
        Connect with friends and the world around you on Facebook.
      </p>
    </div>
  );
}

export default Logo;
