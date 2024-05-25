import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface HeaderLinkProps {
  to: string;
  active: boolean;
  className: string;
  children: ReactNode;
}

function HeaderLink({ to, active, className, children }: HeaderLinkProps) {
  return (
    <Link
      to={to}
      className={`${className} text-secondary hidden h-full flex-grow cursor-pointer items-center justify-center text-2xl ${
        active ? "active" : "bg-tertiary-hover rounded-lg"
      }`}
    >
      {children}
    </Link>
  );
}

export default HeaderLink;
